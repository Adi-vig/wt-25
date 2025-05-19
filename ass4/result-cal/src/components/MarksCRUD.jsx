import { useEffect, useState } from 'react';
import API from '../api/api';

function MarksCRUD() {
    const [marksList, setMarksList] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudentRollNo, setSelectedStudentRollNo] = useState('');
    const [marks, setMarks] = useState({
        name: '', // Add name field
        osMse: '',
        osEse: '',
        cnMse: '',
        cnEse: '',
        coaMse: '',
        coaEse: '',
        tocMse: '',
        tocEse: '',
    });

    const [isEditing, setIsEditing] = useState(false); // Flag to track if we are in edit mode

    function handleDummyFill() {
        setMarks({
            osMse: Math.floor(Math.random() * 101),
            osEse: Math.floor(Math.random() * 101),
            cnMse: Math.floor(Math.random() * 101),
            cnEse: Math.floor(Math.random() * 101),
            coaMse: Math.floor(Math.random() * 101),
            coaEse: Math.floor(Math.random() * 101),
            tocMse: Math.floor(Math.random() * 101),
            tocEse: Math.floor(Math.random() * 101),
        });
    }

    useEffect(() => {
        fetchMarks();
        fetchStudents();
    }, []);

    
    const fetchMarks = async () => {
        const res = await API.get('/marks');
        setMarksList(res.data);
    };

    const fetchStudents = async () => {
        const res = await API.get('/students');
        setStudents(res.data);
    };

    const handleChange = (e) => {
        setMarks({ ...marks, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Find the student and get their name
        const student = students.find(s => s.rollNo === selectedStudentRollNo);
        const updatedMarks = { ...marks, name: student?.name };
    
        if (isEditing) {
            // PUT request to edit marks if we're in edit mode
            await API.put(`/marks/${selectedStudentRollNo}`, updatedMarks);
        } else {
            // POST request to submit new marks with name added
            await API.post('/marks', { rollNo: selectedStudentRollNo, ...updatedMarks });
        }
    
        resetForm();
        fetchMarks();
    };
    

    const resetForm = () => {
        setMarks({
            name: '',
            osMse: '',
            osEse: '',
            cnMse: '',
            cnEse: '',
            coaMse: '',
            coaEse: '',
            tocMse: '',
            tocEse: '',
        });
        setSelectedStudentRollNo('');
        setIsEditing(false);
    };

    const handleEdit = (mark) => {
        setSelectedStudentRollNo(mark.rollNo);
        setMarks({
            name: mark.name,
            osMse: mark.osMse,
            osEse: mark.osEse,
            cnMse: mark.cnMse,
            cnEse: mark.cnEse,
            coaMse: mark.coaMse,
            coaEse: mark.coaEse,
            tocMse: mark.tocMse,
            tocEse: mark.tocEse,
        });
        setIsEditing(true);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 main-heading">Manage Marks</h2>

            <form onSubmit={handleSubmit} className="mb-5">
                <div className="row g-3 justify-content-center">
                    <div className="col-md-4">
                        <select
                            value={selectedStudentRollNo}
                            onChange={(e) => setSelectedStudentRollNo(e.target.value)}
                            className="form-select"
                            required
                        >
                            <option value="">Select Student</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.rollNo}>
                                    {student.rollNo} - {student.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row g-3 mt-3 justify-content-center">
                    {/* OS */}
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="osMse"
                            placeholder="OS MSE"
                            value={marks.osMse}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="osEse"
                            placeholder="OS ESE"
                            value={marks.osEse}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <div className="row g-3 mt-1 justify-content-center">
                    {/* CN */}
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="cnMse"
                            placeholder="CN MSE"
                            value={marks.cnMse}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="cnEse"
                            placeholder="CN ESE"
                            value={marks.cnEse}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <div className="row g-3 mt-1 justify-content-center">
                    {/* COA */}
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="coaMse"
                            placeholder="COA MSE"
                            value={marks.coaMse}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="coaEse"
                            placeholder="COA ESE"
                            value={marks.coaEse}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <div className="row g-3 mt-1 justify-content-center">
                    {/* TOC */}
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="tocMse"
                            placeholder="TOC MSE"
                            value={marks.tocMse}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="number"
                            name="tocEse"
                            placeholder="TOC ESE"
                            value={marks.tocEse}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col-12 mt-3 d-flex justify-content-center ">
                        <button type="submit" className="btn btn-primary w-25 mx-2">
                            {isEditing ? 'Update Marks' : 'Submit Marks'}
                        </button>
                        <button type="button" onClick={handleDummyFill} className="btn btn-secondary w-25 mx-2">
                            Dummy Fill
                        </button>
                    </div>
                </div>
            </form>

            <h3 className="mb-3">All Marks</h3>
            <div className="table-responsive">
                <table className="table table-dark table-hover rounded shadow-sm">
                    <thead>
                        <tr>
                            <th>Student Roll</th>
                            <th>OS (MSE / ESE)</th>
                            <th>CN (MSE / ESE)</th>
                            <th>COA (MSE / ESE)</th>
                            <th>TOC (MSE / ESE)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marksList.map((mark) => (
                            <tr key={mark.id}>
                                <td>{mark.rollNo}</td>
                                <td>{mark.osMse} / {mark.osEse}</td>
                                <td>{mark.cnMse} / {mark.cnEse}</td>
                                <td>{mark.coaMse} / {mark.coaEse}</td>
                                <td>{mark.tocMse} / {mark.tocEse}</td>
                                <td>
                                    <button onClick={() => handleEdit(mark)} className="btn btn-warning">
                                        Edit
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

export default MarksCRUD;
