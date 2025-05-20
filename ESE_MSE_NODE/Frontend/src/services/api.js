const API_URL = 'http://localhost:5000/api';

export const api = {
  // Student APIs
  getAllStudents: async () => {
    const response = await fetch(`${API_URL}/students`);
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  getStudent: async (id) => {
    const response = await fetch(`${API_URL}/students/${id}`);
    if (!response.ok) throw new Error('Failed to fetch student');
    return response.json();
  },

  addStudent: async (studentData) => {
    const response = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error('Failed to add student');
    return response.json();
  },

  updateStudent: async (id, studentData) => {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  },

  deleteStudent: async (id) => {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return response.json();
  },

  // MSE APIs
  getMSE: async (studentId) => {
    const response = await fetch(`${API_URL}/mse/${studentId}`);
    if (!response.ok) throw new Error('Failed to fetch MSE marks');
    return response.json();
  },

  addMSE: async (studentId, mseData) => {
    const response = await fetch(`${API_URL}/mse/${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mseData),
    });
    if (!response.ok) throw new Error('Failed to add MSE marks');
    return response.json();
  },

  // ESE APIs
  getESE: async (studentId) => {
    const response = await fetch(`${API_URL}/ese/${studentId}`);
    if (!response.ok) throw new Error('Failed to fetch ESE marks');
    return response.json();
  },

  addESE: async (studentId, eseData) => {
    const response = await fetch(`${API_URL}/ese/${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eseData),
    });
    if (!response.ok) throw new Error('Failed to add ESE marks');
    return response.json();
  },

  // Results API
  getResults: async (studentId) => {
    const response = await fetch(`${API_URL}/students/${studentId}/results`);
    if (!response.ok) throw new Error('Failed to fetch results');
    return response.json();
  },
}; 