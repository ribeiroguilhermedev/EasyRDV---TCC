import { useState } from "react"
import { EmployeeProps } from "../../types/types"
import { useQuery } from "react-query";
import { User } from "../../types/types";
import { useAuth } from "../../auth/authContext";
import EmployeeRegisterDialog from "../../components/dialogs/employeeRegisterDialog";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import BadgeIcon from '@mui/icons-material/Badge';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Divider from "@mui/material/Divider";
import apiClient from "../../services/api";
import EmployeeCard from "../muiComponents/employeeCard";
import Loading from "../muiComponents/loading";

const EmployeeControl = ({ employeeControlOpen, setEmployeeControlOpen }: EmployeeProps) => {
    const [isOpen, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(12)
    const [users, setUsers] = useState<User[]>([])
    const { currentUser } = useAuth();
    const token = currentUser?.token;

    const { isLoading } = useQuery(["employees", perPage, currentPage], () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return apiClient.get('http://localhost:8080/usuario/cadastro/1', {
            params: { limit: perPage, page: currentPage }, ...config
        })
            .then((response => setUsers(response.data)));
    })


    if (isLoading) { // Verifica se a lista de funcionários está vazia
        return <Loading />;
    }

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
                <div className="flex flex-row flex-wrap gap-2 justify-center ">
                    {users.map((employee: User) => (
                        <EmployeeCard
                            key={employee.id}
                            nome={employee.nome}
                            email={employee.email}
                            id={employee.id}
                            data_criacao={employee.data_criacao}
                            sobrenome={employee.sobrenome}
                            users={users} 
                            onDeletedUser={setUsers}
                            />
                    ))}
                </div>
            </Container>
            <EmployeeRegisterDialog open={isOpen} onClose={() => setOpen(false)} users={users} onUserCreated={setUsers} />
        </>
    )
}

export default EmployeeControl
