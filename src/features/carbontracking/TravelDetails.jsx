/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionGroup from '@mui/joy/AccordionGroup';
import {
  Typography, IconButton, Stack, Skeleton, Card,
} from '@mui/joy';
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
  if (trips.length === 0) {
    return (
      <Card variant="soft" style={{ width: '100%', backgroundColor: 'transparent' }} />
    );
  }
  if (!trips || trips === 'loading') {
    // Return skeleton when data is loading or not available
    return (
      <Card variant="soft" style={{ width: '100%', backgroundColor: 'white' }}>
        <AccordionGroup>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height={56} animation="wave">
              <Accordion>
                <AccordionSummary>
                  <IconButton disabled>
                    <CloseIcon />
                  </IconButton>
                  <Typography>
                    <Skeleton width={200} />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={20} width="70%" />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Skeleton>
          ))}
        </AccordionGroup>
      </Card>
    );
  }

  return (
    <Card variant="soft" style={{ width: '100%', backgroundColor: 'white' }}>
      <AccordionGroup sx={{ backgroundColor: 'white' }}>
        {trips.map((trip) => (
          <Accordion key={trip.origin} sx={{ backgroundColor: 'white' }}>
            <Stack
              direction="row"
              color="white"
            />
            <AccordionSummary>
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
              <Typography>
                You chose to travel by {trip.modeOfTravel}
              </Typography>
              <Typography>
                This produced {trip.actualCarbonFootprint} kg of CO2
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionGroup>
    </Card>
  );
}
