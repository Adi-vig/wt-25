import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await api.getAllStudents();
      setStudents(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch students: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.deleteStudent(id);
        setSuccess('Student deleted successfully');
        fetchStudents();
      } catch (err) {
        setError('Failed to delete student: ' + err.message);
      }
    }
  };

  const handleMSE = (id) => {
    navigate(`/mse-entry/${id}`);
  };

  const handleESE = (id) => {
    navigate(`/ese-entry/${id}`);
  };

  const handleViewResults = (id) => {
    navigate(`/result/${id}`);
  };

  const handleAddNew = () => {
    navigate('/add-student');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" component="h1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              Student List
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                },
              }}
            >
              Add New Student
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {students.length === 0 ? (
            <Box textAlign="center" py={6}>
              <Typography variant="h6" color="textSecondary">
                No students found. Add a new student to get started.
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Roll No</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Branch</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id} hover sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                      <TableCell sx={{ fontSize: '1rem' }}>{student.rollNo}</TableCell>
                      <TableCell sx={{ fontSize: '1rem' }}>{student.name}</TableCell>
                      <TableCell sx={{ fontSize: '1rem' }}>{student.branch}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1} alignItems="center">
                          <IconButton 
                            onClick={() => handleEdit(student.id)}
                            color="primary"
                            size="small"
                            sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDelete(student.id)}
                            color="error"
                            size="small"
                            sx={{ '&:hover': { backgroundColor: '#ffebee' } }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleMSE(student.id)}
                            sx={{ 
                              mx: 0.5, 
                              bgcolor: 'success.main',
                              '&:hover': { bgcolor: 'success.dark' },
                              textTransform: 'none',
                            }}
                          >
                            MSE
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleESE(student.id)}
                            sx={{ 
                              mx: 0.5, 
                              bgcolor: 'info.main',
                              '&:hover': { bgcolor: 'info.dark' },
                              textTransform: 'none',
                            }}
                          >
                            ESE
                          </Button>
                          <IconButton
                            color="info"
                            onClick={() => handleViewResults(student.id)}
                            title="View Results"
                            sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

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

export default StudentList; 