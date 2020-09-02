import React, { useState } from 'react'
import './styles.css';
import Logo2 from '../../Assets/logo2.png';
import { useToasts } from 'react-toast-notifications';
import * as EmailValidator from 'email-validator';
const FormAdmin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { addToast } = useToasts();
    const handleSubmit = () => {
        const validEmail = EmailValidator.validate(String(email));
        if (email.length === 0) {
            return addToast('Insira seu email!', {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        if(validEmail === false){
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
        
        addToast('Sucesso', {
            appearance: 'success',
            autoDismiss: true,
        })
    }
    return (
        <div className='form-admin'>
            <img src={Logo2} width='80%' height='30%' alt="Menina Levada" />
            <form onSubmit={handleSubmit}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                <span onClick={handleSubmit} defaultValue="Fazer Login" >Fazer Login</span>
            </form>
        </div>
    )
}
export default FormAdmin;