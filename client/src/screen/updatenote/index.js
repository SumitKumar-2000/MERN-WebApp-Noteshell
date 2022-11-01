import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams} from 'react-router-dom'
import MainScreen from '../../components/mainscreen'

const UpdateNote = () => {

  const navigate = useNavigate()
  const {_id} = useParams()  // using _id from url params

  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [category,setCategory] = useState("")
  const [date,setDate] = useState("")

  useEffect(()=>{
    const fetchNote = async () =>{
      const noteData = await axios.get(`https://noteshell-api.herokuapp.com/api/notes/${_id}`)

      setTitle(noteData.data.title)
      setContent(noteData.data.content)
      setCategory(noteData.data.category)
      setDate(noteData.data.updatedAt)

    }

    fetchNote();
  },[_id])


  const handleReset = (e) =>{
    e.preventDefault()

    setTitle("")
    setContent("")
    setCategory("")
  }

  const handleUpdate = async (e) =>{
    e.preventDefault();

    // Authorising user
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios.put(`https://noteshell-api.herokuapp.com/api/notes/${_id}`,{
      title:title, content:content, category:category
    },config).then(
      res=>console.log("updated note : ",res.data),
      navigate('/mynotes')
    ).catch(
      err => console.log("error -->",err.response.data)
    )
  }


  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Update Note</Card.Header>
        <Card.Body>
          <Form onSubmit={handleUpdate}>
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

            <Form.Group className="button-group">
              <Button type="submit" variant="success">
                Update
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="mx-2"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          Updated On - {date.substring(0,10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default UpdateNote