import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import UserIDContext from "../components/UserIDContext";

function UserAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isscrolled, setIsscrolled] = useState(false);
  const { userID, setUserID } = useContext(UserIDContext);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8081/users/edit/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user information");
      }
      alert("User information updated successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch(`http://localhost:8081/users/delete/${userID}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete user account");
        }
        setUserID(null);
        navigate("/login");
      } catch (error) {
        setError(error.message);
      }
    }
  };


  window.onscroll = () => {
    setIsscrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8081/users/${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }
        const data = await response.json();
        setEmail(data.email); 
        setPassword(data.password);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (userID) {
      fetchUserInfo();
    }
  }, [userID]);

  useEffect(() => {
    if (userID === null) {
      navigate("/login");
    }
  }, [userID, navigate]);

  return (
    <Container>
      <Navbar isscrolled={isscrolled} />
      <div className="content">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
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
                <input type="text" value={password} onChange={handlePasswordChange} />
              </div>
              <div className="button-container">
              <button className="edit-button" onClick={handleEdit}>Edit</button>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
              </div>

            </div>
          </div>
        )}
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

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .edit-button,
  .delete-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.2rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
  }

  .edit-button:hover,
  .delete-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .edit-button {
    background-color: #e50914;
    color: white;
  }

  .delete-button {
    background-color: #333333;
    color: white;
  }
`;

export default UserAccountPage;