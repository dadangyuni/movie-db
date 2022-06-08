import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams } from 'react-router';
import movieProvider from 'apis/movieProvider';
import { CardMore } from './components';

const MoreList = () => {
    const params = useParams();
    const [similar, setSimilar] = useState({ data: [], loading: false });
    const getSimilar = async () => {
        try {
            setSimilar(prev => ({ ...prev, loading: true }));
            const resp = await movieProvider.get(`movie/${params.id}/similar`);
            if (resp.data) {
                setSimilar(prev => ({ ...prev, data: resp.data.results, loading: false }));
            } else {
                throw resp;
            }
        } catch (error) {
            setSimilar(prev => ({ ...prev, loading: false }));
        }
    };
    useEffect(() => {
        getSimilar();
    }, []);
    return (
      <div className="more-list-container">
        <div className="title-more">More like this</div>
        <div className="content-list">
          {similar.data && similar.data.slice(0, 7).map((m, idx) => {
                return (
                  <CardMore
                    key={idx}
                    title={m.title}
                    subtitle={m.release_date ? moment(m.release_date).format('YYYY') : null}
                    poster={m.poster_path}
                    vote={m.vote_count}
                    rating={m.vote_average}
                  />
                );
            })}
        </div>
      </div>
    );
};

export default MoreList;
