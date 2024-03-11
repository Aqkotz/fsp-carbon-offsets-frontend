/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Sheet, Table, Card,
} from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchLeaderBoard } from './teamSlice';

function Leaderboard() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchLeaderBoard());
  // }, []);
  const leaderboard = useSelector((state) => state.team.team.leaderboard);

  if (!leaderboard || leaderboard === 'loading') {
    return (
      <Card variant="plain" style={{ position: 'relative', marginTop: '20px', width: '50%' }}>
        <Sheet sx={{ width: '100%' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Rank</th>
                <th style={{ width: '10%' }}>Team Member</th>
                <th style={{ width: '10%' }}>Carbon Footprint Reductions (kg CO2)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </Card>
    );
  }
  return (
    <Card variant="plain" style={{ position: 'relative', marginTop: '20px', width: '50%' }}>
      <Sheet sx={{ width: '100%' }}>
        <Table>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Rank</th>
              <th style={{ width: '25%' }}>Team Member</th>
              <th style={{ width: '50%' }}>Carbon Footprint Reductions (kg CO2)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, index) => (
              <tr key={index}>
                <td style={{ width: '25%' }}> {index + 1}</td>
                <td style={{ width: '25%' }}> {item.name}</td>
                <td style={{ width: '50%' }}> {(item.carbonReduction ?? 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Card>
  );
}

export default Leaderboard;
