import React from 'react';
import logo from '../../images/logo.svg';

const Header = () => {
    return (
      <header style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
        <img src={logo} alt="Logo" style={{ height: '100px' }} />
      </header>
    )
};

export default Header;