import React, { createContext, useState, useContext } from 'react';


type ContextType = {
    userSaved: boolean;
    setUserSaved: (value: boolean) => void;


};


const ContextMain = createContext<ContextType>({
    userSaved: false,
    setUserSaved: (value: boolean) => { },


});


const Provider: React.FC = ({ children }) => {

    const [userSaved, setUserSaved] = useState<boolean>(false);



    return (
        <ContextMain.Provider value={{
            userSaved, setUserSaved
        }}>
            {children}
        </ContextMain.Provider>
    );
}
export default Provider;


export function useUserSaved() {
    const infoUser: ContextType = useContext(ContextMain);
    const { userSaved, setUserSaved } = infoUser;
    return { userSaved, setUserSaved };
}


//#A0522D

//#CD853F, #F4A460





