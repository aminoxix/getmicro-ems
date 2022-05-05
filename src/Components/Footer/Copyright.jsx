import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" right="0" left="0" mb="10" textAlign="center" align="center" position="fixed" bottom="0">
      {'Copyright ©'}
      <Link color="inherit" href="https://www.getmicro.com">
        Micro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}