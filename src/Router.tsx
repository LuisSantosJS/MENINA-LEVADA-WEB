'stric-ode'
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
                    <Route path='/admin' component={userSaved ? Bashboard : Admin} />
                    <Route  component={() => Home({
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