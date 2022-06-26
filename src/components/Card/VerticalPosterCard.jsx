import React from 'react';
import { Image, Rate, Typography } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import movieProvider from 'apis/movieProvider';
import '../styles/vertical-poster-card.scss';

const VerticalPosterCard = ({ data, lintTo }) => {
    const imgUrl = data.poster_path ? movieProvider.getImage(data.poster_path) : "";
    return (
      <div className="vertical-poster-card">
        <div className="img-container">
          <Link to={lintTo(data.id)}>
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
            <Link to={lintTo(data.id)}>
              <Typography.Paragraph ellipsis={{ rows: 1, tooltip: <div>{data.title}</div> }}>{data.title}</Typography.Paragraph>
            </Link>
          </div>
          <div className="desc-release-year">{data.release_date ? moment(data.release_date).format("MMMM, YYYY") : null}</div>
        </div>
      </div>
    );
};

export default VerticalPosterCard;
