import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useSelector } from "react-redux";


const Header = ({setQuery}) => {

  const userInfo = localStorage.getItem('userInfo');
  const navigate = useNavigate();   /// imported for logout functionality
  const {loginedUserName} = useSelector(state => state.user)
  
  return (
    <Navbar bg="primary" expand="lg" varient="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">NoteShell</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="d-flex justify-content-start align-items-center flex-grow-1">
            <Form className="d-flex">
              <FormControl
                type="search"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </div>
          {userInfo ? (
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {loginedUserName !== "user" && (
                <Link to="/mynotes" className="nav-link">
                  My Notes
                </Link>
              )}
              <NavDropdown title={loginedUserName} id="navbarScrollingDropdown">
                <Link to={`/user`} className="dropdown-item">  
                  My Profile
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    navigate("/"); //pushing back to home route
                    window.location.reload()
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
