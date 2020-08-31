'stric-ode'
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Provider from './Context/ContextMain';
import { ToastProvider} from 'react-toast-notifications'


function Routes() {
    return (
        <Provider>
            <ToastProvider
                autoDismiss
                autoDismissTimeout={4000}
                placement="top-right">
                <BrowserRouter>
                    <Route path="/" exact component={Home} />
                    <Route path='/admin' component={Admin} />
                </BrowserRouter>
            </ToastProvider>
        </Provider>
    )
}

export default Routes;