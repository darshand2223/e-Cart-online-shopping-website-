import React, { useContext, useEffect, useState } from "react";
import "./header.scss";
import navbarLogo from "/Images/logoMain.svg";
import searchImage from "/Images/search-normal.png";
import wishList from "/Images/wishlist.png";
import userImage from "/Images/user.png";
import shoppingCart from "/Images/shopping-cart.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import LoginPopUp from "../loginPopUp/LoginPopUp";
import UserContext, { userResultDetails } from "../context/UserContext";
import axios from "axios";
import Searchbar from "./Searchbar";
import { cartItemCountApi } from "../../api/Constant";
import { useSelector } from "react-redux";
import {
  Container,
  InputGroup,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  Button,
} from "react-bootstrap";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [cartProductCount, setCartProductCount] = useState("");
  const cartProductValue = useSelector((state) => state.cartCount.count);
  // console.log("cart Product Value", cartProductValue);

  const navigate = useNavigate();

  //For loginPop when clicked on login/Register button.
  const [show, setShow] = useState(false);

  //For hamburgermenu display in mobile screen size.
  const [showHamburgerMenu, setShowHamburgermenu] = useState(false);
  const hideClose = () => setShowHamburgermenu(false);
  const handleShow = () => setShowHamburgermenu(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleLogin = () => {
    setShow(true);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://bargainfox-dev.concettoprojects.com/api/logout",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        setUser(userResultDetails);
        console.log("logout");
      }
    } catch (error) {
      console.log("some error while logging out");
    }
  };

  const cartItemCount = async () => {
    try {
      const response = await axios.get(cartItemCountApi, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status === 200) {
        // console.log("cart items", response.data.result.cart_item_count);
        setCartProductCount(response.data.result);
      }
    } catch (error) {
      console.log("Error while counting cart products", error);
    }
  };

  useEffect(() => {
    cartItemCount();
  }, [cartProductValue]);

  return (
    <>
      <header className="shadow-sm  main-header">
        <Container fluid className="mt-2 mb-3 p-3">
          <Row className="d-flex align-items-center  justify-content-between px-1">
            <Col className="col-6 col-sm-6 col-md-4">
              <Navbar className="gap-1">
                <div onClick={handleShow}>
                  <GiHamburgerMenu className=" d-flex d-sm-none" />
                </div>
                <Offcanvas
                  show={showHamburgerMenu}
                  onHide={hideClose}
                  className="d-sm-none"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                      <p className="fw-bold h3"> Sign In/Register</p>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <div className="hamburgerMenu border-2  bg-white d-sm-none">
                      <ul className=" text-center  list-unstyled text-black">
                        <Button
                          type="button"
                          className="hamburger-loginButton rounded-4 mt-2 border-0 text-white fw-bold"
                          onClick={() => setShow(true)}
                        >
                          Login/Register
                        </Button>

                        <li>
                          <Link to="#">Your Profile</Link>
                        </li>

                        {/* <li>
                          <Link to="#">Fastfox Subscription</Link>
                        </li> */}
                        <li>
                          <Link to="#">Your Orders</Link>
                        </li>
                        <li>
                          <Link to="#">Addresses</Link>
                        </li>
                        {/* <li>
                          <Link to="#">Notifications</Link>
                        </li> */}
                        <li>
                          <Link to="#">Wishlists</Link>
                        </li>
                      </ul>
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
                <Link to="/">
                  <div style={{ width: "110px" }}>
                    <img
                      src={navbarLogo}
                      className=" align-top mx-1 w-100 img-fluid"
                    />
                  </div>
                </Link>
              </Navbar>
            </Col>

            <Col className="d-none d-md-flex">
              <Searchbar />
            </Col>

            <Col className="col-6 col-sm-6  col-md-4 d-flex justify-content-end mt-2 align-items-center">
              <Nav.Link className="position-relative">
                <img src={wishList} className="img-fluid" />
                <span className="text-white circle position-absolute d-flex align-items-center justify-content-center">
                  12
                </span>
              </Nav.Link>

              <Nav.Link
                className="mx-4 position-relative"
                onClick={() => navigate("/shoppingcart")}
              >
                <img src={shoppingCart} className="img-fluid" />

                <span className="text-white circle position-absolute d-flex align-items-center justify-content-center">
                  {cartProductCount.cart_item_count}
                </span>
              </Nav.Link>

              <Nav.Link className="loginMenu">
                <div className=" d-flex gap-2 align-items-center">
                  <img src={userImage} className="img-fluid" />

                  <div className="d-xl-flex  justify-content-center flex-column d-none">
                    <span>Hello there,</span>
                    <span className="fw-bold ">
                      {user.name == "" ? "SIGN IN/REGISTER" : user.name}
                    </span>
                  </div>

                  <div className=" border-2  bg-white d-none d-md-flex">
                    <ul className="dropDownMenu text-center  list-unstyled text-black">
                      {user.name == "" ? (
                        <Button
                          className="rounded-4 mt-2 border-0 text-white fw-bold"
                          onClick={handleLogin}
                        >
                          Login/Register
                        </Button>
                      ) : (
                        <Button
                          className="rounded-4 mt-2 border-0 text-white fw-bold"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      )}

                      <li>
                        <Link to="profile">Your Profile</Link>
                      </li>

                      <li>
                        <Link to="orders">Your Orders</Link>
                      </li>
                      <li>
                        <Link to="addresses">Addresses</Link>
                      </li>

                      <li>
                        <Link to="wishlists">Wishlists</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Nav.Link>
            </Col>

            {/* SearchBar for small screen */}
            <Col className="d-md-none d-flex mt-3 ">
              <InputGroup>
                <Form.Control
                  placeholder="Search Products"
                  className="custom-searchbar"
                />
                <Button className="p-2 ">
                  <img src={searchImage} className="img-fluid" />
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </header>

      {show && <LoginPopUp show={show} handleClose={handleClose} />}
    </>
  );
};

export default Header;
