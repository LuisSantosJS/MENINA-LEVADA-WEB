'stric-ode'
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Admin from './Pages/Admin';
import Users from './Pages/Users';
import Bashboard from './Pages/Bashboard';
import { useUserSaved, useUserID } from './Context/ContextMain';
import { ToastProvider } from 'react-toast-notifications'


function Routes() {
    const { userSaved } = useUserSaved();
    const { userID } = useUserID();
    return (

        <ToastProvider
            autoDismiss
            autoDismissTimeout={4000}
            placement="top-right">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={() => Home({
                        children: {
                            bol: true
                        }
                    })} />
                    <Route path="/rastrear" exact component={() => Home({
                        children: {
                            bol: false
                        }
                    })} />
                    <Route path='/admin' exact component={userSaved ? Bashboard : Admin} />
                    <Route path='/admin/users' exact component={() => userID === 1 ? Users({}) : Home({
                        children: {
                            bol: true
                        }
                    })} />
                    <Route component={() => Home({
                        children: {
                            bol: true
                        }
                    })} />
                </Switch>
            </BrowserRouter>
        </ToastProvider>

    )
}

export default Routes;