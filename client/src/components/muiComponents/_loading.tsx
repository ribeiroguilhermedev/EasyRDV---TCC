import { CircularProgress, Box, Modal } from '@mui/material';

export default function Loading(): JSX.Element {
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