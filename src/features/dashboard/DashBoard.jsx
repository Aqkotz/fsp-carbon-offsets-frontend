import React from 'react';
import { Typography, Card } from '@mui/joy';

function DashBoard() {
  return (
    <Card>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        Welcome to the DashBoard
      </Typography>
    </Card>
  );
}

export default DashBoard;
