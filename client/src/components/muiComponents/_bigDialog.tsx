
import { Dialog, useMediaQuery } from '@mui/material';
import { BigDialogProps, } from '../../types';
import { useTheme } from '@mui/material/styles';

export default function BigDialog({ handleClose, open, children }: BigDialogProps): JSX.Element {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullWidth
            maxWidth={'xl'}
            PaperProps={{
                sx: {
                    height: 800
                }
            }}
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
        >
            {children}
        </Dialog>
    )
}
