import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const subjects = [
  'Computer Networks',
  'MicroController',
  'DBMS',
  'Data Science',
];

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const data = await api.getResults(id);
        setResult(data);
      } catch (err) {
        setError('Failed to fetch results: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!result) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Results not found</Alert>
      </Container>
    );
  }

  const calculateTotal = (mse, ese) => {
    if (!mse || !ese) return 'N/A';
    return ((mse * 0.3) + (ese * 0.7)).toFixed(2);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Student Results
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 4, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Student Details
            </Typography>
            <Typography variant="body1">
              Name: {result.student.name}
            </Typography>
            <Typography variant="body1">
              Roll No: {result.student.rollNo}
            </Typography>
            <Typography variant="body1">
              Branch: {result.student.branch}
            </Typography>
          </Box>

          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Subject</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>MSE (30%)</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ESE (70%)</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.map((subject, index) => {
                  const mseMark = result.mse ? result.mse[`subject${index + 1}`] : null;
                  const eseMark = result.ese ? result.ese[`subject${index + 1}`] : null;
                  const total = calculateTotal(mseMark, eseMark);

                  return (
                    <TableRow key={subject} hover>
                      <TableCell>{subject}</TableCell>
                      <TableCell>{mseMark !== null ? mseMark : 'N/A'}</TableCell>
                      <TableCell>{eseMark !== null ? eseMark : 'N/A'}</TableCell>
                      <TableCell>{total}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              Back to List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Result; 