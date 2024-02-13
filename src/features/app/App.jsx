import React, { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import DashBoard from '../dashboard/DashBoard';
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
  const theme = extendTheme({ cssVarPrefix: 'demo' });
  const navBarWidth = 240;
  const navBarPadding = 16;
  const navBarOffset = navBarWidth + navBarPadding * 2;

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
          <Box sx={{ display: 'flex', height: '100vh', backgroundColor: 'black' }}>
            <Box>
              <Box component="main" sx={{ overflow: 'auto' }}>
                <Sheet
                  sx={{
                    width: `calc(100vw - ${navBarOffset}px - 32px)`,
                    minHeight: 'calc(100vh - 80px)',
                    padding: '16px',
                    marginTop: '80px',
                    marginLeft: `${navBarOffset}px`,
                  }}
                >
                  <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/goals" element={<UserGoals />} />
                    <Route path="/carbontracking" element={<CarbonTracking />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/helpfulresources" element={<HelpfulResources />} />
                    <Route path="*" element={<FallBack />} />
                  </Routes>
                </Sheet>
              </Box>
              <Header navBarOffset={navBarOffset} />
            </Box>
            <Nav navBarWidth={navBarWidth} navBarPadding={navBarPadding} />
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
