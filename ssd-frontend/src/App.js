import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Form from "./components/Form";
import HomePage from "./components/HomePage";
import UploadMainFile from "./components/UploadMainFile";
// import ImportFile from "./components/ImportFile";
// import UploadFile from "./components/UploadFile";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/SignIn" component={Form} />
        <Route path="/Home" component={HomePage} />
        <Route path="/Upload" component={UploadMainFile} />
        {/* <Route path="/Import" component={ImportFile} /> */}
        {/* <Route path="/uploadRedirectPage" component={UploadFile} /> */}
      </main>
    </BrowserRouter>
  );
}

export default App;