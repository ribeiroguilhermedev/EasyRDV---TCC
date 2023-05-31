import { styled } from '@mui/system';
import Button from '@mui/material/Button';

export const HeaderButton = styled(Button)({
  color: '#f44336',
  border: 'none',
  '&:hover': {
    border: 'none',
  },
});

export const RedButton = styled(Button)({
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

export const GreenButton = styled(Button)({
  color: '#4caf50',
  border: '1px solid #66bb6a',
  '&:hover': {
    backgroundColor: '#1d2429',
    border: '1px solid #4caf50',
    textDecoration: 'none'
  },
});