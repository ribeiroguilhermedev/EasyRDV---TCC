import React, { useState } from "react"
import { useAuth } from "../../auth/authContext"
import { useLocation } from 'react-router-dom';
import EmployeeRegister from "../../components/dialogs/employeeRegister";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Home = () => {
  const auth = useAuth()
  const location = useLocation();

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <header>
        <AppBar>
          <Toolbar className="flex justify-between items-center">
            Bem-vindo, {location.state.currentUser?.name}!
            <Button color="inherit" onClick={() => setOpen(true)} >Cadastrar</Button>
            <Button color="inherit" onClick={() => auth.logout()} >Logout</Button>
          </Toolbar>
        </AppBar>
      </header>
      <EmployeeRegister open={isOpen} onClose={() => setOpen(false)} />
    </>
  )
}

export default Home