
import { Box, Divider, List, ListItemButton, Paper, Typography } from '@mui/material';
import { Trip, TripListProps } from '../../types';
import { formatCurrency, formatDate } from '../../utils/format';
import { useState } from 'react';
import { statusEnum } from '../../enumeration';
import StatusCircle from './statusCircle';
import CircularProgress from '@mui/material/CircularProgress';

interface CityNameWithStatusProps {
    status: string
    city: string
}

function CityNameWithStatus(props: CityNameWithStatusProps) {
    const { status, city } = props

    const APROVADA = status === statusEnum[statusEnum.APROVADA]
    const REPROVADA = status === statusEnum[statusEnum.REPROVADA]
    const APROVADA_PARCIAL = status === statusEnum[statusEnum.APROVADA_PARCIAL]
    const EM_ANDAMENTO = status === statusEnum[statusEnum.EM_ANDAMENTO]
    const AGUARDANDO_INICIO = status === statusEnum[statusEnum.AGUARDANDO_INICIO]
    const AGUARDANDO_APROVACAO = status === statusEnum[statusEnum.AGUARDANDO_APROVACAO]

    if (APROVADA || REPROVADA || APROVADA_PARCIAL) {
        return (
            <div className="w-1/3 flex items-center justify-start">
                <StatusCircle hide={true} />
                <Typography className='text-start'>{city}</Typography>
            </div>
        )
    }

    let statusId: number = 0
    if (EM_ANDAMENTO) {
        statusId = statusEnum.EM_ANDAMENTO
    }
    if (AGUARDANDO_INICIO) {
        statusId = statusEnum.AGUARDANDO_INICIO
    }
    if (AGUARDANDO_APROVACAO) {
        statusId = statusEnum.AGUARDANDO_APROVACAO
    }

    if (!statusId) {
        return (
            <div className="w-1/3 flex items-center justify-start">
                <StatusCircle hide={true} />
                <Typography className='text-start'>{city}</Typography>
            </div>
        )
    }

    return (
        <div className="w-1/3 flex items-center justify-start">
            <StatusCircle status={statusId} />
            <Typography className='text-start'>{city}</Typography>
        </div>
    )
}

export default function TripList(props: TripListProps) {
    const { trips, handleClickTrip, existentTrip } = props
    const [selectedId, setSelectedId] = useState(0);

    if (selectedId === 0 && existentTrip != undefined) {
        setSelectedId(existentTrip)
    }
    const handleSelectId = (id: number) => {
        setSelectedId(id)
    }

    return (
        <Paper className='w-full' sx={{ overflow: 'auto', height: existentTrip ? 370 : 682 }}>
            {
                !trips ?
                    <Loading /> :
                    <ListItem
                        handleClickTrip={handleClickTrip}
                        handleSelectId={handleSelectId}
                        list={trips}
                        selectedId={selectedId} />
            }
        </Paper>
    );
}

const Loading = () => {
    return (
        <Box className='flex h-full items-center justify-center'>
            <CircularProgress />
        </Box>
    )
}


interface ListItemProps {
    list: Trip[]
    selectedId: number
    handleClickTrip: Function
    handleSelectId: Function
}

const ListItem = (props: ListItemProps) => {
    const { handleClickTrip, handleSelectId, list, selectedId } = props
    return (
        <List>
            {
                list && list.map((trip: Trip) => (
                    <div key={trip.id}>
                        <ListItemButton
                            selected={trip.id === selectedId}
                            onClick={() => {
                                handleClickTrip(trip.id)
                                handleSelectId(trip.id)
                            }}
                            key={trip.id}>
                            <div className='flex justify-between items-center w-full'>
                                <CityNameWithStatus status={trip.status} city={trip.cidade} />
                                <span className='w-1/3 text-end text-sm'>R$ {formatCurrency(trip.valorTotal)}</span>
                            </div>
                        </ListItemButton>
                        <Divider />
                    </div>
                ))
            }
        </List>
    )
}
