import React, { useState } from 'react';
import api from '../../Service/api';
import './styles.css';
import Truck from '../../Assets/delivery.png';
import { useConfig } from '../../Context/ContextConfig';
const FormMain: React.FC = () => {
    const { config } = useConfig();
    const [service, setService] = useState<string>('0')
    const [format, setFormat] = useState<string>('0')
    const [pricing, setPricing] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [comprimento, setComprimento] = useState<string>('');
    const [largura, setLargura] = useState<string>('');
    const [altura, setAltura] = useState<string>('');
    const [diametro, setDiametro] = useState<string>('');
    const [peso, setPeso] = useState<string>('');
    const [preco, setPreco] = useState<string>('');
    const [dias, setDias] = useState<string>('');
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const handleSubmit = () => {
        if (isSubmit) {
            return;
        }
        setIsSubmit(true);
        const DATA = {
            sCepDestino: cep,
            nVlPeso: peso,
            nCdFormato: format,
            nVlComprimento: comprimento,
            nVlAltura: altura,
            nVlLargura: largura,
            nCdServico: service,
            nVlDiametro: diametro,
        }
        // api.post('/calc', DATA).then(res => {
        //     if (res.data.message === 'error') {
        //         return;
        //     }
        //     setPreco(res.data.Valor);
        //     setDias(res.data.PrazoEntrega);
        // });

        return setIsSubmit(false)
    }

    return (
        <div className='form-main'>
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

            <div className='inputdeservico'>
                <select id="Servico" value={service} onChange={(e) => setService(e.target.value)} name="Serviço">
                    <option value="0">Selecione o tipo de serviço</option>
                    <option value="04014">SEDEX à vista</option>
                    <option value="04065">SEDEX à vista pagamento na entrega</option>
                    <option value="04510">PAC à vista</option>
                    <option value="04707">PAC à vista pagamento na entrega</option>
                    <option value="40169">SEDEX12 ( à vista e a faturar)</option>
                    <option value="40215">SEDEX12 ( à vista e a faturar)</option>
                    <option value="40290">SEDEX Hoje Varejo</option>
                </select>
            </div>
            <div className='inputdeservico'>
                <select id="formato" value={format} onChange={(e) => setFormat(e.target.value)} name="Formato">
                    <option value="0">Selecione o formato da embalagem</option>
                    <option value="1">Formato caixa/pacote</option>
                    <option value="2">Formato rolo/prisma</option>
                    <option value="3">Envelope (máximo 1kg)</option>
                </select>
            </div>


            <div className='inputreal2'>
                <div className="viewLabel2">
                    <label className='labelss'>Comprimento(cm)</label>
                    <input type='number' value={comprimento} onChange={(e) => setComprimento(e.target.value)} className='inputpreco' placeholder='Comprimento' />
                </div>
                <div className="viewLabel2">
                    <label className='labelss'>Altura(cm)</label>
                    <input type='number' value={altura} onChange={(e) => setAltura(e.target.value)} className='inputpreco' placeholder='Altura' />
                </div>
            </div>

            <div className='inputreal2'>
                <div className="viewLabel2">
                    <label className='labelss' >Largura(cm)</label>
                    <input type='number' value={largura} onChange={(e) => setLargura(e.target.value)} className='inputpreco' placeholder='Largura' />
                </div>
                <div className="viewLabel2">
                    <label className='labelss'>Diametro(cm)</label>
                    <input type='number' value={diametro} onChange={(e) => setDiametro(e.target.value)} className='inputpreco' placeholder='Diametro' />
                </div>
            </div>
            <div className='inputreal2'>
                <div className="viewLabel2">
                    <label className='labelss' >Peso (kg)</label>
                    <input type='number' value={peso} onChange={(e) => setPeso(e.target.value)} className='inputpreco' placeholder='Peso' />
                </div>
                <div className="viewLabel2">
                    <label className='labelss'>Preço (R$)</label>
                    <input type='number' value={pricing} onChange={(e) => setPricing(String(e.target.value))} className='inputpreco' placeholder='Preço' />
                </div>
            </div>


            <span onClick={handleSubmit} defaultValue={'Calcular'} >{!isSubmit ? `Calcular` : 'Aguarde'}</span>
        </div>
    )
}
export default FormMain;