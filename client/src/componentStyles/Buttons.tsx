import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { mainColor } from '../enumeration';

export const HeaderButton = styled(Button)({
  color: '#f44336',
  textTransform: 'none',
  height: '30px',
  border: 'none',
  '&:hover': {
    border: 'none',
  },
});

export const RedButton = styled(Button)({
  color: '#f44336',
  textTransform: 'none',
  height: '30px',
  border: '1px solid #7f2e2f',
  '&:hover': {
    backgroundColor: 'rgba(244, 67, 54, 0.08)',
    border: '1px solid rgb(244, 67, 54)',
    textDecoration: 'none'
  },
});


export const WarningButton = styled(Button)({
  color: '#ffa726',
  textTransform: 'none',
  height: '30px',
  border: '1px solid #856027',
  '&:hover': {
    backgroundColor: '#1d2429',
    border: '1px solid #ffa726',
    textDecoration: 'none'
  },
});

export const GreenButton = styled(Button)({
  color: '#4caf50',
  textTransform: 'none',
  height: '30px',
  border: '1px solid #66bb6a',
  '&:hover': {
    backgroundColor: '#1d2429',
    border: '1px solid #4caf50',
    textDecoration: 'none'
  },
});

export const LoginButton = styled(Button)({
  color: '#fff',
  textTransform: 'none',
  height: '40px',
  backgroundColor: '#145a87',
  '&:hover': {
    backgroundColor: mainColor,
    textDecoration: 'none'
  },
});

export const ScheduleGhostButton = styled(Button)({
  color: '#fff',
  textTransform: 'none',
  height: '40px',
  width:'150px',
  backgroundColor: mainColor,
  border: '1px solid #fff',
  '&:hover': {
    backgroundColor: '#fff',
    color: mainColor,
    textDecoration: 'none'
  },
});