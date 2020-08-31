import React from 'react';
import Logo from '../../Assets/logo.png'
import Salir from '../../Assets/salir.png'
import { useUserSaved } from '../../Context/ContextMain';
import { useToasts } from 'react-toast-notifications'
import './styles.css'
const Header: React.FC = () => {
    const { userSaved, setUserSaved } = useUserSaved();
    const { addToast } = useToasts()

    const handleExit = () => {
        setUserSaved(false)
        addToast('Successfully unlogged', {
            appearance: 'success',
            autoDismiss: true,
        })
    }
    return (

        <nav className='navbar'>
            <img src={Logo} className='logo' width='170' height='40' alt="Menina levada" />
            {userSaved &&
                <span className='viewSalir' onClick={handleExit}>
                    <img src={Salir} className='salir' width='20px' height='20px' alt="Menina levada" />
                </span>}

        </nav>


    )
}

export default Header;