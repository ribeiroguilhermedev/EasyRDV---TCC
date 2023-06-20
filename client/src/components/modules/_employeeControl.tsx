import { Box, Button, Divider, Pagination, Stack, Typography } from '@mui/material';
import { Badge as BadgeIcon, Add as AddIcon } from '@mui/icons-material';
import EmployeeRegisterDialog from "../dialogs/_employeeRegisterDialog";
import { EmployeeCard, Loading, Search } from "../muiComponents";
import { User, EmployeeProps } from "../../types";
import { useAuth } from "../../auth/authContext";
import apiClient from "../../services/api";
import { useQuery } from "react-query";
import { useState } from "react";

export default function EmployeeControl({ employeeControlOpen, setEmployeeControlOpen }: EmployeeProps): JSX.Element {
    const [isOpen, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(4);
    const [users, setUsers] = useState<User[]>([]);
    const [busca, setBusca] = useState<string>('');
    const { currentUser } = useAuth();
    const token = currentUser?.token;

    const { isLoading } = useQuery(["employees", perPage, currentPage], () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return apiClient.get(`usuario/${currentUser?.empresa_id}`, {
            params: { limit: perPage, offset: currentPage - 1 }, ...config
        }).then((response => {
            setUsers(response.data.elements);

            const totalElements = response.data.totalElements;

            if (totalElements < perPage) {
                setTotalPages(0);
                return;
            }

            const totalPages = Math.ceil(totalElements / perPage);
            setTotalPages(totalPages);
        }));
    });

    const handlePageChange = (event: any, value: number) => {
        setCurrentPage(value);
    };


    if (isLoading) { // Verifica se a lista de funcionários está vazia
        return <Loading />;
    }

    const filteredUsers = users.filter((user) => ((user.nome).toLowerCase()).startsWith(busca.toLowerCase()));

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
                                onDeletedUser={setUsers} />
                        ))}
                    </div>
                    {totalPages > 0 &&
                        <div className="flex items-center justify-center mb-1">
                            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                        </div>}
                </div>
            </Stack>
            <EmployeeRegisterDialog open={isOpen} onClose={() => setOpen(false)} users={users} onUserCreated={setUsers} />
        </>
    );
}
