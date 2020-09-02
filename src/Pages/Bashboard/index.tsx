import React from 'react';
import './styles.css';
import Header from '../../Components/Header';
import ViewBashboard from '../../Components/ViewBashboard';
const Bashboard: React.FC = () => {
    return (
        <>
            <Header />
            <ViewBashboard />
        </>
    );
}

export default Bashboard;