import React, { useState } from 'react'
import './styles.css';
import api from '../../Service/api';
import Logo2 from '../../Assets/logo2.png';
import { useToasts } from 'react-toast-notifications';
import { useUserSaved, useUserID } from '../../Context/ContextMain';
import * as EmailValidator from 'email-validator';
const FormAdmin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { addToast } = useToasts();
    const { setUserSaved } = useUserSaved();
    const { setUserID } = useUserID();
    const cleanInputs = () => {
        setPassword('');
        setEmail('');
    }
    const handleSubmit = () => {
        const validEmail = EmailValidator.validate(String(email));
        if (email.length === 0) {
            return addToast('Insira seu email!', {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        if (validEmail === false) {
            return addToast('Insira um email válido!', {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        if (password.length === 0) {
            return addToast('Insira sua senha!', {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        api.post('/admin/login', {
            email: String(email).toLowerCase(),
            password: password
        }).then(res => {
            if (Boolean(res.data.data.disabled) === true) {
                setUserSaved(false);
                return addToast('Usuário desabilitado!', {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
            if (String(res.data.message) === 'success') {
                addToast(String(res.data.res), {
                    appearance: 'success',
                    autoDismiss: true,
                })
                setUserID(Number(res.data.data.id))
                localStorage.setItem('@userSaved', 'true');
                localStorage.setItem('@userID', `${Number(res.data.data.id)}`);
                setUserSaved(true);
            } else {
                addToast(String(res.data.res), {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
        }).catch(() => {
            addToast('Ocorreu um erro!', {
                appearance: 'error',
                autoDismiss: true,
            })
        })

        return cleanInputs();

    }
    return (
        <div className='form-admin'>
            <img src={Logo2} width='80%' height='30%' alt="Menina Levada" />
            <form onSubmit={handleSubmit}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                <strong onClick={handleSubmit} defaultValue="Fazer Login" >Fazer Login</strong>
            </form>
        </div>
    )
}
export default FormAdmin;