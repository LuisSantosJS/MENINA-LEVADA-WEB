import React from 'react';
import Header from '../../Components/Header';
import FormViewAdmin from '../../Components/FormViewAdmin';
// import { useToasts } from 'react-toast-notifications'
// import { useUserSaved } from '../../Context/ContextMain';
const Admin: React.FC = () => {

    return (
        <div className='container'>
            <Header />
            <FormViewAdmin />
        </div>
    );
}
export default Admin;