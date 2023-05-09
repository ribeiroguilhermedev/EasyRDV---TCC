import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function Loading() {
    return (
        <>
            <Modal
                open={true}
                className='fixed inset-0 bg-transparent flex items-center justify-center'
            >
                <Box className='fixed inset-0 flex items-center justify-center'>
                    <CircularProgress />
                </Box>
            </Modal>
        </>
    );
}