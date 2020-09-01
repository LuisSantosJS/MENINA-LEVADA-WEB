import React, { useEffect } from 'react';
import Header from '../../Components/Header';
import FormViewAdmin from '../../Components/FormViewAdmin';
import { useToasts } from 'react-toast-notifications'
const Admin: React.FC = () => {
    const { addToast } = useToasts();
    useEffect(() => {
        function addcToash() {
            addToast('Insira suas credenciais para acessar esta página!', {
                appearance: 'success',
                autoDismiss: true,
            })
        }
        // eslint-disable-next-line
        return addcToash();
    }, [addToast])
    return (
        <div className='container'>
            <Header />
            <FormViewAdmin>
            </FormViewAdmin>
        </div>
    );
}
export default Admin;