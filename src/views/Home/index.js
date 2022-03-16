import React from 'react';
import movieProvider from 'apis/movieProvider';
import { Carousel, Image, message, Rate, Typography } from 'antd';
import './styles/index.style.scss';

const App = () => {
  const [discover, setDiscover] = React.useState({
    dataSource: [],
    pagination: {
      current: 1,
      total: 0,
      pageSize: 10
    }
  });
  const getMovie = async () => {
    try {
      const response = await movieProvider.get('discover/movie');
      if (response.data) {
        const { results, total_results } = response.data;
        const pagination = {
          ...discover.pagination,
          total: total_results
        };
        setDiscover({ dataSource: results, pagination });
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
      <div className="discover-container">
        <Typography.Title level={2}>Discover</Typography.Title>
        <Carousel
          className="discover-caraousel"
          infinite
          slidesToShow={3}
          slidesToScroll={2}
          swipeToSlide
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]}
        >
          {discover.dataSource && discover.dataSource.length > 0 && Array(8).fill("").map((__, idx) => {
            const imgUrl = movieProvider.getImage(discover.dataSource[idx].backdrop_path, 'w500');
            return (
              <div className="card-item-discover" key={discover.dataSource[idx].id}>
                <Image src={imgUrl} preview={false} />
                <div className="info-container">
                  <div className="info-wrapper">
                    <Typography.Title level={5}>{discover.dataSource[idx].title}</Typography.Title>
                    <Typography.Text>{discover.dataSource[idx].release_date}</Typography.Text>
                    <div className="rating-wrapper">
                      <Rate count={1} value={1} />
                      {" "}
                      {discover.dataSource[idx].vote_average}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="popular-container" />
      <div className="toprated-container" />
    </div>
  );
};

export default App;
