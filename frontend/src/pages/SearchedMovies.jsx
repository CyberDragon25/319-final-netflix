import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";
import UserIDContext from "../components/UserIDContext";
import { fetchMovies, getGenres } from "../store";

export default function SearchedMovies() {
  const movies = useSelector((state) => state.netflix.movies);
  const [allFilms, setAllFilms] = useState([]);
  const [findTV, setFindTV] = useState([false])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const { userID, setUserID } = useContext(UserIDContext);
  const { userSearch, setUserSearch } = useContext(UserIDContext);
  const [selectedButton, setSelectedButton] = useState("movies");

  useEffect(() => {
    if (userID === null) {
      navigate("/login");
    }
  }, [userID, navigate]);

  const regexPattern = new RegExp(userSearch, "i");
  const filteredMovies = movies.filter(item => regexPattern.test(item.name));

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>Search Results: {userSearch} </h1>
        <div className="grid flex">
          {filteredMovies.map((movie, index) => (
            <Card
              movieData={movie}
              index={index}
              key={movie.id}
              isLiked={false}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }

`;