import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import Item from "../Component/Item";
import itemsData from "../data/items.json";
import "./Home.css";

function Home({ isAuthenticated }) {
  const navigate = useNavigate();
  const [itemsToShow, setItemsToShow] = useState(8);
  const [items] = useState(itemsData);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out", error);
      });
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY) {
            // Scrolling down
            setItemsToShow(itemsToShow + 4);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            if (itemsToShow > 8) {
              setItemsToShow(itemsToShow - 4);
            }
          }
          lastScrollY = currentScrollY;
          isScrolling = false;
        });

        isScrolling = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [itemsToShow]);

  return (
    <div className="container-fluid py-1 vw-100 weather-data bg-dark ">
      <nav className="navbar navbar-inverse">
        <div className="container-fluid bg-black text-center py-2">
          <div className="navbar-header">
            <h1 className="fw-bold h3 text-light my-1">ARI StX</h1>
          </div>
          <ul className="nav navbar-nav"></ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <div className="item-container ">
          {items.slice(0, itemsToShow).map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
