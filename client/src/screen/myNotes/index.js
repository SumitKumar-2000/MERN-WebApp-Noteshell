import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/mainscreen";
import Loading from "../../components/loading/spinner";
import "../myNotes/mynotes.css";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const MyNotes = ({query}) => {

  const { loginedUserName } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  
  const [notes,setNotes]  = useState([]);
  

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure ?")) {
      // Authorising user
      const { token } = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(`http://localhost:5000/api/notes/${id}`,config)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data))
      
    }
  };
  
  
  // fetching from backend using axios
  useEffect(()=>{
    
    // matching token from server by sending token from client side
    const {token} = JSON.parse(localStorage.getItem('userInfo'))
    const config = {
      headers:{
        Authorization : `Bearer ${token}`
      },
    }

    axios.get("http://localhost:5000/api/notes",config)
    .then( res => {
      setNotes(res.data);
      setLoading(false)
    })
    
  })

  return (
    <MainScreen title={`Welcome back ${loginedUserName}`}>
      <Link to="/createnote">
        <Button style={{ marginBottom: "1rem" }} size="lg">
          Create New Note
        </Button>
      </Link>

      {loading && <Loading />}

      {notes.filter((filterednote) => query !== "" ? filterednote.title.toLowerCase().includes(query) : filterednote).map((note) => {
          return (
            <Card className="cardBox" key={note._id}>
              <Card.Header className="cardheader">
                <span className="cardtitle">{note.title}</span>
                <div>
                  <Link to={`/updatenote/${note._id}`}>
                    <Button className="mx-1" variant="success">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    className="mx-1"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Card.Body>
                <h5>
                  <Badge style={{ backgroundColor: "gray" }}>
                    Category - {note.category}
                  </Badge>
                </h5>
                <blockquote className="blockquote mb-0">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  <footer className="blockquote-footer">  
                    <cite title="Source Title">
                      created on : {note.createdAt.substring(0, 10)}{" "}
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          );
        })}
    </MainScreen>
  );
};

export default MyNotes;
