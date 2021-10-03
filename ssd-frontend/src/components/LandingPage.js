import logo from "../logo.png";
import "../App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          backgroundImage: "url(/img/cover-home.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: '1000px',
          backgroundPosition: 'bottom 50px right 10px'
        }}
      >
        <h1 style={{ paddingBottom: "20px" }}>Welcome to SSD-Assignment 02</h1>
        <p>Import and Export Files with Google Drive</p>
        {/* button */}
        <Link to="/SignIn">
          <Button variant="primary" size="lg" style={{ marginTop: "20px" }}>
            GET STARTED
          </Button>
        </Link>
      </header>
    </div>
  );
}

export default LandingPage;
