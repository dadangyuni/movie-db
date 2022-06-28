import React from 'react';
import { Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import pathName from 'routes/pathName';

const AppFooter = () => {
  return (
    <div className="app-footer">
      <div className="footer-container">
        <div className="copy-wrapper">
          <div className="app-logo">
            <Link to={pathName.home}>
              <Image src="/assets/images/logo.png" preview={false} />
            </Link>
          </div>
        </div>
        <div className="ft-action-wrapper">
          <span style={{ marginRight: '10px' }}>
            Make with
            {' '}
            <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
            {' '}
            by Dadang.
          </span>
          <Button className="btn-up-footer" type="link" href="#appContent"><FontAwesomeIcon icon={faArrowUp} /></Button>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
