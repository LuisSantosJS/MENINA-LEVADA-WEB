import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../Service/api';
interface CONFIG {
    origin: number,
    addition_price: number,
    addition_days: number,
    company_name: string
}

type ContextType = {
    config: CONFIG;
    setConfig: (value: CONFIG) => void;
};

const ContextMain = createContext<ContextType>({
    config: {
        origin: 0,
        addition_price: 0,
        addition_days: 0,
        company_name: "Menina Levada"
    },
    setConfig: (value: CONFIG) => { },
});

const ProviderConfig: React.FC = ({ children }) => {

    const [config, setConfig] = useState<CONFIG>({
        origin: 0,
        addition_price: 0,
        addition_days: 0,
        company_name: "Menina Levada"
    });

    useEffect(() => {
        api.get('/config').then(res => {
            setConfig({
                origin: res.data.res[0].origin,
                addition_price: res.data.res[0].addition_price,
                addition_days: res.data.res[0].addition_days,
                company_name: res.data.res[0].company_name
            })
        })
    },[]);
    return (
        <ContextMain.Provider value={{
            config, setConfig
        }}>
            {children}
        </ContextMain.Provider>
    );
}
export default ProviderConfig;


export function useConfig() {
    const infoUser: ContextType = useContext(ContextMain);
    const { config, setConfig } = infoUser;
    return { config, setConfig };
}


//#A0522D

//#CD853F, #F4A460





