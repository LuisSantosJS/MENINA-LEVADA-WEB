import React, { useState } from 'react';
import api from '../../Service/api';
import './styles.css';
import { isMobile } from 'react-device-detect';
import Truck from '../../Assets/delivery.png';
import { useConfig } from '../../Context/ContextConfig';
import { useToasts } from 'react-toast-notifications';

interface RESULT {
    pricing: string;
    days: string;
    service: string;
}

const FormMain: React.FC = () => {
    const { config } = useConfig();
    const { addToast } = useToasts();
    const [pricing, setPricing] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [comprimento, setComprimento] = useState<string>('');
    const [largura, setLargura] = useState<string>('');
    const [altura, setAltura] = useState<string>('');
    const [peso, setPeso] = useState<string>('');
    const [results, setResults] = useState<RESULT[]>([]);


    const SERVICES = [
        {
            cod: '04014',
        },
        {
            cod: '04510'
        }
    ];

    //04014  SEDEX à vista
    //04510  PAC à vista
    //40290  SEDEX Hoje Varejo

    const getNameService = (cod: string) => {
        if (cod === '04014') {
            return 'SEDEX à vista'
        }
        if (cod === '04510') {
            return 'PAC à vista'
        }
    }

    const handleSubmit = () => {
        setResults([]);
        SERVICES.forEach(ser => {
            const DATA = {
                sCepDestino: cep,
                nVlPeso: peso,
                nVlComprimento: comprimento,
                nVlAltura: altura,
                nVlLargura: largura,
                nCdServico: String(ser.cod)
            }
            console.log('DATA', DATA)
            api.post('/calc', DATA).then(res => {
                if (res.data.message === 'error') {
                    console.log('ERROR', res.data)
                    return addToast('Ocorreu um erro! Preencha todos os campos!', {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                } else {
                    if (String(res.data.Erro) !== String(0)) {
                        return addToast(`Ocorreu um erro! code:${res.data.Erro}`, {
                            appearance: 'error',
                            autoDismiss: true,
                        });
                    } else {
                        const RESU = {
                            pricing: res.data.Valor,
                            days: res.data.PrazoEntrega,
                            service: String(getNameService(String(res.data.Codigo)))

                        }
                        setResults([...results, RESU])
                    }
                }
            })
        })
        return console.log('result', results)
    }

    return (
        <div className='form-main'>
            <div className="form-view">
                <div className='inputdecima'>
                    <div className="viewLabel">
                        <label>Origem</label>
                        <input className='inputs' disabled placeholder={String(config.origin)} />
                    </div>
                    <div className="viewTruck">
                        <img className='truck' src={Truck} alt="Caminhão" />
                    </div>
                    <div className="viewLabel">
                        <label>Destino</label>
                        <input className='inputs' value={cep} onChange={(e) => setCep(e.target.value)} type='number' placeholder='CEP' />
                    </div>
                </div>
                <div className="viewLabel4">
                    <label>{!isMobile ? 'R$' : 'Reais(R$)'}</label>
                    <input className='inputs' value={pricing} onChange={(e) => setPricing(String(e.target.value))} type='number' placeholder='Preço da mercadoria' />
                </div>
                <div className='inputreal2'>
                    <div className="viewLabel2">
                        <label className='labelss'>{!isMobile ? 'cm' : 'Comprimento(cm)'}</label>
                        <input type='number' value={comprimento} onChange={(e) => setComprimento(e.target.value)} className='inputpreco' placeholder='Comprimento' />
                    </div>
                    <div className="viewLabel2">
                        <label className='labelss'>{!isMobile ? 'cm' : 'Altura(cm)'}</label>
                        <input type='number' value={altura} onChange={(e) => setAltura(e.target.value)} className='inputpreco' placeholder='Altura' />
                    </div>
                </div>

                <div className='inputreal2'>
                    <div className="viewLabel2">
                        <label className='labelss' >{!isMobile ? 'cm' : 'Largura(cm)'}</label>
                        <input type='number' value={largura} onChange={(e) => setLargura(e.target.value)} className='inputpreco' placeholder='Largura' />
                    </div>
                    <div className="viewLabel2">
                        <label className='labelss' >{!isMobile ? 'kg' : 'Peso (kg)'}</label>
                        {/* <input type='number' value={peso} onChange={(e) => setPeso(e.target.value)} className='inputpreco' placeholder='Peso' /> */}
                        <input type='number' value={peso} onChange={(e) => setPeso(e.target.value)} className='inputpreco' placeholder='Peso' />
                    </div>
                </div>
                {results.length !== 0 &&
                    <div className="viewResult">
                        <table>
                            <thead>
                                <tr>
                                    <th>Serviço</th>
                                    <th>Prazo de entrega</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((res, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{res.service}</td>
                                            <td>{res.days}</td>
                                            <td>{res.pricing}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }
                <span onClick={handleSubmit} defaultValue={'Calcular'} >{`Calcular`}</span>
            </div>
        </div>
    )
}
export default FormMain;