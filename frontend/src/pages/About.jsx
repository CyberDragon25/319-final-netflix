import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

// things needed in this page 
// An additional view is required to show student information, including course details:
// o Name of the course: SE/ComS319 Construction of User Interfaces, Spring 2024
// o Date
// o Complete name of students and ISU email
// o Complete name of Instructors and email :
// ✓ Dr. Abraham N. Aldaco Gastelum
// ✓ Dr. Ali Jannesari
// o This page does not require images; however, team member photos will be appreciated.
// • If developed for a real company or institution, include a view from the company information.
// • The App must contain one view with the information of the Company if the project was
// developed for a real Company or Institution

function About() {
  const [isscrolled, setIsscrolled] = useState(false);

  window.onscroll = () => {
    setIsscrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isscrolled={isscrolled} />
      <div className="content">
        <div className="about-container">
          <div className="about">
            <div className="title">
              <h3>About Us</h3>
            </div>
            <div className="info">
              <p>
              In an era where streaming platforms have revolutionized the entertainment industry, our
              final project aims to emulate the success of one of the most iconic platforms - Netflix.
              The motivation behind our Netflix clone project stems from the recognition of the
              significant impact streaming services have had on how we consume media. By creating a replica of
              Netflix, we endeavor to delve into the intricacies of modern web development, while also
              providing users with an immersive streaming experience akin to the original platform.
              </p>
            </div>
            <div className="author-info">
              <h4>Author Information</h4>
              <ul>
                <li>Name: Subham Bhattacharya</li>
                <li>Email: shubham8@iastate.edu</li>
              </ul>
              <div className="author-divider"></div>
              <ul>
                <li>Name: Jacob Callicott</li>
                <li>Email: jcallico@iastate.edu</li>
              </ul>
            </div>
          </div>
          <div className="course-info">
            <h4>Course Information</h4>
            <p>Name of the course: SE/ComS319 Construction of User Interfaces, Spring 2024</p>
            <p>Date: {new Date().toLocaleDateString()}</p> <br /> <br />
            <p>
              <strong>Instructors:</strong>
              <ul>
                <li>Dr. Abraham N. Aldaco Gastelum - Email: aaldaco@iastate.edu</li>
                <li>Dr. Ali Jannesari - Email: jannesar@iastate.edu</li>
              </ul>
            </p>
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

  
  .author-info {
    color: white;
    border-top: 1px #ffffff80;
    padding-top: 1rem;
  }

  h4 {
    margin-bottom: 0.5rem;
  }

  h3 {
    margin-top: 10rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .author-divider {
    margin-top: 1rem;
    border-top: 1px #ffffff80;
  }
`;

export default About;