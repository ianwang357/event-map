import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function CaseCard(props) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
         {props.url}
        </Typography>
         
        <Typography variant="h5" component="div">
         {props.name}
        </Typography>
         
        <Typography variant="body2">
         Venue: {props.venue}
        </Typography>


        <Typography variant="body2">
          Ticket Price: { props.price }
        </Typography>
      </CardContent>
    </Card>
  );
}
