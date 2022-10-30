import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import ErrorMessage from '../../components/error/alert';
import Loading from '../../components/loading/spinner';
import MainScreen from '../../components/mainscreen'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterScreen = () => {

  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState("")

  const handleSubmit = async () =>{

    if(password !== confirmPassword){
      setMessage("confirm password wrongly entered !")
      const notify = () => toast.warn(message, {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: 'dark'
        });
      notify();
      return;
    }else{
      setMessage("");

      setLoading(true)
      
      // calling register user api
      await axios.post('http://localhost:5000/api/user/',{
        name,email,password
      }).then(res=>console.log("response : ",res.data))
        .catch(err=>
          {
            console.log(err.response.data);
            setError(err.response.data);
            const notify = () => toast.error(error, {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            notify();
            return; 
          })

      setLoading(false)
    }
  }

  return (
    <MainScreen title="Register">

      <ToastContainer/>

      <div className="loginContainer">
        {loading && <Loading/>}
        {/* {error && <ErrorMessage children={error}/>}
        {message && <ErrorMessage bgColor={"#f8d7da"} children={message} />} */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmpassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Already Registered ?
            <Link
              to="/login"
              style={{
                color: "#18bc9c",
                paddingLeft: "0.5rem",
              }}
            >
              Login
            </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen