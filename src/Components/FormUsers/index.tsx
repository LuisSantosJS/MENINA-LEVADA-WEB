import React, { useEffect, useState } from 'react';
import api from '../../Service/api';
import io from "socket.io-client";
import Add from '../../Assets/more.png';
import { useToasts } from 'react-toast-notifications';
import * as EmailValidator from 'email-validator';
import './styles.css';
interface USERS {
    id: number,
    email: string,
    disabled: boolean
}

interface USERUPDATE {
    id: number,
    email: string,
}
const FormUsers: React.FC = () => {
    const [users, setUsers] = useState<USERS[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [userUpdate, setUserUpdate] = useState<USERUPDATE>({} as USERUPDATE);

    const { addToast } = useToasts();

    const socket = io("https://api-mlevada.herokuapp.com");
    useEffect(() => {
        api.get('/admin').then(response => {
            setUsers(response.data.res);
        })
        socket.on('users', (res: USERS[]) => {
            setUsers(res);
            //   console.table(res);
        })
        // eslint-disable-next-line
    }, []);


    const onOpenUpdate = (id: number, email: string) => {
        setUserUpdate({
            email,
            id
        });
        setModal2(true);
    }

    const close = () => {

        setEmail('');
        setSenha('');
        setModal(false)
    }

    const close2 = () => {
        setModal2(false)
    }

    const AddUser = () => {
        const validEmail = EmailValidator.validate(String(email));
        if (!validEmail) {
            return addToast('Insira um email válido!', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
        api.post('/admin/create', {
            email: String(email).toLowerCase(),
            password: senha
        }).then(res => {
            if (String(res.data.message) === 'error') {
                addToast(res.data.res, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            } else {
                addToast('usuário criado com sucesso', {
                    appearance: 'success',
                    autoDismiss: true,
                });
            }
        })

        setEmail('');
        setSenha('');
        setModal(false);
    }

    const updateStatus = (status: boolean, id: number) => {
        api.post('/admin/status', {
            id,
            status
        })
    }

    const erroUpdate = () =>{
        return addToast('Não é possivel desativar este usuário!', {
            appearance: 'error',
            autoDismiss: true,
        });
    }

    const updatePassword = () => {
        if (password !== newPassword) {
            return addToast('Senhas não coincidem!', {
                appearance: 'error',
                autoDismiss: true,
            });
        }


        api.post('/admin/update', {
            email: userUpdate.email,
            password: password
        }).then((res) => {
            if (res.data.message === 'success') {
                addToast('Senha alterada com sucesso!', {
                    appearance: 'success',
                    autoDismiss: true,
                });
            } else {
                addToast('Falha ao alterar senha!', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }).catch(() => {
            addToast('Falha ao alterar senha!', {
                appearance: 'error',
                autoDismiss: true,
            });
        })
        setPassword('');
        setNewPassword('');
        setModal2(false)
    }

    return (
        <div className="view">
            <div className='form-bash'>
                {users.length <= 1 ?
                    <div>Não há usuários para gerenciar</div> :

                    <table>
                        <thead>
                            <tr>
                                <th>User Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((res, index) => {
                                return (
                                    <tr key={index}>
                                        <td onClick={() => onOpenUpdate(res.id, res.email)} >{res.email}</td>
                                        <td onClick={() => res.id === 1 ? erroUpdate() : updateStatus(!res.disabled, res.id)} className={!res.disabled ? 'statusDEL' : 'status'}>{!res.disabled ? 'ATIVO' : 'DESABILITADO'}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
            <div onClick={() => setModal(true)} className="floatbutton">
                <img src={Add} width='40%' height='40%' alt="ADICIONAR USUÁRIO" />
            </div>
            {modal && <div className="modal" >
                <div onClick={() => { }} className="modal-content">
                    <input type='text' value={email} onChange={(e) => setEmail(e.currentTarget.value)} className='inputs' placeholder='Email' />
                    <input type='password' value={senha} onChange={(e) => setSenha(e.currentTarget.value)} className='inputs' placeholder='Senha' />
                    <strong onClick={AddUser}>Criar Usuário</strong>
                    <div className='cancel' onClick={close}>Cancelar</div>
                </div>
            </div>}
            {modal2 && <div className="modal" >
                <div onClick={() => { }} className="modal-content">
                    <input type='password' value={password} onChange={(e) => setPassword(e.currentTarget.value)} className='inputs' placeholder='Insira a nova senha' />
                    <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.currentTarget.value)} className='inputs' placeholder='Repita a nova senha' />
                    <strong onClick={updatePassword}>Alterar Senha</strong>
                    <div className='cancel' onClick={close2}>Cancelar</div>
                </div>
            </div>}
        </div>
    )
}

export default FormUsers;