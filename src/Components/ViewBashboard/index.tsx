import React, { useState, useEffect } from 'react';
import './styles.css';
import Logo2 from '../../Assets/logo2.png';
import Edit from '../../Assets/edit.png';
import Certificate from '../../Assets/certificate.png';
import api from '../../Service/api';
import { isMobile } from 'react-device-detect'
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
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
        <div className="form-view-bash">
          <img src={Logo2} width='80%' height='20%' alt="Menina Levada" />
          <div className="view-rast">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder='insira o código de rastreio' className='inputr' type="text" />
            {loading ?
              <strong onClick={handleSubmitRast} className='inputrs'>Aguarde</strong> :
              <strong onClick={handleSubmitRast} className='inputrs'>Rastrear</strong>
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
                  })}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
      <div className="floatbutton">
        <img src={Edit} width='40%' height='40%' alt="Editar Configurações" />
      </div>
      {results.length !== 0 &&
        <div className="floatbutton-certi">
          <img src={Certificate} width='50%' height='50%' alt="Emitir Certificado" />
        </div>}
    </div>

  );
}

export default ViewBashboard;