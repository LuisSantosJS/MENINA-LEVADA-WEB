import React from 'react';
import Logo from '../../Assets/logo.png'
import Salir from '../../Assets/salir.png'
import { useUserSaved, useUserID } from '../../Context/ContextMain';
import { useToasts } from 'react-toast-notifications'
import './styles.css'
const Header: React.FC = () => {
    const { userSaved, setUserSaved } = useUserSaved();
    const { addToast } = useToasts()
    const { setUserID } = useUserID();

    const handleExit = () => {
        setUserSaved(false);
        setUserID(0);
        addToast('Successfully unlogged', {
            appearance: 'success',
            autoDismiss: true,
        })
        localStorage.clear();
    }
    return (

        <nav className='navbar'>
            <img src={Logo} className='logo' width='170' height='40' alt="Menina levada" />
            {userSaved &&
                <div className='viewSalir' onClick={handleExit} >
                    <img src={Salir} className='salir' width='20px' height='20px' alt="Menina levada" />
                </div>}

        </nav>


    )
}

export default Header;