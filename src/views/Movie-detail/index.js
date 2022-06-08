import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router';
import { Button, Col, Image, Progress, Row, Space, Tag } from 'antd';
import { numberAbbre } from 'utils/number';
import movieProvider from 'apis/movieProvider';
import { movieDbBaseImgUrl } from 'utils/intialEndpoint';

import './styles/index.style.scss';
import { CreditChar } from './components';
import MoreList from './MoreList';

const App = () => {
    const params = useParams();
    const [detail, setDetail] = useState({ data: {}, loading: false });
    const [casting, setCasting] = useState({ data: [], loading: false });
    const getDetail = async () => {
        setDetail(prev => ({ ...prev, loading: true }));
        try {
            const resp = await movieProvider.get(`movie/${params.id}`);
            if (resp.data) {
                setDetail(prev => ({ ...prev, data: resp.data, loading: false }));
            } else {
                throw resp;
            }
        } catch (error) {
            setDetail(prev => ({ ...prev, loading: false }));
        }
    };

    const getCasting = async () => {
        try {
          setCasting(prev => ({ ...prev, loading: true }));
          const resp = await movieProvider.get(`movie/${params.id}/credits`);
          setCasting(prev => ({ ...prev, data: resp.data.cast, loading: false }));
        } catch (error) {
            setCasting(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        getCasting();
        getDetail();
    }, []);
    return (
      <div className="movie-detail-container">
        <div className="detail-header">
          <div className="backdrop-container">
            <Image
              className="image-wrapper"
              src={`${movieDbBaseImgUrl}w1280${detail.data.backdrop_path}`}
              alt="backdroop-image"
              preview={false}
            />
            <div className="tag-type">
              {detail.data.release_date ? <Tag className="tag-value">{moment(detail.data.release_date).format('YYYY')}</Tag> : null}
            </div>
            <div className="vote-n-rating-container">
              <div className="rating-wrapper">
                <Progress
                  type="circle"
                  strokeColor="#158BBD"
                  trailColor="#32C1FF4D"
                  strokeWidth={18}
                  format={percent => `${percent / 10}`}
                  percent={detail.data.vote_average ? detail.data.vote_average * 10 : 0}
                  width={80}
                />
              </div>
              <div className="vote-count">
                <div>
                  {detail.data.vote_count ? numberAbbre(detail.data.vote_count) : 0 }
                  {' '}
                  Votes
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-content">
          <Row>
            <Col span={24} md={18}>
              <div className="detail-info">
                <div className="info-container">
                  <div className="image-wrapper">
                    <Image
                      preview={false}
                      src={`${movieDbBaseImgUrl}/w500${detail.data.poster_path}`}
                      alt="poster-path"
                    />
                  </div>
                  <div className="info">
                    <div className="info-title">
                      <div className="title-value">{detail.data.title}</div>
                    </div>
                    <div className="info-tag-wrapper">
                      <Space>
                        {detail.data.genres && detail.data.genres.map((m, idx) => {
                          return (
                            <Tag key={m.id} className="genre-tag-primary">{m.name.toUpperCase()}</Tag>
                          );
                        })}
                      </Space>
                    </div>
                    <div className="info-action">
                      <Space>
                        <Button
                          className="btn-play"
                          type="primary"
                        >
                          <Space>
                            <i className="fa-solid fa-play" />
                            Watch
                          </Space>
                        </Button>
                        <Button
                          className="btn-love"
                          shape="circle"
                          icon={<i className="fa-solid fa-heart" />}
                        />
                        <Button
                          className="btn-share"
                          shape="circle"
                          icon={<i className="fa-solid fa-share-nodes" />}
                        />
                        <Button
                          className="btn-more"
                          shape="circle"
                          icon={<i className="fa-solid fa-ellipsis" />}
                        />
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cast-n-overview">
                <Row gutter={[12, 12]}>
                  <Col span={24}>
                    <div className="overview-wrapper">
                      <div className="title">Overview</div>
                      <div className="overview-content">
                        {detail.data.overview}
                      </div>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="casting-wrapper">
                      <div className="title">Casting</div>
                      <div className="overview-content">
                        <Row>
                          {casting.data && casting.data.slice(0, 6).map((m, idx) => {
                            return (
                              <Col key={idx} span={24} md={12} lg={8}>
                                <CreditChar
                                  avatar={m.profile_path}
                                  originalName={m.original_name}
                                  characterName={m.character}
                                />
                              </Col>
                            );
                          })}
                        </Row>

                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24} md={6}>
              <MoreList />
            </Col>
          </Row>
        </div>
      </div>
    );
};

export default App;
