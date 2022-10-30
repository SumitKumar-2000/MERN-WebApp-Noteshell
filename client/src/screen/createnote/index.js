import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import MainScreen from '../../components/mainscreen'
import ReactMarkdown from "react-markdown"
import "../createnote/createnote.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateNote = () => {

  const [title,setTitle] = useState("")  
  const [content,setContent] = useState("")  
  const [category,setCategory] = useState("")  
  
  const navigate = useNavigate()

  const handleReset = () => {
    setTitle("")
    setContent("")
    setCategory("") 
  }

  const handleSubmit = async (e) =>{

    e.preventDefault();

    // Authorizing User
    const {token} = JSON.parse(localStorage.getItem("userInfo"))
    const config = {
      headers: {
         "content-type" : "application/json",
         Authorization: `Bearer ${token}`
      }
    }

    await axios.post("http://localhost:5000/api/notes/create",{
      title:title,content:content,category:category
    },config).then( 
      res=>console.log("notes -->",res.data),
      navigate('/mynotes')
    ).catch(
      err => console.log("error -->",err.response.data)
    )
  }

  return (
    <MainScreen title="Create Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group controlId="title" className="form-group">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="content" className="form-group">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {content && (
              <Card className="form-group">
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category" className="form-group">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="title"
                value={category}
                placeholder="Enter the title"
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='button-group'>
              <Button type="submit" variant="success">
                Create
              </Button>
              <Button type="submit" variant="primary" className="mx-2" onClick={handleReset}>
                Reset
              </Button>
            </Form.Group>

          </Form>
        </Card.Body>
        <Card.Footer>
          Created on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote