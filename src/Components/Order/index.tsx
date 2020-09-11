import React, { useState, useEffect } from 'react';
import api from '../../Service/api';
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
}


const Order: React.FC = () => {

    const { addToast } = useToasts();
    const [code, setCode] = useState<string>('');
    const [results, setResults] = useState<ITEM[]>([]);
    const handleSubmitRast = () => {
        if (code.length === 0) {
            return addToast('Insira o código de rastreio!', {
                appearance: 'error',
                autoDismiss: true,
            });
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
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder='insira o código de rastreio' className='inputr' type="text" />
                <strong onClick={handleSubmitRast} className='inputrs'>Rastrear Produto</strong>
            </div>
            {results.length !== 0 && <>
            <div className='view-spacing' />
                <div className="bodyview">
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
           </> }
        </div>
    )
}
export default Order;