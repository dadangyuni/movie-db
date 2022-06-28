import { Col, Pagination, Row } from 'antd';
import { LoadingPopular, VerticalPosterCard } from 'components';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import pathName from 'routes/pathName';
import { movieProvider } from 'utils/request';
import './styles/series-genre.style.scss';

const SeriesGenre = () => {
  const params = useParams();
  const location = useLocation();
  const [series, setSeries] = useState({
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
  const getData = async (filter) => {
    try {
        setSeries(prev => ({ ...prev, loading: true }));
        const resp = await movieProvider.get(`discover/tv`, filter);
        if (resp.data) {
            setSeries(prev => ({
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
        setSeries(prev => ({ ...prev, loading: false }));
    }
  };

  const handleChange = (page) => {
    setSeries(prev => ({ ...prev, filter: { ...prev.filter, page } }));
  };

  useEffect(() => {
    getData(series.filter);
  }, [series.filter]);

  return (
    <div className="series-genre">
      <div className="banner">
        <div className="image-wrapper">
          <img src="https://picsum.photos/1920/602" alt="banner" />
        </div>
        <div className="title-wrapper">
          <h1 className="title">
            <span className="colored">{series.title}</span>
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
            <span>TV SHOW</span>
          </div>
        </div>
      </div>
      <div className="content">
        <Row gutter={[16, 16]}>
          {series.loading ? Array(20).fill('').map((_, idx) => {
            return (
              <Col key={idx} span={12} md={idx <= 7 ? 3 : 4}>
                <LoadingPopular key={idx} />
              </Col>
          );
          })
            : series.data.map((m, idx) => {
              return (
                <Col key={idx} span={12} md={idx <= 7 ? 3 : 4}>
                  <VerticalPosterCard
                    data={{
                        ...series.data[idx],
                        title: series.data[idx].name,
                        release_date: series.data[idx].first_air_date,
                    }}
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
          {...series.pagination}
          onChange={handleChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SeriesGenre;
