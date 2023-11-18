import React, { useEffect } from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import { SidebarContext } from '../context/sidebar_context.tsx';
import { SideBarContextType } from "../@types/sideBarType.tsx";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Button, TextField } from '@mui/material';
import { logOut } from '../login/backend-api.ts';
import SearchBar from './SearchBar.tsx';
import { RoleContext } from '../context/roles_context.tsx';

const roles = [{option: 'student', name: "Student"}, { option: 'teacher', name: "Teacher"}, { option: 'admin', name: "Admin"}, { option: 'company', name: "Company"}];

const Navbar = () => {
  const {openSidebar} = React.useContext(SidebarContext) as SideBarContextType;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { role, setRole } = React.useContext(RoleContext);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleOptionSelected(setting: string){
    if (setting == 'logOut') {
      logOut()
    }
    else if (setting == 'Profile') {
      window.location.href = '/profile';
    }
    else if (setting == 'courses') {
      window.location.href = '/mycourses';
    }
    else
    window.location.href = '/' + setting;
  }
  function handleRolSelected(event: React.ChangeEvent<HTMLInputElement>){
    console.log(event.target.value)
    setRole(event.target.value)
  }
  return (
    <NavbarWrapper className = "bg-white-dark flex">
      <div className='container w-100'>
        <div className='brand-and-toggler flex flex-between w-100'>
          <Link to = "/" className='navbar-brand text-uppercase ls-1 fw-8'>
            <span>F</span>iubademy
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, paddingLeft:"50px"}}>
          {role === "Teacher" && (
        <Button
          key={"New course"}
          href={'/courses'} 
          sx={{ my: 2, display: 'block' }}
        >
          {"New course"}
        </Button>
      )}

           {role === "Company" && (
        <Button
          key={"New Company course"}
          href={'/companycourses'} 
          sx={{ my: 2, display: 'block' }}
        >
          {"New Company course"}
        </Button>
      )}
      {role === "Teacher" && (
        <Button
          key={"New learning path"}
          href={'/learningPath'} 
          sx={{ my: 2, display: 'block' }}
        >
          {"New learning path"}
        </Button>
      )}
      {role === "Admin" && (
        <Button
          key={"New category"}
          href={'/category'} 
          sx={{ my: 2, display: 'block' }}
        >
          {"New category"}
        </Button>
        
      )}
      {role === "Admin" && (
        <Button
          key={"Moderate courses"}
          href={'/moderateCourses'} 
          sx={{ my: 2, display: 'block' }}
        >
          {"Moderate courses"}
        </Button>
        
      )}
      {role === "Student" && isLoggedIn && (
        <Button
          key={"My interests"}
          href={'/interests'} 
          sx={{ my: 2, display: 'block' }}
        >
          {"My interests"}
        </Button>
      )}
          </Box>
          <div style={{ marginRight: '20px' }}>
      <SearchBar/>
    </div>
    {/* add two buttons for sign in and sign up */}
    { !isLoggedIn
      &&
      <>
        <Button
          key={"Sign In"}
          onClick={() => handleOptionSelected("signIn")}
          sx={{ fontSize: '14px', display: 'block' }}
        >
          {"Sign In"}
          </Button>
          <Button
          key={"Sign Up"}
          onClick={() => handleOptionSelected("signUp")}
          sx={{ fontSize: '10px', display: 'block' }}
        >
          {"Sign Up"}
        </Button>
      </>
    }
    {isLoggedIn && (<>
      <TextField
        id="roles-dropdown"
        select
        label="Rol"
        defaultValue={role}
        onChange={handleRolSelected}
      >
        {roles.map((option) => (
          <MenuItem key={option.option} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ flexGrow: 0, padding: 2 }}>
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
            onClose={handleCloseUserMenu}
          >
            <MenuItem key={'logOut'} onClick={() => handleOptionSelected("logOut")}>
              <Typography textAlign="center">{"log Out"}</Typography>
            </MenuItem>
            <MenuItem key={'Profile'} onClick={() => handleOptionSelected("Profile")}>
              <Typography textAlign="center">{"Profile"}</Typography>
            </MenuItem>
            <MenuItem key={'Courses'} onClick={() => handleOptionSelected("courses")}>
              <Typography textAlign="center">{"My courses"}</Typography>
            </MenuItem>
          </Menu>
      </Box></>)
    }
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