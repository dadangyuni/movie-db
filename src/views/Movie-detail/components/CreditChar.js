import React from 'react';
import { Avatar } from 'antd';
import { movieDbBaseImgUrl } from 'utils/intialEndpoint';

const CreditChar = (props) => {
    const { avatar, originalName, characterName } = props;
  return (
    <div className="casting-container">
      <div className="image-container">
        <Avatar src={`${movieDbBaseImgUrl}/w500${avatar}`} size={80} />
      </div>
      <div className="casting-info">
        <div className="casting-name">{originalName}</div>
        <div className="casting-char">{characterName}</div>
      </div>
    </div>
  );
};

export default CreditChar;
