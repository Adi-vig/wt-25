import { useEffect, useState } from 'react';
import API from '../api/api';

function ResultPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const res = await API.get('/results');
    setResults(res.data);
  };

  const calculateFinalMarks = (mse, ese) => {
    return (mse * 0.3 + ese * 0.7).toFixed(2);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Final Semester Results</h2>
  
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>OS</th>
              <th>CN</th>
              <th>COA</th>
              <th>TOC</th>
            </tr>
          </thead>
          <tbody>
            {results.map((student) => (
              <tr key={student.id}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{calculateFinalMarks(student.osMse, student.osEse)}</td>
                <td>{calculateFinalMarks(student.cnMse, student.cnEse)}</td>
                <td>{calculateFinalMarks(student.coaMse, student.coaEse)}</td>
                <td>{calculateFinalMarks(student.tocMse, student.tocEse)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

export default ResultPage;
