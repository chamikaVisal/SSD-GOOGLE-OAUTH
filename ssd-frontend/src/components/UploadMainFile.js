import React, { Component } from "react";
import upload from "../upload.png";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Navbar";
import Swal from 'sweetalert2'
import axios from "axios";

class UploadMainFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      tokValue: [],
    };
  }
  componentDidMount() {
    axios({
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      method: "GET",
      url: "http://localhost:4000/getTokenfromDB",
    }).then((response) => {
      let len = response.data.length - 1;
      this.setState({ tokValue: response.data});
    });
  }
  handleFile = (e) => {
    let file = e.target.files[0];
    this.setState({
      file: file,
    });
  };


  uploadFile = () => {
console.log("here it is",this.state.tokValue[0].token)
    
    let file = this.state.file;

    let forminfo = new FormData();

    forminfo.append("file", this.state.file);
    forminfo.append("token", this.state.tokValue[0].token);


    axios({
      method: "POST",
      url: "http://localhost:4000/fileUpload",
      headers: {
        "Content-Type": "multipart/form-data,acatipplion/json;charset=UTF-8",
      },

      data: forminfo,
    }).then((response) => {
      console.log(response.data);
      Swal.fire({
        position: 'middle',
        icon: 'success',
        title: 'File uploaded to Google Drive Successfully',
        showConfirmButton: true,
        timer: 3500
    })
    });
  };
  render() {
    return (
      <div>
        <NavBar />

        <h2 style={{ textAlign: "center", paddingTop: "50px" }}>
          Upload a File
        </h2>
        <Card
          className="text-center"
          style={{ marginTop: "60px", marginLeft: "40px", marginRight: "40px" }}
        >
          <Card.Header></Card.Header>
          <Card.Img
            variant="top"
            src={upload}
            style={{
              height: "120px",
              width: "100px",
              alignSelf: "center",
              marginTop: "10px",
            }}
          />
          <Card.Body>
            <Card.Text>
              Click below button to upload a file from you computer
            </Card.Text>
            <div className="col-md-5 mb-3">
              <label htmlFor="validationDefault04">Select your file</label>
              <input
                type="file"
                name="file"
                onChange={(e) => this.handleFile(e)}
              />
              <div className="col-md-10 mb-3"></div>
            </div>
            <Button
              variant="primary"
              style={{ marginTop: "20px" }}
              onClick={() => this.uploadFile()}
            >
              UPLOAD
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted"></Card.Footer>
        </Card>
      </div>
    );
  }
}

export default UploadMainFile;
