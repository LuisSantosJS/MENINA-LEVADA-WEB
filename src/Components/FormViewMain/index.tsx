import React, { useState } from 'react';
import './styles.css'
import FormMain from '../FormMain';
import Rast from '../../Assets/order.png'
import { useRouteParmRender } from '../../Context/ContextMain'
import Order from '../Order';
const FormViewMain: React.FC = () => {
    const { isVisibleParms } = useRouteParmRender();
    const [isVisible, setIsVisible] = useState<boolean>(isVisibleParms);
    return (
        <div className='viewForm'>
            {isVisible ?
                <FormMain /> :
                <Order />}
            <div onClick={() => setIsVisible(!isVisible)} className="floatbutton zero">
                <img src={Rast} width='40%' height='40%' alt="Rastrear Objeto" />
            </div>
        </div>
    )
}
export default FormViewMain;