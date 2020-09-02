import React, { createContext, useState, useContext, useEffect } from 'react';


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

    useEffect(() => {
        const isSaved = localStorage.getItem('@userSaved');
       // console.log('isSaved', isSaved)
        if (String(isSaved) === 'true') {
            setUserSaved(true)
        }
    }, [])

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





