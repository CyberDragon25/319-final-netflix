import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

function UserAccountPage() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("********");
  const [isscrolled, setIsscrolled] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  window.onscroll = () => {
    setIsscrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
    <Navbar isscrolled={isscrolled} />
      <div className="content">
        <div className="form-container">
          <div className="form">
            <div className="title">
              <h3>User Account Information</h3>
            </div>
            <div className="input-container">
              <label>Email</label>
              <input type="text" value={email} onChange={handleEmailChange} />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .form-container {
    width: 400px;
    background-color: #000000b0;
    padding: 2rem;
    border-radius: 0.5rem;
  }

  .form {
    color: white;
  }

  .title {
    margin-bottom: 2rem;
    text-align: center;
  }

  .input-container {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 0.2rem;
  }
`;

export default UserAccountPage;