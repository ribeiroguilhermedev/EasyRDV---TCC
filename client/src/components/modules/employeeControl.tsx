import { EmployeeProps } from "../../types/types"
import Paper from '@mui/material/Paper';
import CustomPaginationActionsTable from "../dataDisplay/tablePagination";



const EmployeeControl = ({employeeControlOpen, setEmployeeControlOpen}: EmployeeProps) => {


  return (
    <>
    <Paper elevation={20} style={{ marginTop: '4rem', height: "93.2vh", marginLeft: "15rem" }}>
        <CustomPaginationActionsTable/> 
        <button onClick={()=> setEmployeeControlOpen(false)}>Fechar</button>
    </Paper>
    </>
  )
}

export default EmployeeControl