import React, { useState, useContext  } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./adminLoginPage.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/userContext";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  
  //validation
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/user/login",
        loginUser
      );
      
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/adminHome");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
    

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="formGroup" size="lg" controlId="email">
          <Form.Label>User</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Form.Group className="formGroup" size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Button className="formBut" block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}