import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionGroup from '@mui/joy/AccordionGroup';
import { Typography, IconButton, Stack } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import BarChart from './barChart';
import { deleteTrip } from './carbonSlice';

// import DoubleArrowTwoToneIcon from '@mui/icons-material/DoubleArrowTwoTone';

// const trip = { origin, destination, potentialCarbonFootprints } = props.trip;
// const { air, rail, car } = potentialCarbonFootprints;

export default function TravelDetails(props) {
//   const trip = { origin, destination, potentialCarbonFootprints } = props.trip;
//   const { air } = potentialCarbonFootprints;
  const trips = useSelector((state) => state.carbon.trips);
  const dispatch = useDispatch();
  console.log(trips);
  if (!trips || trips === 'loading') {
    return (
      <div />
    );
  }

  return (
    <AccordionGroup>
      {trips.map((trip) => (
        <Accordion key={trip.origin}>
          <Stack
            direction="row"
            alignContent="flex-start"
          />
          <AccordionSummary alignContent="left">
            <IconButton aria-label="delete" size="small" onClick={() => { dispatch(deleteTrip(trip)); }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
            <Typography>
              {trip.origin} to {trip.destination}
            </Typography>
            <Stack />
          </AccordionSummary>
          <AccordionDetails>
            <BarChart points={trip.potentialCarbonFootprint} />
          </AccordionDetails>
        </Accordion>
      ))}
    </AccordionGroup>
  );
}
