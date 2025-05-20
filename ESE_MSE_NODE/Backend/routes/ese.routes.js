const express = require('express');
const router = express.Router();
const db = require('../config/db.config');

// Get ESE marks for a student
router.get('/:studentId', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM ESE WHERE student_id = ?',
      [req.params.studentId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'ESE marks not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update ESE marks
router.post('/:studentId', async (req, res) => {
  const { subject1, subject2, subject3, subject4 } = req.body;
  try {
    // Check if marks already exist
    const [existing] = await db.query(
      'SELECT * FROM ESE WHERE student_id = ?',
      [req.params.studentId]
    );

    if (existing.length > 0) {
      // Update existing marks
      const [result] = await db.query(
        `UPDATE ESE 
         SET subject1 = ?, subject2 = ?, subject3 = ?, subject4 = ?
         WHERE student_id = ?`,
        [subject1, subject2, subject3, subject4, req.params.studentId]
      );
      res.json({ message: 'ESE marks updated successfully' });
    } else {
      // Insert new marks
      const [result] = await db.query(
        `INSERT INTO ESE (student_id, subject1, subject2, subject3, subject4)
         VALUES (?, ?, ?, ?, ?)`,
        [req.params.studentId, subject1, subject2, subject3, subject4]
      );
      res.status(201).json({ message: 'ESE marks added successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 