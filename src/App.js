

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SurveyForm from './components/form';
import EventRegistrationForm from './components/eventForm';
import JobApplicationForm from './components/jobApplication';

function App() {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Dynamic Forms
            </Typography>
            <IconButton color="inherit">
              <Link to="/job-form" style={{ color: 'inherit', textDecoration: 'none' }}>
                Job
              </Link>
            </IconButton>
            <IconButton color="inherit">
              <Link to="/event-registration" style={{ color: 'inherit', textDecoration: 'none' }}>
              Event
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<SurveyForm />} />
          <Route path="/event-registration" element={<EventRegistrationForm />} />
          <Route path="/job-form" element={<JobApplicationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
