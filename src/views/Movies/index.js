import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row } from 'antd';
import { movieProvider } from 'utils/request';
import { LoadingPopular, VerticalPosterCard } from 'components';
import pathName from 'routes/pathName';
import './styles/index.style.scss';
import { Link } from 'react-router-dom';

const App = () => {
  const [popular, setPopular] = useState({
    data: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0
    },
    filter: { page: 1 }
  });
  const [toprated, setToprated] = useState({
    data: [],
    loading: false,
    pagination: {
      current: 1,
      pageSize: 20,
      total: 0
    },
    filter: { page: 1 }
  });

  const getPopular = async (filter) => {
    try {
      setPopular(prev => ({ ...prev, loading: true }));
      const resp = await movieProvider.get(`movie/popular`, filter);
      if (resp.data) {
        setPopular(prev => ({
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
      setPopular(prev => ({ ...prev, loading: false }));
    }
  };

  const getTopRated = async (filter) => {
    try {
      setToprated(prev => ({ ...prev, loading: true }));
      const resp = await movieProvider.get(`movie/top_rated`, filter);
      if (resp.data) {
        setToprated(prev => ({
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
      setToprated(prev => ({ ...prev, loading: false }));
    }
  };

  const handlePopChange = (page) => {
    setPopular(prev => ({ ...prev, filter: { ...prev.filter, page } }));
  };

  const handleTopChange = (page) => {
    setToprated(prev => ({ ...prev, filter: { ...prev.filter, page } }));
  };

  useEffect(() => {
    getPopular(popular.filter);
  }, [popular.filter]);

  useEffect(() => {
    getTopRated(toprated.filter);
  }, [toprated.filter]);

  return (
    <div className="movie-list-contianer">
      <div className="banner">
        <div className="image-wrapper">
          <img src="https://picsum.photos/1920/602" alt="banner" />
        </div>
        <div className="title-wrapper">
          <h1 className="title">
            Our
            {' '}
            <span className="colored">Movie</span>
          </h1>
          <div className="subtitle">
            <Link to={pathName.home}>HOME</Link>
            {' '}
            |
            {' '}
            <span>MOVIE</span>
          </div>
        </div>
      </div>
      <div className="popular-container">
        <h1 className="title right-border">Popular</h1>
        <div className="content">
          <Row gutter={[16, 16]}>
            {popular.loading ? Array(20).fill('').map((_, idx) => {
              return (
                <Col key={idx} span={12} md={idx <= 7 ? 3 : 4}>
                  <LoadingPopular key={idx} />
                </Col>
);
            })
              : popular.data.map((m, idx) => {
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
            {...popular.pagination}
            onChange={handlePopChange}
            showSizeChanger={false}
          />
        </div>
      </div>
      <div className="toprated-container">
        <h1 className="title right-border">Top Rated</h1>
        <div className="content">
          <Row gutter={[18, 18]}>
            {toprated.loading ? Array(20).fill('').map((_, idx) => {
              return (
                <Col key={idx} span={12} md={idx <= 7 ? 3 : 4}>
                  <LoadingPopular key={idx} />
                </Col>
              );
            }) : toprated.data.map((m, idx) => {
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
            {...toprated.pagination}
            onChange={handleTopChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
