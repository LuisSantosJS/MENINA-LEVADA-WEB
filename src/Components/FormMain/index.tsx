import React from 'react'
import './styles.css'
import Truck from '../../Assets/delivery.png'
const FormMain: React.FC = () => {
    return (
        <div className='form-main'>
            <div className='inputdecima'>
                <div className="viewLabel">
                    <label>Origem</label>
                    <input className='inputs' disabled placeholder='1251614735' />
                </div>
                <div className="viewTruck">
                    <img className='truck' src={Truck} alt="Caminhão" />
                </div>
                <div className="viewLabel">
                    <label>Destino</label>
                    <input className='inputs' type='number' placeholder='CEP' />
                </div>
            </div>

            <div className="viewpreco">
                <div className="viewinputpreco">
                    <div className='iconpreco'>R$</div>
                    <input type='number' className='inputpreco' placeholder='Preço' ></input>
                </div>
            </div>
        </div>
    )
}
export default FormMain;