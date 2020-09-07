import React, { useState, useEffect } from 'react';
import './styles.css';
import Logo2 from '../../Assets/logo2.png';
import Edit from '../../Assets/edit.png';
import Certificate from '../../Assets/certificate.png';
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
  const [results, setResults] = useState<ITEM[]>([]);
  const { addToast } = useToasts();
  const { config, setConfig } = useConfig();
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [localidade, setLocalidade] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [produto, setProduto] = useState<string>('');
  const [isRenderEdit, setIsRenderEdit] = useState<boolean>(false);

  const handleSaveConfig = () => {
    if((String(config.origin).length === 0) || (String(config.addition_days).length === 0) ||  (String(config.addition_price).length === 0)){
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
      status: results[Number(results.length - 1)].status
    });
    return window.open(`http://localhost:3333/download/certificado?id=${code}`, '_blank')

  }

  const handleSubmitRast = () => {
    if (code.length === 0) {
      return addToast('Insira o código de rastreio!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    setLoading(true);
    api.post('/rast', {
      code: code
    }).then(res => {
      setResults(res.data);
    }).catch(() => {
      setLoading(false)
      return addToast('Ocorreu um erro!', {
        appearance: 'error',
        autoDismiss: true,
      });
    })
    setLoading(false)
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
              <input value={config.addition_price} onChange={e => setConfig({ ...config, addition_price: mask(e.target.value,['9,999', '99,999', '99,999', '999,99']) })}  className='inputs' />
            </div>
            <div className="viewLabel4">
              <label>{'Dias Adicionais'}</label>
              <input value={config.addition_days} onChange={e => setConfig({ ...config, addition_days: mask(e.target.value,['9', '99', '999']) })}  className='inputs' />
            </div>
            <div className="viewLabel4">
              <label>{'CEP de Origem'}</label>
              <input value={config.origin} onChange={e => setConfig({ ...config, origin: mask(e.target.value,['99999999']) })}  className='inputs' />
            </div>
            <span onClick={handleSaveConfig} defaultValue={'Salvar'} >{`Salvar`}</span>

          </> :
          <div className={results.length === 0 ?"form-view" : "form-view-bash"}>
            <div className="view-rast">
              <img src={Logo2} width='80%' height='50%' alt="Menina Levada" />
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder='insira o código de rastreio' className='inputr' type="text" />
              {results.length !== 0 && <>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder='insira o nome do cliente' className='inputr' type="text" />
                <input value={localidade} onChange={(e) => setLocalidade(e.target.value)} placeholder='insira a localidade do cliente' className='inputr' type="text" />
                <input value={produto} onChange={(e) => setProduto(e.target.value)} placeholder='insira o nome produto' className='inputr' type="text" /></>}
              {loading ?
                <strong onClick={handleSubmitRast} className='inputrs'>Aguarde</strong> :
                <strong onClick={handleSubmitRast} className='inputrs'>Rastrear Produto</strong>
              }

            </div>
            <div className="bodyview">
              {results.length !== 0 &&
                <table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Data</th>
                      <th>Hora</th>
                      <th>Local</th>
                    </tr>
                    <tr>
                      <td>{results[0].status}</td>
                      <td>{results[0].data}</td>
                      <td>{results[0].hora}</td>
                      <td>{results[0].local}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <th>Data</th>
                      <th>Origem</th>
                      <th>Destino</th>
                    </tr>
                  </thead>
                  <tbody>
                  
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
              }
            </div>
          </div>
        }
      </div>
      <div onClick={() => setIsRenderEdit(!isRenderEdit)} className="floatbutton">
        <img src={Edit} width='40%' height='40%' alt="Editar Configurações" />
      </div>
      {results.length !== 0 && !isRenderEdit &&
        <div onClick={handleCert} className="floatbutton-certi">
          <img src={Certificate} width='50%' height='50%' alt="Emitir Certificado" />
        </div>}
    </div>

  );
}

export default ViewBashboard;