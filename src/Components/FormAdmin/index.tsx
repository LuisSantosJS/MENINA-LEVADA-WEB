import React from 'react'
import './styles.css';
import Logo2 from '../../Assets/logo2.png'
const FormAdmin: React.FC = () => {
    return (
        <div className='form-admin'>
             <img src={Logo2} width='80%' height='30%' alt="Menina Levada"/>
            <form >
                <input type="text" id="nuser" name="user" placeholder="Usuário" />

                <input type="password" id="pass" name="password" placeholder="Senha" />

                <input type="submit" value="Fazer Login" />
            </form>
        </div>
    )
}
export default FormAdmin;