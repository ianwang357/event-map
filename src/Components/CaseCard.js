import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function CaseCard(props) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
         {props.subTitle}
        </Typography>
         
        <Typography variant="h5" component="div">
         {props.title}
        </Typography>
         
        <Typography variant="body2">
         Confirmed: {props.confirmed}
        </Typography>

        <Typography variant="body2">
          Death: { props.deaths}
        </Typography>
      </CardContent>
    </Card>
  );
}
