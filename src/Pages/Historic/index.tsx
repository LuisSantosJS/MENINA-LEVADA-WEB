import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import api, { APIURL } from '../../Service/api';
import io from "socket.io-client";
import './styles.css';
import { useToasts } from 'react-toast-notifications';
interface ITEM {
    id: number,
    nome_cliente: string,
    localidade: string,
    date: string,
    code: string,
    produto: string
}
const Historic: React.FC = () => {
    const [hist, setHist] = useState<ITEM[]>([]);
    const { addToast } = useToasts();
    const socket = io(APIURL);
    useEffect(() => {
        api.get('/historic/index').then(res => {
            setHist(res.data.res);
        })

    }, [])
    useEffect(() => {
        socket.on('historic', (res: ITEM[]) => {
            setHist(res);
        })
    }, [socket])

    const openCerti = (code: string) => {
        addToast('O certificado pode estar indisponível!', {
            appearance: 'info',
            autoDismiss: false,
          });
        return window.open(`${APIURL}/download/certificado?id=${code}`, '_blank')
    }

    const deletar = (code: string) => {
        api.post('/historic/delete', {
            code: code
        })
    }
    return (
        <div className='container'>
            <Header />
            <div className="view">
                <div className='form-bash'>
  
                    {hist.length <= 0 ?
                        <div>Não há histórico para gerenciar</div> : <>
                        <div className='textHisto'>Histórico de certificados</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome Cliente</th>
                                    <th>Data</th>
                                    <th>Localidade</th>
                                    <th>Produto</th>
                                    <th>Código</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {hist.map((res, index) => {
                                    return (
                                        <tr key={index} >
                                            <td onClick={() => openCerti(res.code)} >{res.nome_cliente}</td>
                                            <td onClick={() => openCerti(res.code)} >{res.date}</td>
                                            <td onClick={() => openCerti(res.code)} >{res.localidade}</td>
                                            <td onClick={() => openCerti(res.code)}>{res.produto}</td>
                                            <td onClick={() => openCerti(res.code)}>{res.code}</td>
                                            <td onClick={() => deletar(res.code)} className='excluir' >EXCLUIR</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Historic;
