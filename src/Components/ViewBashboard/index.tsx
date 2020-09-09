import React, { useState, useEffect } from 'react';
import './styles.css';
import Logo2 from '../../Assets/logo2.png';
import Edit from '../../Assets/edit.png';
import api from '../../Service/api';
import { useConfig } from '../../Context/ContextConfig';
import { isMobile } from 'react-device-detect';
// @ts-ignore
import { mask } from 'remask';


import { useToasts } from 'react-toast-notifications';
interface ITEM {
  status: string,
  data: string,
  hora: string,
  local: string | undefined;
  origem: string | undefined;
  destino: string | undefined;
}
const ViewBashboard: React.FC = () => {
  const { addToast } = useToasts();
  const { config, setConfig } = useConfig();
  const [code, setCode] = useState<string>('');
  const [localidade, setLocalidade] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [produto, setProduto] = useState<string>('');
  const [isRenderEdit, setIsRenderEdit] = useState<boolean>(false);

  const handleSaveConfig = () => {
    if ((String(config.origin).length === 0) || (String(config.addition_days).length === 0) || (String(config.addition_price).length === 0)) {
      return addToast('Preencha todos os campos!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    api.post('/config/update', {
      origin: config.origin,
      addition_price: String(config.addition_price).replace(',', '.'),
      addition_days: config.addition_days
    }).then(res => {
      if (res.data.message === 'error') {
        return addToast('Ocorreu um erro ao salvar alterações!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
      return addToast('Alterações feitas com sucesso!', {
        appearance: 'success',
        autoDismiss: true,
      });

    }).catch(() => {
      return addToast('Ocorreu um erro ao salvar alterações!', {
        appearance: 'error',
        autoDismiss: true,
      });
    })
  }

  const handleCert = async () => {
    if ((localidade.length === 0) || (name.length === 0) || (produto.length === 0)) {
      return addToast('Prencha todos os campos!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    addToast('Gerando PDF!', {
      appearance: 'info',
      autoDismiss: true,
    });
    await api.post('/rast/certificado', {
      code,
      localidade,
      name,
      produto,
    });
    return window.open(`https://api-mlevada.herokuapp.com/download/certificado?id=${code}`, '_blank')

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
    <div className="view">
      <div className='form-bash'>
        {isRenderEdit ?
          <>
            <div className="viewLabel4">
              <label>{'Preço adicional (R$)'}</label>
              <input value={config.addition_price} onChange={e => setConfig({ ...config, addition_price: mask(e.target.value, ['9,999', '99,999', '99,999', '999,99']) })} className='inputs' />
            </div>
            <div className="viewLabel4">
              <label>{'Dias Adicionais'}</label>
              <input value={config.addition_days} onChange={e => setConfig({ ...config, addition_days: mask(e.target.value, ['9', '99', '999']) })} className='inputs' />
            </div>
            <div className="viewLabel4">
              <label>{'CEP de Origem'}</label>
              <input value={config.origin} onChange={e => setConfig({ ...config, origin: mask(e.target.value, ['99999999']) })} className='inputs' />
            </div>
            <span onClick={handleSaveConfig} defaultValue={'Salvar'} >{`Salvar`}</span>

          </> :
            <div className='center'>
            <img src={Logo2} width='70%' height='40%' alt="Menina Levada" />
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder='insira o código de rastreio' className='inputr' type="text" />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder='insira o nome do cliente' className='inputr' type="text" />
              <input value={localidade} onChange={(e) => setLocalidade(e.target.value)} placeholder='insira a localidade do cliente' className='inputr' type="text" />
              <input value={produto} onChange={(e) => setProduto(e.target.value)} placeholder='insira o nome produto' className='inputr' type="text" />
              <strong onClick={handleCert} className='inputrs'>Gerar Certificado</strong>
            </div>}
      </div>
          <div onClick={() => setIsRenderEdit(!isRenderEdit)} className="floatbutton">
            <img src={Edit} width='40%' height='40%' alt="Editar Configurações" />
          </div>
      </div>

  );
}

export default ViewBashboard;