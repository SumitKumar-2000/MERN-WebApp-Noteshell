import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/mainscreen'
import { Form, Button, Row, Col} from 'react-bootstrap';
import '../loginScreen/loginScreen.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/loading/spinner';
// import ErrorMessage from '../../components/error/alert';
import { useDispatch } from 'react-redux';
import { userAuth } from '../../redux/actions/userAuth';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {

  const dispatch = useDispatch()
  const [email,setEmail] = useState("")  
  const [password,setPassword] = useState("")  
  const [error,setError] = useState(false)  
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const userInfo = localStorage.getItem("userInfo");
    if(userInfo){
      navigate('/mynotes')
    } 
  })

  const submitHandler = async (e) =>{
      e.preventDefault();
      
      setLoading(true);

      await axios.post('http://localhost:5000/api/user/login',{
        email,
        password,
      }).then(res=>{
          console.log("response : ", res.data);
          localStorage.setItem("userInfo",JSON.stringify(res.data)); 
          dispatch(userAuth(res.data));
          
          const notify = () => toast.success(`${res.data.name} Logined Successfully`, {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark"
            });
            notify();
            return;
      })
        .catch(e=>{
          setError(e.response.data);

          const notify = () => toast.error(error, {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme : 'dark',
            });
          notify();
      })

      setLoading(false);
  }  

  return (
    <MainScreen title="Login">
      
      <ToastContainer/>

      <div className="loginContainer">
        <Form onSubmit={submitHandler}>
          {/* {error && <ErrorMessage variant="danger" children={error} />} */}
          {loading && <Loading />}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User ?
            <Link
              to="/register"
              style={{
                color: "#18bc9c",
                paddingLeft: "0.5rem",
              }}
            >
              Register Here
            </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen