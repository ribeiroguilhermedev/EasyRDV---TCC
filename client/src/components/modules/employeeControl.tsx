import { useState } from "react"
import { EmployeeProps } from "../../types/types"
import EmployeeRegisterDialog from "../../components/dialogs/employeeRegisterDialog";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import BadgeIcon from '@mui/icons-material/Badge';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Divider from "@mui/material/Divider";

const EmployeeControl = ({ employeeControlOpen, setEmployeeControlOpen }: EmployeeProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Container className="flex flex-col justify-center items-center">
        <Box className="flex justify-between items-center mb-2">
          <div className="flex gap-3">
            <BadgeIcon sx={{ fontSize: 30 }} />
            <Typography variant="h5">Funcionários</Typography>
          </div>
          <Button variant="outlined" onClick={() => setOpen(true)} startIcon={<AddIcon />}>
            Cadastrar
          </Button>
        </Box>
        <Divider />
      </Container>
      <EmployeeRegisterDialog open={isOpen} onClose={() => setOpen(false)} />
    </>
  )
}

export default EmployeeControl



{/* <button onClick={() => setEmployeeControlOpen(false)}>Fechar</button> */}