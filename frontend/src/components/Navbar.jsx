import { signOut } from "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"; 
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserIDContext from "./UserIDContext";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [enterWasPushed, setEnterWasPushed] = useState(false);
  const { userID, setUserID } = useContext(UserIDContext);
  const { userSearch, setUserSearch } = useContext(UserIDContext);
  const navigate = useNavigate();

  const links = [
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/myList" },
    { name: "About", link: "/about" },
    { name: "Account", link: "/accountInfo" },
  ];

  useEffect(() => {
    if (userID === null) {
      navigate("/login");
    }
  }, [userID, navigate]);

  const signOut = () => {
    setUserID(null);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
        setEnterWasPushed(true);
    }
  };

  const handleSearchChange = (e) => {
    setUserSearch(e.target.value);
  };


  useEffect(() => {
    if (enterWasPushed){
      navigate("/searchedMovies");
    }
  },[enterWasPushed]);

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onChange={handleSearchChange}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          <button onClick={signOut}>
            Sign Out <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}


const Container = styled.div
`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    background-color: black;
    opacity: 0.8;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;