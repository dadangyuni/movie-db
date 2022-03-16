import React, { useEffect } from 'react';
import { Image, Input } from 'antd';
import pathName from 'routes/pathName';
import { Link, useNavigate } from 'react-router-dom';
import { VideoCameraOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

const { movie, home, search } = pathName;

const AppHeader = () => {
    const navigate = useNavigate();
    const handleSearch = (value) => {
        navigate(value ? search(value) : home);
    };
    useEffect(() => {
      let prevScrollpos = window.pageYOffset;
      window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          document.getElementById("app-header").style.top = "0";
        } else {
          document.getElementById("app-header").style.top = "-70px";
        }
        prevScrollpos = currentScrollPos;
      };
      return () => {
        window.onscroll = null;
        prevScrollpos = null;
      };
    }, []);

    return (
      <div id="app-header" className="app-header">
        <div className="header-container">
          <div className="app-logo">
            <Link to={home}>
              <Image src="/assets/images/logo.png" preview={false} />
            </Link>
          </div>
          <div className="app-menu-container">
            <ul className="menu-list">
              <li className="dropdown-wrapper">
                <Link to={movie.list} className="drop-btn">
                  <FontAwesomeIcon icon={faCameraRetro} />
                  <div>Movie</div>
                </Link>
                <div className="submenu-dropdown">
                  <Link to="/trending">Trending</Link>
                  <Link to={movie}>Popular</Link>
                  <Link to={movie}>New Release</Link>
                </div>
              </li>
              <li className="dropdown-wrapper">
                <Link to={movie} className="drop-btn">
                  <VideoCameraOutlined />
                  {' '}
                  Tv Show
                </Link>
                <div className="submenu-dropdown">
                  <Link to="/trending">Trending</Link>
                  <Link to={home}>Popular</Link>
                  <Link to={home}>New Release</Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="app-toolbar">
            <Input.Search onSearch={handleSearch} placeholder="Search..." />
          </div>
        </div>
      </div>
    );
};

export default AppHeader;
