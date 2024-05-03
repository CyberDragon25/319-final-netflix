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

export default function MyList() {
  const movies = useSelector((state) => state.netflix.movies);
  const [allFilms, setAllFilms] = useState([]);
  const [findTV, setFindTV] = useState([false])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const { userID, setUserID } = useContext(UserIDContext);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedButton, setSelectedButton] = useState("movies");



  useEffect(() => {
    if (userID === null) {
      navigate("/login");
    }
  }, [userID, navigate]);

  useEffect(() => {
    const fetchLikedMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/users/favorites/${userID}`
        );
        if (response.status === 200) {
          const movieIDs = response.data.favorites.map((movieId) => movieId);
          const filtered = movies.filter((movie) =>
            movieIDs.includes(movie.id)
          );
          setFilteredMovies(filtered);
        } else {
          throw new Error("Failed to fetch user's liked movies");
        }
      } catch (error) {
        console.error("Error fetching user's liked movies:", error);
      }
    };
    fetchLikedMovies();
  }, [userID, movies]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleShowMovies = () => {
    setSelectedButton("movies");
    dispatch(fetchMovies({ type: "movie" }));
  };

  const handleShowTVShows = () => {
    setSelectedButton("tvShows");
    dispatch(fetchMovies({ type: "tv" }));
  };

  useEffect(() => {
    dispatch(fetchMovies({ type: "movie" }));
  },[]);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="buttons">
          <button
            onClick={handleShowMovies}
            className={selectedButton === "movies" ? "selected" : ""}
          >
            Movies
          </button>
          <button
            onClick={handleShowTVShows}
            className={selectedButton === "tvShows" ? "selected" : ""}
          >
            TV Shows
          </button>
        </div>
        <div className="grid flex">
          {filteredMovies.map((movie, index) => (
            <Card
              movieData={movie}
              index={index}
              key={movie.id}
              isLiked={true}
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

  .buttons {
    margin-bottom: 1rem;
    button {
      margin-right: 1rem;
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border: none;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    .selected {
      background-color: black;
    }
  }
`;