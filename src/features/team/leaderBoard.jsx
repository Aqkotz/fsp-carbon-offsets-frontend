import React, { useEffect } from 'react';
import {
  Sheet, Table,
} from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeaderBoard } from './teamSlice';

function Leaderboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, []);
  const leaderboard = useSelector((state) => state.team.leaderboard);

  return (
    <Sheet>
      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Member</th>
            <th>Carbon Footprint Reductions (kg CO2)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.carbonReduction}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}

export default Leaderboard;
