import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          VIT Result Management
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Students
          </Button>
          <Button color="inherit" component={RouterLink} to="/add-student">
            Add Student
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 