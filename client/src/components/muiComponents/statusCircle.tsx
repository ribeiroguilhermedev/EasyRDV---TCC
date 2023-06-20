import CircleIcon from '@mui/icons-material/Circle';
import { StatusCircleProps } from '../../types';
import { blue, green, yellow, red, amber, lightGreen } from '@mui/material/colors';
import { IconButton, Tooltip } from '@mui/material';
import { statusEnum } from '../../enumeration';


export default function StatusCircle(props: StatusCircleProps) {
    const { status, hide } = props

    if (hide) {
        return (
            <CircleIcon sx={{
                color: '#ffffff00',
                width: '11.2px',
                height: '11.2px',
                marginRight:'5px'
            }} />
        )
    }

    if (!status) {
        return (
            <CircleIcon sx={{
                color: '#ffffff00',
                width: '11.2px',
                height: '11.2px',
                marginRight:'5px'
            }} />
        )
    }

    const statusEnumValue: statusEnum = status

    const colors: any = {
        [statusEnum.AGUARDANDO_INICIO]: blue,
        [statusEnum.EM_ANDAMENTO]: green,
        [statusEnum.AGUARDANDO_APROVACAO]: yellow,
        [statusEnum.APROVADA]: lightGreen,
        [statusEnum.APROVADA_PARCIAL]: amber,
        [statusEnum.REPROVADA]: red,
    }

    const titles: any = {
        [statusEnum.AGUARDANDO_INICIO]: 'A iniciar',
        [statusEnum.EM_ANDAMENTO]: 'Em andamento',
        [statusEnum.AGUARDANDO_APROVACAO]: 'Aguardando aprovação',
        [statusEnum.APROVADA]: 'Aprovada',
        [statusEnum.APROVADA_PARCIAL]: 'Aprovada parcialmente',
        [statusEnum.REPROVADA]: 'Reprovada',
    }

    return (
        <Tooltip title={titles[statusEnumValue]}>
            <CircleIcon sx={{
                color: colors[statusEnumValue][500],
                width: '11.2px',
                height: '11.2px',
                marginRight:'5px'
            }} />
        </Tooltip>
    )


}