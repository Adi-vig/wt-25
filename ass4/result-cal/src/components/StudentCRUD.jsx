import { useState, useEffect } from 'react';
import API from '../api/api';

function StudentCRUD() { 
    const [students, setStudents] = useState([]);
    const [name , setName] = useState('');
    const [rollNo , setRollNo] = useState('');  
    const [editID , setEditID] = useState(null);


    useEffect( () =>{
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res= await API.get('/students');
        setStudents(res.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(editID){
            await API.put(`/students/${editID}`, {name, rollNo});
        }else{
            await API.post(`/students`, {name, rollNo});
        }

        setName('');
        setRollNo('');  
        setEditID(null);
        fetchStudents();

        
    };


    const handleEdit = (student) =>{
        setName(student.name);
        setRollNo(student.rollNo);
        setEditID(student.id);

    };

    const handleDelete = async(id) =>{
        await API.delete(`/students/${id}`);
        fetchStudents();
    };

    return (
        <div className="container mt-5">
          <h2 className="mb-4 main-heading">Manage Students</h2>
    
          <form onSubmit={handleSubmit} className="mb-5">
            <div className="row g-3 justify-content-center">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Roll Number"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100">
                  {editID ? 'Update' : 'Add'} Student
                </button>
              </div>
            </div>
          </form>
    
          <h3 className="mb-3">All Students</h3>
          <div className="table-responsive">
            <table className="table table-dark table-hover rounded shadow-sm">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.rollNo}</td>
                    <td>{student.name}</td>
                    <td>
                      <button onClick={() => handleEdit(student)} className="btn btn-sm btn-warning me-2">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(student.id)} className="btn btn-sm btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         
        </div>
      );
    }
    


export default StudentCRUD;
