
//chamika and ravindu and hansi
//chamika-componentDidMount section
//ravindu-fetchUserDetails/sentToken section
//hansi-getFiles section
import React, { Component } from "react";
import upload from "../upload.png";
import download from "../download.png";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Card, CardGroup, Col, Container, Navbar, Row } from "react-bootstrap";
import NavBar from "./Navbar";
import axios from "axios";
import ReactModal from "react-modal";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tok: "",
      name: "",
      id: "",
      picture: "",

      checkedfortoken: false,
      isModalOpen:false,
      fileList: [],
    };
  }
  componentDidMount() {
    // this.loadData();
    if (this.state.checkedfortoken === false) {
      let url = window.location.href;
      // alert(url)
      let params = new URL(url).searchParams;
      // alert(params.get("code"));

      let pkBody = JSON.stringify({
        code: params.get("code"),
      });

      axios({
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        method: "POST",
        url: "http://localhost:4000/getToken",
        data: pkBody,
      }).then((response) => {
        console.log(response.data);

        this.setState({ tok: response.data });
        this.setState({ checkedfortoken: !this.state.checkedfortoken });

        this.fetchUserDetails();
      });
    }
  }
  fetchUserDetails = () => {
    let pkBody2 = JSON.stringify({
      token: this.state.tok,
    });

    console.log(pkBody2);

    axios({
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      method: "POST",
      url: "http://localhost:4000/getUserInfo",
      data: pkBody2,
    }).then((response) => {
      console.log(response.data);
      // this.setState({ tok: response.data });
      this.setState({ name: response.data.name });
      this.setState({ id: response.data.id });
      this.setState({ picture: response.data.picture });
    });

    this.sentToken();
  };
  sentToken = () => {
    const json = JSON.stringify(this.state.tok);

    console.log("this is to be sent", json);

    axios({
      headers: {
        "Content-Type": "*",
      },
      method: "POST",
      url: "http://localhost:4000/createToken",
      data: { token: json },
    }).then((ss) => {
      console.log("meka balanna", ss.data);
    });
  };

  getFiles = () => {

    let assa = JSON.stringify({
      token: this.state.tok,
    });

    axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      url: "http://localhost:4000/readDrive",
      data: assa,
    }).then((ss) => {
      console.log("meka balanna", ss.data);
      this.setState({ fileList: ss.data });
      console.log(this.state.fileList);
    });

    this.setState({ isModalOpen: true });
  };
  render() {
    const username = this.state.name;
    const td = this.state.fileList;
    return (
      <div>
        <NavBar />
        <h2
          style={{ textAlign: "center", paddingTop: "30px", fontWeight: "500" }}
        >
          Welcome {username} !
        </h2>
        <h5
          style={{ textAlign: "center", paddingTop: "30px", fontWeight: "500" }}
        >
          User ID : {this.state.id}
        </h5>
        <div
          style={{
            marginLeft: 850,
          }}
        >
          <img
            style={{ height: 300, width: 300, borderRadius: 150 }}
            src={this.state.picture}
            alt="pic"
          />
        </div>
        <h4
          style={{ textAlign: "center", paddingTop: "30px", fontWeight: "200" }}
        >
          Choose an option
        </h4>

        <CardGroup
          style={{ marginTop: "50px", marginLeft: "40px", marginRight: "40px" }}
        >
          <Card className="text-center">
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
              <Card.Title>Upload a File</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Link to="/Upload">
                <Button variant="primary" style={{ marginTop: "20px" }}>
                  UPLOAD
                </Button>
              </Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"></small>
            </Card.Footer>
          </Card>

          <Card className="text-center">
            <Card.Header></Card.Header>
            <Card.Img
              variant="top"
              src={download}
              style={{
                height: "120px",
                width: "100px",
                alignSelf: "center",
                marginTop: "10px",
              }}
            />
            <Card.Body>
              <Card.Title>Import Files</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              {/* <Link to="/Import"> */}
              <Button
                variant="secondary"
                style={{ marginTop: "20px" }}
                onClick={() => this.getFiles()}
              >
                IMPORT
              </Button> 
              {/* </Link> */}
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"></small>
            </Card.Footer>
          </Card>
        </CardGroup>

        <ReactModal
          ariaHideApp={false}
          isOpen={this.state.isModalOpen}
          style={{
            overlay: {
              top: 50,
              left: 150,
              right: 150,
              bottom: 50,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            },
          }}
        >
          {td.map((l, i) => (
            <Card
              key={i}
              border="secondary"
              style={{
                marginTop: "60px",
                marginLeft: "40px",
                marginRight: "40px",
              }}
            >
              <Row>
                <Col lg={8}>
                  <Card.Body style={{ paddingTop: "22px",fontWeight:'bold' }}>
                    File Name : {l.name}
                  </Card.Body>
                  <Card.Body style={{ paddingTop: "22px",fontWeight:'bold' }}>
                    Mime Type : {l.mimeType}
                  </Card.Body>
                  <Card.Body style={{ paddingTop: "22px",fontWeight:'bold' }}>
                    Id : {l.id}
                  </Card.Body>
                </Col>
                <Col lg={2}>
                  <Card.Body>
                    <Button
                      variant="success"
                      style={{ width: "100%" }}
                      onClick={this.handleShare}
                    >
                      SHARE
                    </Button>
                  </Card.Body>
                </Col>
                <Col lg={2}>
                  <Card.Body>
                    <Button
                      variant="danger"
                      style={{ width: "100%" }}
                      onClick={this.handleDelete}
                    >
                      DELETE
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}

          <button
            className="ui button right floated black"
            type="button"
            onClick={() => this.setState({ isModalOpen: false })}
          >
            Close
          </button>
        </ReactModal>
      </div>
    );
  }
}

export default HomePage;
