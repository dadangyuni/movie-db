import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import pathName from 'routes/pathName';
import { movieProvider } from 'utils/request';
import './styles/index.style.scss';

const Genre = () => {
  const navigate = useNavigate();
  const [series, setSeries] = useState({
    loading: false,
    genres: []
  });
  const [movie, setMovie] = useState({
    loading: false,
    genres: []
  });

  const initialize = async () => {
      setSeries(prev => ({ ...prev, loading: true }));
      setMovie(prev => ({ ...prev, loading: true }));
      return Promise.all([
        movieProvider.get(`genre/movie/list`),
        movieProvider.get(`genre/tv/list`),
      ].map(p => p.then(res => res.data).catch(err => {})))
      .then(([movieResp, tvResp]) => {
        setSeries(prev => ({ ...prev, loading: false, genres: tvResp.genres }));
        setMovie(prev => ({ ...prev, loading: false, genres: movieResp.genres }));
      }).catch(error => {
        setSeries(prev => ({ ...prev, loading: false }));
        setMovie(prev => ({ ...prev, loading: false }));
      });
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="genre-page">
      <div className="movie-genre">
        <h1 className="title right-border">Movie</h1>
        <div className="content">
          {movie.genres.map((m, idx) => {
            return (
              <Link
                state={{
                  name: m.name
                }}
                className="card-genre-link"
                key={idx}
                to={pathName.genre.movieByGenre(m.id)}
              >
                <div
                  className="card-genre"
                  style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://picsum.photos/id/${idx + 1}/200/300)`
                  }}
                >
                  {m.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="series-genre">
        <h1 className="title right-border">Series</h1>
        <div className="content">
          {series.genres.map((m, idx) => {
              return (
                <Link
                  state={{
                    name: m.name
                  }}
                  key={idx}
                  className="card-genre-link"
                  to={pathName.genre.seriesByGenre(m.id)}
                >
                  <div
                    className="card-genre"
                    style={{
                      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://picsum.photos/id/${idx + 1}/200/300)`
                    }}
                  >
                    {m.name}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Genre;
