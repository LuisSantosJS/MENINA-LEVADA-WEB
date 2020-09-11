import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../Service/api';
import io from "socket.io-client";

type ContextType = {
    userSaved: boolean;
    setUserSaved: (value: boolean) => void;
    isVisibleParms: boolean;
    setIsVisibleParms: (value: boolean) => void;
    userID: number;
    setUserID: (value: number) => void;


};

interface USERS {
    id: number,
    email: string,
    disabled: boolean
}

const ContextMain = createContext<ContextType>({
    userSaved: false,
    setUserSaved: (value: boolean) => { },
    isVisibleParms: false,
    setIsVisibleParms: (value: boolean) => { },
    userID: 0,
    setUserID: (value: number) => { },

});


const Provider: React.FC = ({ children }) => {

    const [userSaved, setUserSaved] = useState<boolean>(false);
    const [isVisibleParms, setIsVisibleParms] = useState<boolean>(false);
    const [userID, setUserID] = useState<number>(0);
    const socket = io("https://api-mlevada.herokuapp.com");

    useEffect(() => {
        const isSaved = localStorage.getItem('@userSaved');
        // console.log('isSaved', isSaved)
        if (String(isSaved) === 'true') {
            const isID = localStorage.getItem('@userID');
            setUserID(Number(isID))
            setUserSaved(true)
            api.get(`/admin/unique?id=${Number(isID)}`).then(res => {
                if (Boolean(res.data.res) === true) {
                    setUserID(0)
                    setUserSaved(false);
                    localStorage.clear()
                }
            })


        }
    }, []);
    useEffect(() => {
        if (userSaved) {
            const isID = localStorage.getItem('@userID');

            socket.on('users', (res: USERS[]) => {
                res.forEach(resp => {
                    if (Number(resp.id) === Number(isID)) {
                        if (Boolean(resp.disabled) === true) {
                            setUserID(0)
                            setUserSaved(false);
                            localStorage.clear();
                        }
                    }
                })
                //   console.table(res);
            })


        }
    }, [userSaved, socket]);


    return (
        <ContextMain.Provider value={{
            userSaved, setUserSaved,
            isVisibleParms, setIsVisibleParms,
            userID, setUserID
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


export function useUserID() {
    const infoUser: ContextType = useContext(ContextMain);
    const { userID, setUserID } = infoUser;
    return { userID, setUserID };
}



//#A0522D

//#CD853F, #F4A460





