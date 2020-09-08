import React, { useState } from 'react';
import api from '../../Service/api';
import './styles.css';
import { isMobile } from 'react-device-detect';
import Truck from '../../Assets/delivery.png';
import { useConfig } from '../../Context/ContextConfig';
import { useToasts } from 'react-toast-notifications';
// @ts-ignore
import { mask } from 'remask';

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
        },
        {
            cod: '04065'
        },
        {
            cod:'04707'
        },
        {
            cod:'40290'
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
        if(cod ===  '04065'){
            return 'SEDEX à vista pagamento na entrega'
        }
        if(cod === '04707'){
            return 'PAC à vista pagamento na entrega'
        }
        if(cod === '40290'){
            return 'SEDEX Hoje Varejo'
        }
    }

    const handleSubmit = () => {
        setResults([]);
        SERVICES.forEach(ser => {
            const DATA = {
                sCepDestino: cep,
                nVlPeso: peso.replace(',', '.'),
                nVlComprimento: comprimento.replace(',', '.'),
                nVlAltura: altura.replace(',', '.'),
                nVlLargura: largura.replace(',', '.'),
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
                        return;
                        // return addToast(`Ocorreu um erro! code:${res.data.Erro}`, {
                        //     appearance: 'error',
                        //     autoDismiss: true,
                        // });
                    } else {
                        const RESU = {
                            pricing: res.data.Valor,
                            days: res.data.PrazoEntrega,
                            service: String(getNameService(String(res.data.Codigo)))

                        }
                        setResults(results => [...results, RESU])
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
                        <input className='inputs' value={cep} onChange={(e) => setCep(mask(e.target.value, ['99999999']))} placeholder='CEP' />

                    </div>
                </div>
                <div className="viewLabel4">
                    <label>{!isMobile ? 'R$' : 'Reais(R$)'}</label>
                    <input value={pricing} className='inputs' placeholder='Preço da mercadoria (R$)' onChange={(e) => setPricing(mask(e.target.value, ['9,999', '99,999', '999,999', '9999,99']))} />
                </div>
                <div className='inputreal2'>
                    {/* <div className="viewLabel2"> */}
                    
                        {/* <label className='labelss'>{!isMobile ? 'cm' : 'Comprimento(cm)'}</label> */}
                        <input value={comprimento} placeholder='Comprimento (cm)' onChange={(e) => setComprimento(mask(e.target.value, ['9,999', '99,999', '99,999', '999,99']))} className='inputs' />
                    {/* </div> */}
                    <div className="viewTruck"></div>
                    {/* <div className="viewLabel2"> */}
                        {/* <label className='labelss'>{!isMobile ? 'cm' : 'Altura(cm)'}</label> */}
                        <input value={altura} placeholder='Altura (cm)' onChange={(e) => setAltura(mask(e.target.value, ['9,999', '99,999', '99,999', '999,99']))} className='inputs' />
                    {/* </div> */}
                </div>

                <div className='inputreal2'>
                    {/* <div className="viewLabel2"> */}
                        {/* <label className='labelss' >{!isMobile ? 'cm' : 'Largura(cm)'}</label> */}
                        <input value={largura} onChange={(e) => setLargura(mask(e.target.value, ['9,999', '99,999', '99,999', '999,99']))} className='inputs' placeholder='Largura (cm)' />

                    {/* </div> */}
                    <div className="viewTruck"></div>
                    {/* <div className="viewLabel2"> */}
                        {/* <label className='labelss' >{!isMobile ? 'kg' : 'Peso (kg)'}</label> */}
                        <input value={peso} placeholder='Peso (kg)' onChange={(e) => setPeso(mask(e.target.value, ['9,999', '99,999']))} className='inputs' />
                        {/* <input type='number' value={peso}  className='inputpreco' placeholder='Peso' /> */}
                        {/* <Input className='inputpreco' placeholder='Peso' onChange={handleChangePeso} /> */}
                    {/* </div> */}
                </div>
                {results.length !== 0 &&
                    <div className="viewResultado">
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
                                            <td>{res.days} dias</td>
                                            <td>R${String(res.pricing).replace('.', ',')}</td>
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