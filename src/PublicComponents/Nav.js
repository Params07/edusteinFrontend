import React, { useState, useContext, useEffect, useRef } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { IoCloseSharp } from "react-icons/io5";
import Register from "./NavComponents/Register";
import { GlobalStateContext } from "./UseContextComponents/GlobalStateProvider";
import { Link } from 'react-router-dom';

function Nav() {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'program', label: 'Program' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const [navBar, setNavBar] = useState(false);
  const [active, setActive] = useState(navItems[0].id);
  const { openRegisterForm } = useContext(GlobalStateContext);
  const handleScrollRef = useRef();
  const isScrolling = useRef(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = (id) => {
    setActive(id);
    setNavBar(false);
    const element = document.getElementById(id);
    const offset = 40;
    let duration = 0;
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetScrollTop = scrollTop + rect.top - offset;
      const distance = Math.abs(targetScrollTop - scrollTop);
      duration = distance;
      window.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }

    isScrolling.current = false;
    setTimeout(() => {
      isScrolling.current = true;
    }, duration);
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const handleScroll = () => {
      if (!isScrolling.current) {
        return;
      }

      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY + 100 >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      setActive(current);
    };

    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      handleScroll();
    };

    handleScrollRef.current = onScroll;

    window.addEventListener("scroll", handleScrollRef.current);

    return () => {
      window.removeEventListener("scroll", handleScrollRef.current);
    };
  }, [isScrolled]);

  return (
    <>
      <nav className={`fixed z-10 w-full h-16 sm:h-20 md:rounded-b-3xl px-6 md:py-6 grid items-center ${!navBar ? "rounded-b-3xl" : ""} ${isScrolled && !navBar ? 'bg-white bg-opacity-75' : 'bg-white'}`}>
        <div className="flex justify-between items-center">
          <div className="w-32 h-8 sm:w-42 sm:h-10">
            <img className="w-full h-full object-contain" src="/images/logo.png" alt="edustein" />
          </div>
          <div className="block md:hidden pr-3" onClick={() => setNavBar(!navBar)}>
            <div className="transition-transform duration-700 cursor-pointer">
              {navBar ? <IoCloseSharp className="text-2xl" /> : <VscThreeBars className="text-2xl" />}
            </div>
          </div>
          <div
            className={`pb-5 absolute md:pr-4 left-0 top-16 min-h-84 w-full  grid space-y-8 md:static md:flex   ${isScrolled && !navBar ? ' bg-opacity-75' : 'bg-white'} 
        md:space-y-0 md:space-x-10 lg:space-x-14 md:h-4 md:w-auto font-redhat text-base font-semibold ${navBar ? 'block ' : 'hidden'}`}
          >
            {navItems.map((item) => (
              <Link to={`/`} key={item.id}>
                <span
                  className={`px-16 md:px-0 cursor-pointer ${active === item.id ? 'text-line md:text-navItems md:underline md:underline-offset-8' : 'text-navItems'}`}
                  style={{
                    textDecorationColor: active === item.id ? '#D2AD20' : 'inherit',
                    textUnderlineOffset: '8px',
                    textDecorationThickness: active === item.id ? '2px' : 'inherit',
                  }}
                  onClick={() => handleClick(item.id)}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <span className="flex items-center justify-center pt-0 sm:pt-3">
              <button className="bg-line text-white px-8 py-2 hover:bg-white hover:text-line border-2 border-line rounded-full" onClick={() => openRegisterForm()}>
                Register
              </button>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
