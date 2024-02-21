import * as React from 'react';
import { useSelector } from 'react-redux';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionGroup from '@mui/joy/AccordionGroup';
import { Typography, Stack } from '@mui/joy';
import FoodDonutChart from './foodDonut';

export default function TravelDetails(props) {
  const weeks = useSelector((state) => state.carbon.weeks);
  if (!weeks || weeks === 'loading') {
    return (
      <div />
    );
  }

  return (
    <AccordionGroup>
      {weeks.map((week) => (
        <Accordion key={week.week}>
          <Stack
            direction="row"
            alignContent="flex-start"
          />
          <AccordionSummary alignContent="left">
            <Typography>
              {week.week}
            </Typography>
            <Stack />
          </AccordionSummary>
          <AccordionDetails>
            <FoodDonutChart points={week.food} />
          </AccordionDetails>
        </Accordion>
      ))}
    </AccordionGroup>
  );
}
