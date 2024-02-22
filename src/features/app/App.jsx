/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider, extendTheme, ThemeProvider } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import { createTheme } from '@mui/material/styles';
import Nav from '../nav/Nav';
import UserGoals from '../usergoals/UserGoals';
import { setToken } from '../user/userSlice';
import Header from './Header';
import { getToken } from '../../app/utils';
import Team from '../team/Team';
import DailyTracking from '../carbontracking/dailyTracking';
import SignedInUser from '../user/SignedInUser';
import LandingPage from '../landingpage/LandingPage';
import DashBoard from '../dashboard/DashBoard';
import Admin from '../admin/Admin';
import HelpfulResources from '../helpfulresources/HelpfulResources';

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
  const navBarWidth = 240;
  const navBarPadding = 16;
  const navBarOffset = navBarWidth + navBarPadding * 2;
  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            50: '#0C4D01',
            100: '#0C4D01',
            200: '#1db902',
            300: '#127502',
            400: '#21d503',
            500: '#1bae02',
            600: '#158802',
            700: '#0f6101',
            800: '#0C4D01',
            900: '#093a01',
          },
          secondary: {
            50: '##D9D9D9',
            100: '#D9D9D9',
            200: '##D9D9D9',
            300: '#4886D0',
            400: '#2178DD',
            500: '#096BDE',
            600: '#1B62B5',
            700: '#265995',
            800: '#2F4968',
            900: '#2F3C4C',
          },
          neutral: {
            solidBg: '#D9D9D9',
            solidBorder: '#909090',
            solidHoverBg: 'rgba(243, 248, 243, 0.19)',
            solidHoverBorder: '#5d5d5d',
            solidActiveBg: '#5d5d5d',
            solidActiveBorder: '#909090',
            solidDisabledBg: '#909090',
            solidDisabledBorder: '#909090',
          },
        },
      },
    },
  });

  if (token) {
    return (
      <CssVarsProvider theme={theme}>
        <Box sx={{ display: 'flex', height: '100vh', Color: '#D9D9D9' }}>
          <Box>
            <Box component="main" sx={{ overflow: 'auto' }}>
              <Sheet
                sx={{
                  width: `calc(100vw - ${navBarOffset}px - 32px)`,
                  minHeight: 'calc(100vh - 80px)',
                  padding: '16px',
                  marginTop: '80px',
                  marginLeft: `${navBarOffset}px`,
                  backgroundColor: '#D9D9D9',
                }}
              >
                <Routes>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/goals" element={<UserGoals />} />
                  <Route path="/dailytracking" element={<DailyTracking />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/helpfulresources" element={<HelpfulResources />} />
                  <Route path="*" element={<FallBack />} />
                </Routes>
              </Sheet>
            </Box>
            <Header navBarOffset={navBarOffset} />
          </Box>
          <Nav navBarWidth={navBarWidth} navBarPadding={navBarPadding} />
        </Box>
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
