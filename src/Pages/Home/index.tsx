import React, { useEffect } from 'react';
import Header from '../../Components/Header'
import FormViewMain from '../../Components/FormViewMain';
import { useRouteParmRender } from '../../Context/ContextMain';
import './styles.css'
const Home: React.FC<any> = ({ ...props }) => {
    const { bol } = props.children;
    const { setIsVisibleParms } = useRouteParmRender();
    useEffect(() => {
        setIsVisibleParms(Boolean(bol));
    }, [bol, setIsVisibleParms])
    return (
        <div className='container'>
            <Header />
            <FormViewMain>
            </FormViewMain>
        </div>
    );
}
export default Home;