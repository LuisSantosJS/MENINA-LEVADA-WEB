import React, { useState, useEffect } from 'react';
import api from '../../Service/api';
import axios from 'axios'
import './styles.css';
import Logo2 from '../../Assets/logo2.png';
import { isMobile } from 'react-device-detect';
import { useToasts } from 'react-toast-notifications';
interface ITEM {
    status: string,
    data: string,
    hora: string,
    local: string | undefined;
    origem: string | undefined;
    destino: string | undefined;
    unidade: string | undefined;
}


const Order: React.FC = () => {

    let config = {
     headers: {
                'Authorization': `Bearer ` + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOjEwNjg4NiwiZHQiOiIyMDIxMDcwNiJ9._AzMLO8Iz829iSd5icRQ5KThSmpa9wq3vdc49USOO-c',
                'x-apikey': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOjEwNjg4NiwiZHQiOiIyMDIxMDcwNiJ9._AzMLO8Iz829iSd5icRQ5KThSmpa9wq3vdc49USOO-c',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        
    }

    const { addToast } = useToasts();
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [results, setResults] = useState<ITEM[]>([]);
    const [isJadLog, setIsJadLog] = useState<boolean>(false)
    const handleSubmitJadLog = () => {
        axios.post(`https://www.jadlog.com.br/embarcador/api/tracking/consultar`, {
            consulta: [
                { shipmentId: code } 
            ]
        }, config).then((e) => {
            setResults(e.data.consulta[0].tracking.eventos)
        }).catch((e) => {
            console.log(e)
            addToast(`Ocorreu um erro! ${e}`, {
                appearance: 'error',
                autoDismiss: true,
            });
        }).finally(() => {
            setLoading(false)
        })
    }
    const handleSubmitRast = () => {
        if (loading) return;
        if (code.length === 0) {
            return addToast('Insira o código de rastreio!', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
        setLoading(true)
        if (isJadLog) {
            return handleSubmitJadLog()
        }
        api.post('/rast', {
            code: code
        }).then(res => {
            setResults(res.data);
        }).catch(() => {
            return addToast('Ocorreu um erro!', {
                appearance: 'error',
                autoDismiss: true,
            });
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        if (isMobile) {
            addToast('Acesse pelo computador!', {
                appearance: 'info',
                autoDismiss: true,
            });
        }
    }, [addToast])


    return (
        <div className='form-main'>
            {/* <div className={results.length === 0 ? 'form-view-initial' : "form-view"}> */}
            <div className={"view-rast"}>
                <img src={Logo2} width='80%' height='50%' alt="Menina Levada" />
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={`Insira o código de rastreio ${isJadLog ? '(shipmentId)' : ''}`} className='inputr' type="text" />
                <div className='viewRowwaa'>
                    <input value={String(isJadLog)} onChange={(e) => setIsJadLog(!isJadLog)} id='ccc' type='checkbox' />
                    <label className='viewRowwaaText' htmlFor='ccc'>Código de rastreio da JadLog</label>
                </div>
                <strong onClick={handleSubmitRast} className='inputrs'>{loading ? 'Carregando...' : 'Rastrear Produto'}</strong>
            </div>
            {Boolean(!isJadLog && results.length !== 0) && <>
                <div style={{ flexDirection: 'column', overflow: 'hidden' }} className="bodyview">
                    <div style={{ padding: 10 }} className='view-spacing' />
                    <table>
                        <thead>
                            <tr>
                                <th className='primary' >Status</th>
                                <th className='primary'>Data</th>
                                <th className='primary'>Hora</th>
                                <th className='primary'>Local</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{results[0].status}</td>
                                <td>{results[0].data}</td>
                                <td>{results[0].hora}</td>
                                <td>{results[0].local}</td>
                            </tr>
                            <tr>
                                <th className='primary'>Status</th>
                                <th className='primary'>Data</th>
                                <th className='primary'>Origem</th>
                                <th className='primary'>Destino</th>
                            </tr>

                            {results.map((res, index) => {
                                if (index !== 0) {
                                    return (
                                        <tr key={index}>
                                            <td>{res.status}</td>
                                            <td>{res.data}-{res.hora}</td>
                                            <td>{res.origem}</td>
                                            <td>{res.destino}</td>
                                        </tr>
                                    )
                                }
                                return null
                            })}
                        </tbody>
                    </table>

                </div>
            </>}
            {Boolean(isJadLog && results.length !== 0) && <>
                <div style={{ flexDirection: 'column', overflow: 'hidden' }} className="bodyview">
                    <div style={{ padding: 10 }} className='view-spacing' />
                    <table>
                        <thead>
                            <tr>
                                <th className='primary'>Status</th>
                                <th className='primary'>Data</th>
                                <th className='primary'>Local</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((res, index) => {
                                if (index !== 0) {
                                    return (
                                        <tr key={index}>
                                            <td>{res.status}</td>
                                            <td>{res.data}</td>
                                            <td>{res?.unidade}</td>
                                        </tr>
                                    )
                                }
                                return null
                            })}
                        </tbody>
                    </table>

                </div>
            </>}
        </div>
    )
}
export default Order;