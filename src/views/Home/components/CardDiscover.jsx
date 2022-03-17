import React from 'react';
import { Image, Rate, Typography } from 'antd';
import { Link } from 'react-router-dom';
import movieProvider from 'apis/movieProvider';
import pathName from 'routes/pathName';

const { movie } = pathName;

const CardDiscover = ({ data }) => {
    const imgUrl = data.backdrop_path ? movieProvider.getImage(data.backdrop_path, 'w500') : "";
    return (
      <div className="card-item-discover">
        <Link to={movie.detail(data.id)}>
          <Image src={imgUrl} preview={false} />
          <div className="info-container">
            <div className="info-wrapper">
              <Typography.Title level={5}>{data.title}</Typography.Title>
              <Typography.Text>{data.release_date}</Typography.Text>
              <div className="rating-wrapper">
                <Rate count={1} value={1} disabled />
                {" "}
                {data.vote_average}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
};

export default CardDiscover;
