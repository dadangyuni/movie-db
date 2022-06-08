import React from 'react';
import { Image } from 'antd';
import { movieDbBaseImgUrl } from 'utils/intialEndpoint';
import { numberAbbre, numberFormat } from 'utils/number';

const CardMore = (props) => {
    const { title, subtitle, poster, vote, rating } = props;
    return (
      <div className="card-more">
        <div className="image-container">
          <Image src={`${movieDbBaseImgUrl}w500${poster}`} preview={false} />
        </div>
        <div className="info-container">
          <div className="info-title">{title}</div>
          <div className="info-subtitle">{subtitle}</div>
          <div className="info-vote-n-rate">
            <div className="vote-value">
              <i className="fa-solid fa-heart" style={{ color: '#FF6161' }} />
              {' '}
              {vote ? numberFormat(vote) : 0}
            </div>
            <div className="rating-value">
              <i className="fa-solid fa-star" style={{ color: "#FFF61A" }} />
              {' '}
              {rating ? rating.toFixed(1) : 0}
            </div>
          </div>
        </div>
      </div>
    );
};

export default CardMore;
