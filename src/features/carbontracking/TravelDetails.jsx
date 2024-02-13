import * as React from 'react';
import { useSelector } from 'react-redux';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionGroup from '@mui/joy/AccordionGroup';
import { Typography, Card, Skeleton } from '@mui/joy';
import SimpleBarChart from './dataVis';
// import DoubleArrowTwoToneIcon from '@mui/icons-material/DoubleArrowTwoTone';

// const trip = { origin, destination, potentialCarbonFootprints } = props.trip;
// const { air, rail, car } = potentialCarbonFootprints;

export default function TravelDetails(props) {
//   const trip = { origin, destination, potentialCarbonFootprints } = props.trip;
//   const { air } = potentialCarbonFootprints;
  const trips = useSelector((state) => state.carbon.trips);

  if (trips === 'loading') {
    return (
      <Card>
        <Skeleton variant="text" width={210} height={32} />
        <Skeleton variant="text" width={100} height={28} />
      </Card>
    );
  }
  return (
    <AccordionGroup>
      {trips.map((trip) => (
        <Accordion key={trip.origin}>
          <AccordionSummary>
            <Typography>
              {trip.origin} to {trip.destination}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SimpleBarChart points={trip.carbon} />
          </AccordionDetails>
        </Accordion>
      ))}
    </AccordionGroup>
  );
}
