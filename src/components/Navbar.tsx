import React from 'react';
import styled from "styled-components";
import {MdMenu} from "react-icons/md";
import {Link, redirect} from 'react-router-dom';
import { SidebarContext } from '../context/sidebar_context.tsx';
import { SideBarContextType } from "../@types/sideBarType.tsx";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const settings = ['SignIn'];

const Navbar = () => {
  const {openSidebar} = React.useContext(SidebarContext) as SideBarContextType;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseUserMenu = () => {
    window.location.href = '/signIn';
    setAnchorElUser(null);
  };
  return (
    <NavbarWrapper className = "bg-white flex">
      <div className='container w-100'>
        <div className='brand-and-toggler flex flex-between w-100'>
          <Link to = "/" className='navbar-brand text-uppercase ls-1 fw-8'>
            <span>F</span>iubademy
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu} href='/signUp'>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> 
        </div>
      </div>
    </NavbarWrapper>
  )
}

const NavbarWrapper = styled.nav`
  height: 80px;
  box-shadow: rgba(50, 50, 93, 0.15) 0px 16px 12px -2px, rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;

  .navbar-brand{
    font-size: 23px;
    span{
      color: var(--clr-orange);
    }
  }
  .cart-btn{
    margin-right: 18px;
    font-size: 23px;
    position: relative;
    .item-count-badge{
      background-color: var(--clr-orange);
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 12px;
      font-weight: 700;
      display: block;
      width: 23px;
      height: 23px;
      color: var(--clr-white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .sidebar-open-btn{
    transition: all 300ms ease-in-out;
    &:hover{
      opacity: 0.7;
    }
  }
`;

export default Navbar;