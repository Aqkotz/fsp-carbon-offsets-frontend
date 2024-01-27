/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { CssVarsProvider, Box, Stack } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Nav from '../nav/Nav';
import UserGoals from '../usergoals/UserGoals';
import { setToken } from '../user/userSlice';
import Header from './Header';
import { getToken } from '../../app/utils';
import Team from '../team/Team';
import CarbonTracking from '../carbontracking/CarbonTracking';
import SignedInUser from '../user/SignedInUser';
import LandingPage from '../landingpage/LandingPage';
import DashBoard from '../dashboard/dashboard';
import DiscussionBoard from '../discussionboard/DiscussionBoard';

function FallBack() {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  const token = useSelector((state) => state.user.token);

  const theme = extendTheme({ cssVarPrefix: 'demo' });

  if (token) {
    return (
      <CssVarsProvider
        defaultMode="dark"
        theme={theme}
        colorSchemeSelector="#demo_dark-mode-by-default"
        modeStorageKey="demo_dark-mode-by-default"
        disableNestedContext
      >
        <div id="demo_dark-mode-by-default">
          <Box sx={{ display: 'flex', height: '100vh' }}>
            <Nav />
            <Box sx={{ flexGrow: 1 }}>
              <Header />
              <Box component="main" sx={{ overflow: 'auto' }}>
                <Sheet
                  sx={{
                    width: '100%',
                    height: 'calc(100vh - 64px)',
                    padding: '16px',
                  }}
                >
                  <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/goals" element={<UserGoals />} />
                    <Route path="/carbontracking" element={<CarbonTracking />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/discussionboard" element={<DiscussionBoard />} />
                    <Route path="*" element={<FallBack />} />
                  </Routes>
                </Sheet>
              </Box>
            </Box>
          </Box>
        </div>
      </CssVarsProvider>
    );
  } else {
    return (
      <Routes>
        <Route path="/signedin" element={<SignedInUser />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
