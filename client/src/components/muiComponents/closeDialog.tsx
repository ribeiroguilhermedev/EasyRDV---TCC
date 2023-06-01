
import { DialogTitle, IconButton } from '@mui/material';
import { CloseDialogProps, } from '../../types';
import CloseIcon from '@mui/icons-material/Close';

export default function CloseDialog(props: CloseDialogProps) {
    const { handleClose, title } = props

    return (
        <DialogTitle>
            {title}
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[400],
                }}
            >
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    )
}
