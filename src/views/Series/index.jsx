import React, { useEffect, useState } from 'react';
import { Button, Carousel, Col, Pagination, Row } from 'antd';
import { LoadingPopular, VerticalPosterCard } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import pathName from 'routes/pathName';
import { movieProvider } from 'utils/request';
import './styles/index.style.scss';
import { Link } from 'react-router-dom';

const App = () => {
    const slick = React.useRef(null);
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
    const [latest, setLatest] = useState({
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
          const resp = await movieProvider.get(`tv/popular`, filter);
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

    const handlePageChange = (page) => {
        setPopular(prev => ({ ...prev, filter: { ...prev.filter, page } }));
    };

    const getLatest = async () => {
        try {
            setLatest(prev => ({ ...prev, loading: true }));
            const resp = await movieProvider.get(`tv/popular`);
            if (resp.data) {
                setLatest(prev => ({
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
            setLatest(prev => ({ ...prev, loading: false }));
        }
    };

    const prev = () => {
        slick.current.prev();
    };

    const next = () => {
        if (slick.current) slick.current.next();
    };

    useEffect(() => {
        getPopular(popular.filter);
    }, [popular.filter]);

    useEffect(() => {
        getLatest();
    }, []);

    return (
      <div className="series-list">
        <div className="banner">
          <div className="image-wrapper">
            <img src="https://picsum.photos/1920/602" alt="banner" />
          </div>
          <div className="title-wrapper">
            <h1 className="title">
              Our
              {' '}
              <span className="colored">Series</span>
            </h1>
            <div className="subtitle">
              <Link to={pathName.home}>HOME</Link>
              {' '}
              |
              {' '}
              <span>SERIES</span>
            </div>
          </div>
        </div>
        <div className="list-populer">
          <h1 className="title right-border">Popular</h1>
          <div className="content">
            <Row gutter={[16, 16]}>
              {popular.loading ? Array(20).fill('').map((_, idx) => {
                    return (
                      <Col key={idx} span={12} md={idx <= 7 ? 3 : 4}>
                        <LoadingPopular key={idx} />
                      </Col>
                    );
                    }) : popular.data.map((m, idx) => {
                        return (
                          <Col key={idx} span={12} md={idx <= 7 ? 3 : 4}>
                            <VerticalPosterCard
                              data={{ ...m, title: m.name, release_date: m.first_air_date }}
                              lintTo={pathName.tvShow.detail}
                            />
                          </Col>
                        );
                    })}
              <Col />
            </Row>
          </div>
          <div className="paging-wrapper">
            <Pagination
              {...popular.pagination}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
        <div className="lates-list">
          <div className="title-w-action">
            <h1 className="title right-border">Latest</h1>
            <div className="action">
              <Button><FontAwesomeIcon icon={faArrowLeft} onClick={prev} /></Button>
              <Button><FontAwesomeIcon icon={faArrowRight} onClick={next} /></Button>
            </div>
          </div>
          <div className="latest-content">
            <Carousel
              infinite
              dots={false}
              slidesToShow={6}
              slidesToScroll={2}
              ref={slick}
              className="latest-carousel"
            >
              {latest.loading ? Array(6).fill("").map((m, idx) => <LoadingPopular key={idx} />)
                : (latest.data && latest.data.length > 0 && Array(12).fill("").map((__, idx) => {
                    return (
                      <VerticalPosterCard
                        key={idx}
                        lintTo={pathName.tvShow.detail}
                        data={{
                                  ...latest.data[idx],
                                  title: latest.data[idx].name,
                                  release_date: latest.data[idx].first_air_date,
                              }}
                      />
                    );
                }))}
            </Carousel>
          </div>
        </div>
      </div>
    );
};

export default App;
