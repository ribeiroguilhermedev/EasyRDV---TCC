import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BadgeIcon from '@mui/icons-material/Badge';
import { EmployeeProps } from '../../types/types';

const drawerWidth = 180;

export default function Aside({ employeeControlOpen, setEmployeeControlOpen }: EmployeeProps) {

    //    const [employeeControlOpen, setEmployeeControlOpen] = useState(false)
    useEffect(() => {
        setEmployeeControlOpen(employeeControlOpen);
    }, [employeeControlOpen]);

    function openEmployeeControl() {
        setEmployeeControlOpen(true)
    }

    const items = [{ nome: 'Funcionários', fClick: openEmployeeControl }]

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', position: 'unset' },
            }}>

            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {items.map((item) => (
                        <ListItem key={item.nome} onClick={item.fClick} disablePadding>
                            <ListItemButton>
                                <ListItemIcon style={{ minWidth: '40px' }}>
                                    {/* {index % 2 === 0 ? <BadgeIcon /> : <BadgeIcon />} */}
                                    <BadgeIcon />
                                </ListItemIcon>
                                <ListItemText primary={item.nome} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Box>
        </Drawer>

    );
}