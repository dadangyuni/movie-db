import React, { useEffect } from 'react';
import { Image, Input } from 'antd';
import pathName from 'routes/pathName';
import { Link, useNavigate } from 'react-router-dom';
import { VideoCameraOutlined, GoldOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

const { movie, home, search, genre, tvShow } = pathName;

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
                  <Link to={movie.trending}>Trending</Link>
                  <Link to={movie.popular}>Popular</Link>
                  <Link to={movie.newRelease}>New Release</Link>
                </div>
              </li>
              <li className="dropdown-wrapper">
                <Link to={tvShow.list} className="drop-btn">
                  <VideoCameraOutlined />
                  {' '}
                  Tv Show
                </Link>
                <div className="submenu-dropdown">
                  <Link to={tvShow.trending}>Trending</Link>
                  <Link to={tvShow.popular}>Popular</Link>
                  <Link to={tvShow.newRelease}>New Release</Link>
                </div>
              </li>
              <li className="dropdown-wrapper">
                <Link to={genre.list} className="drop-btn">
                  <GoldOutlined />
                  {' '}
                  Genre
                </Link>
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
