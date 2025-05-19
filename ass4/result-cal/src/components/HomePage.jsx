import { Link } from "react-router-dom";
import '../style.css'; // Don't forget to import!

function HomePage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-5 main-heading">VIT Semester Results</h1>

      <div className="d-flex justify-content-center gap-4 flex-wrap">
        <Link to="/students" className="card card-link">
          <div className="card-body">
            <h5 className="card-title">Manage Students</h5>
          </div>
        </Link>

        <Link to="/marks" className="card card-link">
          <div className="card-body">
            <h5 className="card-title">Manage Marks</h5>
          </div>
        </Link>

        <Link to="/result" className="card card-link">
          <div className="card-body">
            <h5 className="card-title">Get Result</h5>
          </div>
        </Link>
      </div>
      

      
    </div>
  );
}

export default HomePage;
