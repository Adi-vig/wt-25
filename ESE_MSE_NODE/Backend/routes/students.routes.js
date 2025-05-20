const express = require('express');
const router = express.Router();
const db = require('../config/db.config');

// Get all students
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Students');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
});

// Get a single student
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Students WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Failed to fetch student', error: error.message });
  }
});

// Get complete result for a student
router.get('/:id/results', async (req, res) => {
  try {
    // Get student details
    const [studentRows] = await db.query('SELECT * FROM Students WHERE id = ?', [req.params.id]);
    if (studentRows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Get MSE marks
    const [mseRows] = await db.query('SELECT * FROM MSE WHERE student_id = ?', [req.params.id]);
    
    // Get ESE marks
    const [eseRows] = await db.query('SELECT * FROM ESE WHERE student_id = ?', [req.params.id]);

    // Combine the results
    const result = {
      student: studentRows[0],
      mse: mseRows[0] || null,
      ese: eseRows[0] || null,
      subjects: [
        'Computer Networks',
        'MicroController',
        'DBMS',
        'Data Science'
      ]
    };

    res.json(result);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Failed to fetch results', error: error.message });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  const { rollNo, name, branch } = req.body;

  // Validate required fields
  if (!rollNo || !name || !branch) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      required: { rollNo: !rollNo, name: !name, branch: !branch }
    });
  }

  try {
    // Check if roll number already exists
    const [existing] = await db.query('SELECT * FROM Students WHERE rollNo = ?', [rollNo]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }

    const [result] = await db.query(
      'INSERT INTO Students (rollNo, name, branch) VALUES (?, ?, ?)',
      [rollNo, name, branch]
    );
    res.status(201).json({ id: result.insertId, rollNo, name, branch });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Failed to create student', error: error.message });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  const { rollNo, name, branch } = req.body;

  // Validate required fields
  if (!rollNo || !name || !branch) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      required: { rollNo: !rollNo, name: !name, branch: !branch }
    });
  }

  try {
    // Check if roll number already exists for other students
    const [existing] = await db.query(
      'SELECT * FROM Students WHERE rollNo = ? AND id != ?',
      [rollNo, req.params.id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Roll number already exists' });
    }

    const [result] = await db.query(
      'UPDATE Students SET rollNo = ?, name = ?, branch = ? WHERE id = ?',
      [rollNo, name, branch, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ id: req.params.id, rollNo, name, branch });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Failed to update student', error: error.message });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    // First delete related records from MSE and ESE tables
    await db.query('DELETE FROM MSE WHERE student_id = ?', [req.params.id]);
    await db.query('DELETE FROM ESE WHERE student_id = ?', [req.params.id]);
    
    // Then delete the student
    const [result] = await db.query('DELETE FROM Students WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student and related records deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Failed to delete student', error: error.message });
  }
});

module.exports = router; 