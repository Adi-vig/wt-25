import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const subjects = [
  'Computer Networks',
  'MicroController',
  'DBMS',
  'Data Science',
];

function MSEEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [marks, setMarks] = useState({
    subject1: '',
    subject2: '',
    subject3: '',
    subject4: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch student details
        const studentData = await api.getStudent(id);
        setStudent(studentData);

        // Fetch existing MSE marks
        try {
          const mseData = await api.getMSE(id);
          setMarks({
            subject1: mseData.subject1 || '',
            subject2: mseData.subject2 || '',
            subject3: mseData.subject3 || '',
            subject4: mseData.subject4 || '',
          });
        } catch (err) {
          // If no MSE marks exist yet, that's okay
          console.log('No existing MSE marks found');
        }
      } catch (err) {
        setError('Failed to fetch student data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = value === '' ? '' : Math.min(30, Math.max(0, Number(value)));
    setMarks((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.addMSE(id, marks);
      setSuccess('MSE marks saved successfully');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('Failed to save MSE marks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !student) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!student) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Student not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          background: 'linear-gradient(to right bottom, #ffffff, #f5f5f5)'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          MSE Marks Entry
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 4, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Student Details
          </Typography>
          <Typography variant="body1">
            Name: {student.name}
          </Typography>
          <Typography variant="body1">
            Roll No: {student.rollNo}
          </Typography>
          <Typography variant="body1">
            Branch: {student.branch}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {subjects.map((subject, index) => (
              <Grid item xs={12} sm={6} key={subject}>
                <TextField
                  fullWidth
                  label={`${subject} (Max: 30)`}
                  name={`subject${index + 1}`}
                  type="number"
                  value={marks[`subject${index + 1}`]}
                  onChange={handleChange}
                  inputProps={{
                    min: 0,
                    max: 30,
                    step: 0.5,
                  }}
                  required
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              {loading ? 'Saving...' : 'Save MSE Marks'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              size="large"
              disabled={loading}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setError('')} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setSuccess('')} sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default MSEEntry; 