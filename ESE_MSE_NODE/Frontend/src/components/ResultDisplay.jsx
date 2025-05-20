import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const subjects = [
  'Data Structures',
  'Database Management',
  'Operating Systems',
  'Computer Networks',
];

function ResultDisplay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // TODO: Fetch student details and results
  }, [id]);

  const calculateTotal = (mse, ese) => {
    return Number(mse) + Number(ese);
  };

  const calculateGrade = (total) => {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    return 'F';
  };

  if (!student) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Result - {student.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Roll No: {student.rollNo} | Branch: {student.branch}
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell align="right">MSE (30%)</TableCell>
                <TableCell align="right">ESE (70%)</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={subjects[index]}>
                  <TableCell component="th" scope="row">
                    {subjects[index]}
                  </TableCell>
                  <TableCell align="right">{result.mse}</TableCell>
                  <TableCell align="right">{result.ese}</TableCell>
                  <TableCell align="right">
                    {calculateTotal(result.mse, result.ese)}
                  </TableCell>
                  <TableCell align="right">
                    {calculateGrade(calculateTotal(result.mse, result.ese))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
          >
            Back to List
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ResultDisplay; 