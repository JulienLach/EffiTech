import React from 'react';
import logo from '../../images/logo.svg';

const Header = () => {
    return (
      <header style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
      </header>
    )
};

export default Header;