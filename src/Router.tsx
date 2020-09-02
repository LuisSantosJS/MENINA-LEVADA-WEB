'stric-ode'
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Bashboard from './Pages/Bashboard';
import { useUserSaved } from './Context/ContextMain';
import { ToastProvider } from 'react-toast-notifications'


function Routes() {
    const { userSaved } = useUserSaved();
    return (

        <ToastProvider
            autoDismiss
            autoDismissTimeout={4000}
            placement="top-right">
            <BrowserRouter>
                <Route path="/" exact component={Home} />
                <Route path='/admin' component={userSaved ? Bashboard : Admin} />
            </BrowserRouter>
        </ToastProvider>

    )
}

export default Routes;