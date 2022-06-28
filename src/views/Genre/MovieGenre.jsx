import { Col, Pagination, Row } from 'antd';
import { LoadingPopular, VerticalPosterCard } from 'components';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import pathName from 'routes/pathName';
import { movieProvider } from 'utils/request';
import './styles/movie-genre.style.scss';

const MovieGenre = () => {
  const params = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState({
    data: [],
    title: location.state && location.state.name,
    loading: false,
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0
    },
    filter: { page: 1, with_genres: params.id }
  });
  const getTopRated = async (filter) => {
    try {
      setMovie(prev => ({ ...prev, loading: true }));
      const resp = await movieProvider.get(`discover/movie`, filter);
      if (resp.data) {
        setMovie(prev => ({
          ...prev,
          loading: false,
          data: resp.data.results,
          pagination: {
            ...prev.pagination,
            current: resp.data.page,
            total: resp.data.total_results
          }
        }));
      } else {
        throw resp;
      }
    } catch (error) {
      setMovie(prev => ({ ...prev, loading: false }));
    }
  };

  const handleChange = (page) => {
    setMovie(prev => ({ ...prev, filter: { ...prev.filter, page } }));
  };

  useEffect(() => {
    getTopRated(movie.filter);
  }, [movie.filter]);

  return (
    <div className="movie-genre">
      <div className="banner">
        <div className="image-wrapper">
          <img src="https://picsum.photos/1920/602" alt="banner" />
        </div>
        <div className="title-wrapper">
          <h1 className="title">
            <span className="colored">{movie.title}</span>
          </h1>
          <div className="subtitle">
            <Link to={pathName.home}>HOME</Link>
            {' '}
            |
            {" "}
            <Link to={pathName.genre.list}>ALL GENRE</Link>
            {" "}
            |
            {' '}
            <span>MOVIE</span>
          </div>
        </div>
      </div>
      <div className="content">
        <Row gutter={[16, 16]}>
          {movie.loading ? Array(20).fill('').map((_, idx) => {
            return (
              <Col key={idx} span={12} md={idx <= 7 ? 3 : 4}>
                <LoadingPopular key={idx} />
              </Col>
          );
          })
            : movie.data.map((m, idx) => {
              return (
                <Col key={idx} span={12} md={idx <= 7 ? 3 : 4}>
                  <VerticalPosterCard data={m} lintTo={pathName.movie.detail} />
                </Col>
              );
            })}
          <Col />
        </Row>
      </div>
      <div className="paging-wrapper">
        <Pagination
          {...movie.pagination}
          onChange={handleChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default MovieGenre;
