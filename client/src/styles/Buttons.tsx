import { styled } from '@mui/system';
import Button from '@mui/material/Button';

export const ErrorButton = styled(Button)({
  color: '#f44336',
  border: '1px solid #7f2e2f',
  '&:hover': {
    backgroundColor: 'rgba(244, 67, 54, 0.08)',
    border: '1px solid rgb(244, 67, 54)',
    textDecoration: 'none'
  },
});