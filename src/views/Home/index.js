import React from 'react';
import movieProvider from 'apis/movieProvider';
import { LoadingDiscover, LoadingPopular, LoadingTopRated } from 'components';
import { Button, Carousel, Col, message, Row, Typography } from 'antd';
import pathName from 'routes/pathName';
import { Link, unstable_HistoryRouter } from 'react-router-dom';
import { CardDiscover, CardPopuler, CardRated } from './components';
import './styles/index.style.scss';
import config from './index.config';

const App = () => {
  const history = unstable_HistoryRouter;
  const [discover, setDiscover] = React.useState({
    loading: false,
    dataSource: [],
  });
  const [popular, setPopuplar] = React.useState({
    loading: false,
    dataSource: [],
  });
  const [rated, setRated] = React.useState({
    loading: false,
    dataSource: [],
  });
  const [upcoming, setUpcoming] = React.useState({
    loading: false,
    dataSource: []
  });

  const getMovie = async () => {
    try {
      setDiscover(prev => ({ ...prev, loading: true }));
      setPopuplar(prev => ({ ...prev, loading: true }));
      setRated(prev => ({ ...prev, loading: true }));
      setUpcoming(prev => ({ ...prev, loading: true }));
      const [
        discoverResp,
        popularResp,
        topRatedResp,
        upcomingResp,
      ] = await Promise.all([
        movieProvider.get('discover/movie'),
        movieProvider.get('movie/popular'),
        movieProvider.get('movie/top_rated'),
        movieProvider.get('movie/upcoming')
      ].map(p => p.then(res => res).catch(error => ({}))));

      if (discoverResp.data) {
        const { results } = discoverResp.data;
        setDiscover({ dataSource: results, loading: false });
      }

      if (popularResp.data) {
        const { results } = popularResp.data;
        setPopuplar({ dataSource: results, loading: false });
      }
      if (topRatedResp.data) {
        const { results } = topRatedResp.data;
        setRated({ dataSource: results, loading: false });
      }
      if (upcomingResp.data) {
        const { results } = upcomingResp.data;
        setUpcoming({ dataSource: results, loading: false });
      }
    } catch (error) {
      message.error(error);
    }
  };
  React.useEffect(() => {
    getMovie();
    return () => movieProvider.cancel();
  }, []);

  return (
    <div className="home-container">
      <div className="banner">
        <div className="img-bg" />
        <div className="title-wrapper">
          <p className="site-name colored">McatLib</p>
          <h1 className="title">
            Unlimited
            {' '}
            <span className="colored">Movie</span>
            ,
            TVs, Shows, & More.
          </h1>
          <div className="subtitle">
            <Link className="discover-btn" to={pathName.movie.list}>Discover Now</Link>
          </div>
        </div>
      </div>
      <div className="discover-container">
        <Typography.Title level={2}>Discover</Typography.Title>
        <Carousel
          className="discover-caraousel"
          infinite
          slidesToShow={2}
          slidesToScroll={1}
          centerMode
          centerPadding="60px"
          swipeToSlide
          responsive={config.carousel.responsive}
        >
          {discover.loading ? Array(4).fill("").map((m, idx) => <LoadingDiscover key={idx} />)
          : (discover.dataSource && discover.dataSource.length > 0 && Array(8).fill("").map((__, idx) => {
            return (<CardDiscover key={discover.dataSource[idx].id} data={discover.dataSource[idx]} />);
          }))}
        </Carousel>
      </div>
      <div className="popular-container">
        <div className="sub-title-section">Most Popular</div>
        <div className="popular-list-container">
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            {popular.loading ? Array(6).fill("").map((m, idx) => {
              return (
                <Col key={idx} span={8} sm={6} lg={4}>
                  <LoadingPopular />
                </Col>
              );
            }) : (popular.dataSource && popular.dataSource.length > 0 && Array(12).fill("").map((__, idx) => {
              if (popular.dataSource.length > idx) {
                return (
                  <Col key={discover.dataSource[idx].id} span={8} sm={6} lg={4}>
                    <CardPopuler data={discover.dataSource[idx]} />
                  </Col>
                );
              }
              return null;
            }))}
          </Row>
        </div>
      </div>
      <div className="upcoming-container">
        <div className="sub-title-section">Upcoming</div>
        <div className="upcoming-list-container">
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            {upcoming.loading ? Array(6).fill("").map((m, idx) => {
              return (
                <Col key={idx} span={8} sm={6} lg={4}>
                  <LoadingPopular />
                </Col>
              );
            }) : (upcoming.dataSource && upcoming.dataSource.length > 0 && Array(12).fill("").map((__, idx) => {
              if (upcoming.dataSource.length > idx) {
                return (
                  <Col key={upcoming.dataSource[idx].id} span={8} sm={6} lg={4}>
                    <CardPopuler data={upcoming.dataSource[idx]} />
                  </Col>
                );
              }
              return null;
            }))}
          </Row>
        </div>
      </div>
      <div className="toprated-container">
        <div className="sub-title-section">Top Rated</div>
        <div className="toprated-list-container">
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            {rated.loading ? Array(4).fill("").map((m, idx) => {
              return (
                <Col className="toprated-item" span={24} md={12} lg={6} key={idx}>
                  <LoadingTopRated />
                </Col>
              );
            }) : (rated.dataSource && rated.dataSource.length > 0 && Array(4).fill("").map((__, idx) => {
              if (rated.dataSource.length > idx) {
                return (
                  <Col className="toprated-item" span={24} md={12} lg={6} key={rated.dataSource[idx].id}>
                    <CardRated data={rated.dataSource[idx]} />
                  </Col>
                );
              }
            return null;
          }))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default App;
