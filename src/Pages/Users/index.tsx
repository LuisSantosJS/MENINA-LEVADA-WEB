import React from 'react';
import Header from '../../Components/Header';
import FormUsers from '../../Components/FormUsers';
import './styles.css';

const Users: React.FC = () => {
    return (
        <div className='container'>
            <Header />
            <FormUsers />
        </div>
    );

}
export default Users;