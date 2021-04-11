import styles from "../styles/searchBar.module.css";
import axios from "axios";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovies, ADD_MOVIES, getRecommendation } from "../redux/actions/recommendationAction";
import { route } from "../src/helpers/route";
import { countTotalPage } from "../src/helpers/pagination";

export default function Home({ listMovie, listSeries, listEpisodes, query }) {
  const recommendation = useSelector(state => state.recommendations)
  const listMovies = useSelector(state => state.movies)
  const [keyword, setKeyword] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addMovies(query, listMovies.page))
  }, [])
  useEffect(async () => {
    dispatch(getRecommendation(keyword))
  }, [keyword]);
  console.log(listMovies, "<<<<<<");
  const handleScroll = (e) => {
    const target = e.target;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if (listMovies.page <= countTotalPage(listMovie.totalResults)) {
        console.log(listMovies.page, "MASUKK");
        dispatch(addMovies(query, listMovies.page+=1))
      }
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <form method="POST" action={`/?s=${keyword}`}>
            <div className={styles.searchBox}>
              <img
                src="/magnifying-glass.svg"
                width={20}
                style={{
                  margin: "3px",
                  filter: "opacity(0.3)",
                }}
              />
              <label htmlFor="search"/>
              <input
                id="search"
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
              />
            </div>
            <div>
              <p style={{ margin: "0 0 0 15px" }}>Submit</p>
            </div>
          </form>
        </div>
      </div>
      {recommendation.length > 0 && onFocus && (
        <div className={styles.container} style={{ padding: "0" }}>
          <div
            style={{
              paddingTop: "20px",
              borderRadius: "10px",
              display: "flex",
            }}
            className={styles.searchResult}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "30vh",
                overflow: "auto",
                width: "100%",
              }}
            >
              {recommendation.map((movie, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      background: "#454f63",
                      borderRadius: "15px",
                    }}
                  >
                    <img
                      src={movie.Poster}
                      style={{ width: "20%", borderRadius: "15px 0 0 15px" }}
                    />

                    <div
                      style={{
                        marginLeft: "20px",
                        /* padding: 5px; */
                      }}
                    >
                      <p style={{ margin: 0, color: "white" }}>{movie.Title}</p>
                      <p style={{ margin: 0, color: "white" }}>{movie.Year}</p>
                      <p style={{ margin: 0, color: "white" }}>{movie.Type}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Carousel showThumbs={false} infiniteLoop={true} showStatus={false} showArrows={false} swipeable={true}>
        <div
          style={{
            height: "45vh",
            backgroundImage: `url(${listMovie.Search[0].Poster})`,
          }}
        >
          {listMovie.Search[0].Title}
        </div>
        <div
          style={{
            height: "45vh",
            backgroundImage: `url(${listMovie.Search[1].Poster})`,
          }}
        >
          {listMovie.Search[1].Title}
        </div>
        <div
          style={{
            height: "45vh",
            backgroundImage: `url(${listMovie.Search[2].Poster})`,
          }}
        >
          {listMovie.Search[2].Title}
        </div>
      </Carousel>
      <div style={{ marginBottom: "20px" }}>
        <div
          className={styles.resultMovie}
          onScroll={handleScroll}
        >
          {listMovies.data?.map((movie, i) => {
            return <div key={i}>
              <img src={movie.Poster}/>
              <p>{movie.Title}</p>
              <p>{movie.Year}</p>
              <p>{movie.Type}</p>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  let res = {
    movies: null,
    series: null,
    episode: null,
  };
  if (ctx.query.s) {
    res.movies = await axios
      .get(`http://www.omdbapi.com?apikey=faf7e5bb&s=${ctx.query.s}&type=movie`)
      .then(({ data }) => {
        return data;
      });
    res.series = await axios
      .get(
        `http://www.omdbapi.com?apikey=faf7e5bb&s=${ctx.query.s}&type=series`
      )
      .then(({ data }) => {
        return data;
      });
    res.episode = await axios
      .get(
        `http://www.omdbapi.com?apikey=faf7e5bb&s=${ctx.query.s}&type=episode`
      )
      .then(({ data }) => {
        return data;
      });
  } else {
    res.movies = await axios
      .get(`http://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=movie`)
      .then(({ data }) => {
        return data;
      });
    res.series = await axios
      .get(`http://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=series`)
      .then(({ data }) => {
        return data;
      });
    res.episode = await axios
      .get(`http://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=episode`)
      .then(({ data }) => {
        return data;
      });
  }
  return {
    props: {
      listMovie: res.movies,
      listSeries: res.series,
      listEpisodes: res.episode,
      query: ctx.query.s ? ctx.query.s : "marvel"
    },
  };
}
