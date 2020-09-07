import React, { createContext, useState, useContext, useEffect } from 'react';


type ContextType = {
    userSaved: boolean;
    setUserSaved: (value: boolean) => void;
    isVisibleParms: boolean;
    setIsVisibleParms: (value: boolean) => void;


};


const ContextMain = createContext<ContextType>({
    userSaved: false,
    setUserSaved: (value: boolean) => { },
    isVisibleParms: false,
    setIsVisibleParms: (value: boolean) => { },


});


const Provider: React.FC = ({ children }) => {

    const [userSaved, setUserSaved] = useState<boolean>(false);
    const [isVisibleParms, setIsVisibleParms] = useState<boolean>(false);

    useEffect(() => {
        const isSaved = localStorage.getItem('@userSaved');
        // console.log('isSaved', isSaved)
        if (String(isSaved) === 'true') {
            setUserSaved(true)
        }
    }, []);

    return (
        <ContextMain.Provider value={{
            userSaved, setUserSaved,
            isVisibleParms, setIsVisibleParms
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

export function useRouteParmRender() {
    const infoUser: ContextType = useContext(ContextMain);
    const { isVisibleParms, setIsVisibleParms } = infoUser;
    return { isVisibleParms, setIsVisibleParms };
}



//#A0522D

//#CD853F, #F4A460





