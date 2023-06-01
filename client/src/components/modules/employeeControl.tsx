import { useState } from "react"
import { EmployeeProps } from "../../types"
import { useQuery } from "react-query";
import { User } from "../../types";
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
import Search from "../muiComponents/search";
import { Pagination, Stack } from "@mui/material";

const EmployeeControl = ({ employeeControlOpen, setEmployeeControlOpen }: EmployeeProps) => {
    const [isOpen, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [perPage, setPerPage] = useState(4)
    const [users, setUsers] = useState<User[]>([])
    const [busca, setBusca] = useState<string>('')
    const { currentUser } = useAuth()
    const token = currentUser?.token

    const { isLoading } = useQuery(["employees", perPage, currentPage], () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return apiClient.get(`usuario/${currentUser?.empresa_id}`, {
            params: { limit: perPage, offset: currentPage - 1 }, ...config
        }).then((response => {
            setUsers(response.data.elements)

            const totalElements = response.data.totalElements

            if (totalElements < perPage) {
                setTotalPages(0)
                return
            }

            const totalPages = Math.ceil(totalElements / perPage)
            setTotalPages(totalPages)
        }));
    })

    const handlePageChange = (event: any, value: number) => {
        setCurrentPage(value);
    }


    if (isLoading) { // Verifica se a lista de funcionários está vazia
        return <Loading />;
    }

    const filteredUsers = users.filter((user) => ((user.nome).toLowerCase()).startsWith(busca.toLowerCase()))

    return (
        <>
            <Stack className="flex h-full ml-10 mr-10 flex-col">
                <Box className="flex w-full justify-between items-center mb-2">
                    <div className="flex gap-3">
                        <BadgeIcon sx={{ fontSize: 30 }} />
                        <Typography variant="h5">Funcionários</Typography>
                    </div>
                    <Search setBusca={setBusca} busca={busca} />
                    <Button variant="outlined" onClick={() => setOpen(true)} startIcon={<AddIcon />}>
                        Cadastrar
                    </Button>
                </Box>
                <div>
                    <Divider />
                </div>
                <div className="flex flex-col grow shrink justify-between">
                    <div className="mt-5 flex flex-row flex-wrap gap-2 justify-center ">
                        {filteredUsers.map((employee: User) => (
                            <EmployeeCard
                                key={employee.id}
                                nome={employee.nome}
                                email={employee.email}
                                id={employee.id}
                                data_criacao={employee.data_criacao}
                                sobrenome={employee.sobrenome}
                                cpf={employee.cpf}
                                rg={employee.rg}
                                observacao={employee.observacao}
                                users={users}
                                flag_ativo={employee.flag_ativo}
                                data_nascimento={employee.data_nascimento}
                                onDeletedUser={setUsers}
                            />
                        ))}
                    </div>
                    {
                        totalPages > 0 &&
                        <div className="flex items-center justify-center mb-1">
                            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                        </div>
                    }
                </div>
            </Stack>
            <EmployeeRegisterDialog open={isOpen} onClose={() => setOpen(false)} users={users} onUserCreated={setUsers} />
        </>
    )
}

export default EmployeeControl
