import { useState, useEffect } from 'react';

import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import icon from '../images/crypto.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  let location = useLocation();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleHideMenu = () => {
    if (screenSize >= 768) {
      return;
    }
    setActiveMenu(false)
  }

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={screenSize < 768 ? 4 : 3} className='logo'>
          <Link style={{ color: 'white', fontFamily: 'sans-serif' }} to='/'>
            Crypterodactyl
          </Link>
        </Typography.Title>
        <Button
          className='menu-control-container'
          icon={<MenuOutlined />}
          onClick={() => setActiveMenu((prev) => !prev)}
        />
      </div>
      {activeMenu && (
        <Menu theme='dark' defaultSelectedKeys={[location.pathname]}>
          <Menu.Item
            key='/'
            icon={<HomeOutlined />}
            onClick={handleHideMenu}
          >
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item
            key='/cryptocurrencies'
            icon={<FundOutlined />}
            onClick={handleHideMenu}
          >
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item
            key='/news'
            icon={<BulbOutlined />}
            onClick={handleHideMenu}
          >
            <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
