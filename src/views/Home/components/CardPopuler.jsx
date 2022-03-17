import React from 'react';
import movieProvider from 'apis/movieProvider';
import { Image, Rate } from 'antd';
import { Link } from 'react-router-dom';
import pathName from 'routes/pathName';

const { movie } = pathName;

const CardPopuler = ({ data }) => {
    const imgUrl = data.poster_path ? movieProvider.getImage(data.poster_path) : "";
    return (
      <div className="card-populer-container">

        <div className="img-container">
          <Link to={movie.detail(data.id)}>
            <Image src={imgUrl} width="100%" preview={false} />
            <div className="overlay-info">
              <div className="info-rate">
                <Rate count={1} disabled value={1} />
                {' '}
                {data.vote_average}
              </div>
            </div>
          </Link>
        </div>
        <div className="desc-container">
          <div className="desc-title">
            <Link to={movie.detail(data.id)}>{data.title}</Link>
          </div>
          <div className="desc-release-year">{data.release_date}</div>
        </div>
      </div>
    );
};

export default CardPopuler;
