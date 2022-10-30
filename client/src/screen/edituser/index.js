import axios from 'axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import MainScreen from '../../components/mainscreen'
import '../edituser/edituser.css'

const EditUser = () => {

  const {name,email} = JSON.parse(localStorage.getItem('userInfo'));
  
  const[editedName,setEditedName] = useState(name)
  const[editedEmail,setEditedEmail] = useState(email)
  const[editedPassword,setEditedPassword] = useState("")
  const[editedConfirmPassword,setEditedConfirmPassword] = useState("")

  const updateHandler = async (e) =>{
    e.preventDefault();

    const {token} = JSON.parse(localStorage.getItem('userInfo'))

    const config = {
      headers : {
        "content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      }
    }
    
    await axios.post(`http://localhost:5000/api/user/profile`,{
      name:editedName,
      email:editedEmail,
      password:editedPassword,
      confirmPassword:editedConfirmPassword
    },config)
    
  }


  return (
    <MainScreen title="User">
      <div className="userbox">
        <div className="form-box width">

          <Form onSubmit={updateHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                size='sm'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                size='sm'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Edit Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={editedPassword}
                onChange={(e) => setEditedPassword(e.target.value)}
                size='sm'
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={editedConfirmPassword}
                onChange={(e) => setEditedConfirmPassword(e.target.value)}
                size='sm'
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Edit User
            </Button>
          </Form>
        </div>
        <div className="image-box width">
          <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt="userImage" className='user-img' />
        </div>
      </div>

    </MainScreen>
  );
}

export default EditUser