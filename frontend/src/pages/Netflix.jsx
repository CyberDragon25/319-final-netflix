import React, { useState } from "react";
import Navbar from "../components/Navbar";



export default function Netflix() {

  const [isscrolled, setIsscrolled] = useState(false);

  window.onscroll = () => {
    setIsscrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div>
     <Navbar isscrolled={isscrolled} />
    </div>

  );
}
