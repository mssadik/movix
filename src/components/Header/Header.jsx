import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./style.scss";

import logo from "../../assets/movix-logo.svg";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/userSlice";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const {email} = useSelector((state) => state.user)

    useEffect(() =>{
        window.scrollTo(0, 0)
    }, [location])

    const controlNavbar = () =>{
        if(window.scrollY > 200){
            if(window.scrollY > lastScrollY && !mobileMenu){
                setShow("hide")
            }else{
                setShow("show")
            }
        }else{
            setShow("top")
        }
        setLastScrollY(window.scrollY)
    }


    useEffect(() =>{
        window.addEventListener("scroll", controlNavbar)
        return () =>{
            window.removeEventListener("scroll", controlNavbar)
        }
    }, [lastScrollY])

    const searchQueryHandler = event => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`); 
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    }

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    }

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }

    const navigationHandler = (type) => {
        if(type === "movie"){
            navigate("explore/movie")
        }else{
            navigate("/explore/tv")
        }
        setMobileMenu(false)
    }

    const handelLogout = () =>{
        dispatch(logoutUser())
        signOut(auth)
        .then(() => {
            navigate('/')
            
          }).catch((error) => {
            console.log(error);
          });
    }



    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <ul className="menuItems">
                <Link to="/"><li className="menuItem">Home</li></Link>
                    
                  {email ? <li onClick={handelLogout} className="menuItem">Log Out</li> : <div> <Link to="/signUp"><li className="menuItem">Sign Up</li></Link></div>}

                    <li className="menuItem" onClick={() => {
                        navigationHandler("movie")
                    }}>Movies</li>

                    <li className="menuItem" onClick={() => {
                        navigationHandler("tv")
                    }}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={() => openSearch(false)}></HiOutlineSearch>
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={() => openSearch(false)}></HiOutlineSearch>
                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)}></VscChromeClose> : <SlMenu onClick={openMobileMenu}></SlMenu>}
                </div>
            </ContentWrapper>
            {showSearch &&
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                                placeholder='Search for movie or tv show...' />
                            <VscChromeClose onClick={() => setShowSearch(false)}></VscChromeClose>
                        </div>
                    </ContentWrapper>
                </div>
            }
        </header>
    );
};

export default Header;