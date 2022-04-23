import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './App.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UploadImages from "./components/upload-images.component";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#eee', height: '100vh', p:10 }} >
          <Typography variant="h5">Range Quest</Typography>
          <Typography variant="h6">Material UI Image Upload with Preview</Typography>
          <UploadImages />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
