import { Image } from 'antd';
import React from 'react';
import movieProvider from 'apis/movieProvider';
import { Link } from 'react-router-dom';
import pathName from 'routes/pathName';
import moment from 'moment';

const { movie } = pathName;

const CardRated = ({ data }) => {
    const imgUrl = data.poster_path ? movieProvider.getImage(data.poster_path) : '';
  return (
    <div className="card-rated-container">
      <div className="image-wrapper">
        <Link to={movie.detail(data.id)}>
          <Image src={imgUrl} preview={false} />
        </Link>
      </div>
      <div className="info-rated-wrapper">
        <div className="info-year">{data.release_date ? moment(data.release_date).format("YYYY") : null}</div>
        <div className="info-title"><Link to={movie.detail(data.id)}>{data.title}</Link></div>
        <div className="info-popularity">
          Popularity :
          {' '}
          {data.popularity}
        </div>
      </div>
    </div>
  );
};

export default CardRated;
