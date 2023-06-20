import { Tooltip, colors as materialColors } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { StatusCircleProps } from '../../types';
import { statusEnum } from '../../enumeration';

export default function StatusCircle(props: StatusCircleProps): JSX.Element {
    const { status, hide } = props
    if (hide) return <InvisibleCircle />
    if (!status) return <InvisibleCircle />
    
    const colors = {
        [statusEnum.AGUARDANDO_INICIO]: materialColors.blue[500],
        [statusEnum.EM_ANDAMENTO]: materialColors.green[500],
        [statusEnum.AGUARDANDO_APROVACAO]: materialColors.yellow[500],
        [statusEnum.APROVADA]: materialColors.lightGreen[500],
        [statusEnum.APROVADA_PARCIAL]: materialColors.amber[500],
        [statusEnum.REPROVADA]: materialColors.red[500],
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
        <Tooltip title={titles[status]}>
            <CircleIcon sx={{
                color: colors[status],
                width: '11.2px',
                height: '11.2px',
                marginRight: '5px'
            }} />
        </Tooltip>
    )


}

function InvisibleCircle() {
    return (
        <CircleIcon sx={{
            color: '#ffffff00',
            width: '11.2px',
            height: '11.2px',
            marginRight: '5px'
        }} />
    )
}