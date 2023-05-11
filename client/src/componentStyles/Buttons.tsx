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


export const WarningButton = styled(Button)({
  color: '#ffa726',
  border: '1px solid #856027',
  '&:hover': {
    backgroundColor: '#1d2429',
    border: '1px solid #ffa726',
    textDecoration: 'none'
  },
});