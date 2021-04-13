import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import MainLayout from "../src/layouts/mainLayout";
import {
  addEpisodes,
  addMovies,
  addSeries,
  getRecommendation,
} from "../redux/actions/action";
import { countTotalPage } from "../src/helpers/pagination";
import Pill from "../src/components/pill";
import CardMovie from "../src/components/cardMovie";
import styles from "../styles/home.module.css";
import NoFound from "../src/components/noFound";

export default function Home({ listMovie, listSeries, listEpisodes, query }) {
  const recommendation = useSelector((state) => state.recommendations);
  const listMovies = useSelector((state) => state.movies);
  const seriesList = useSelector((state) => state.series);
  const episodeList = useSelector((state) => state.episodes);
  const [keyword, setKeyword] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [stateButton, setStateButton] = useState({
    movie: true,
    series: false,
    episode: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addMovies(query, listMovies.page));
    dispatch(addSeries(query, seriesList.page));
    dispatch(addEpisodes(query, episodeList.page));
    setCurrentUrl(window.location.href);
  }, []);
  useEffect(async () => {
    dispatch(getRecommendation(keyword));
  }, [keyword]);

  useEffect(() => {
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (stateButton.movie) {
          if (listMovies.page <= countTotalPage(listMovie.totalResults)) {
            dispatch(addMovies(query, (listMovies.page += 1)));
          }
        } else if (stateButton.series) {
          if (seriesList.page <= countTotalPage(listSeries.totalResults)) {
            dispatch(addSeries(query, (seriesList.page += 1)));
          }
        } else if (stateButton.episode) {
          if (episodeList.page <= countTotalPage(listEpisodes.totalResults)) {
            dispatch(addEpisodes(query, (episodeList.page += 1)));
          }
        }
      }
    };
  }, [stateButton]);
  return (
    <MainLayout
      searchProps={{
        onChange: (e) => setKeyword(e.target.value),
        onBlur: () => {
          setTimeout(() => {
            setOnFocus(false);
          }, 300);
        },
        onFocus: () => setOnFocus(true),
        url: `/?s=${keyword}`,
        submitText: "Submit",
        placeHolder: "Search your favorite movie",
        recommendation: recommendation,
        onFocusState: onFocus,
      }}
      currentUrl={currentUrl}
    >
      <h1 style={{ fontSize: 0 }}>
        Netflex By Fajrin, find your favorite movie
      </h1>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        data-testid="container-pill-type"
      >
        <Pill
          onClick={() =>
            setStateButton({
              movie: true,
              series: false,
              episode: false,
            })
          }
          customStyle={{
            filter: !stateButton.movie ? "opacity(0.5)" : "none",
          }}
          text="Movie"
          data-testid="pill-movie"
        />
        <Pill
          onClick={() =>
            setStateButton({
              movie: false,
              series: true,
              episode: false,
            })
          }
          customStyle={{
            filter: !stateButton.series ? "opacity(0.5)" : "none",
          }}
          text="Series"
          data-testid="pill-series"
        />
        <Pill
          onClick={() =>
            setStateButton({
              movie: false,
              series: false,
              episode: true,
            })
          }
          customStyle={{
            filter: !stateButton.episode ? "opacity(0.5)" : "none",
          }}
          text="Episodes"
          data-testid="pill-episode"
        />
      </div>
      <div>
        {stateButton.movie && (
          <div className={styles.resultMovie} data-testid="list-movie">
            {listMovies.data.length === 0 ? (
              <NoFound
                text="We cannot find movie you are searching for, maybe a
              little spelling mistake?"
              />
            ) : (
              listMovies.data?.map((movie, i) => {
                return (
                  <CardMovie
                    {...movie}
                    onClick={() =>
                      movie.Poster !== "N/A" &&
                      Swal.fire({
                        title: movie.Title,
                        imageUrl: movie.Poster,
                        imageWidth: 400,
                        imageHeight: 500,
                        imageAlt: movie.Title,
                      })
                    }
                    url={`/details/${movie.imdbID}`}
                    textDetails="Click for Details"
                  />
                );
              })
            )}
          </div>
        )}
        {stateButton.series && (
          <div className={styles.resultMovie} data-testid="list-series">
            {seriesList.data.length === 0 ? (
              <NoFound
                text="We cannot find series movie you are searching for, maybe a
              little spelling mistake?"
              />
            ) : (
              seriesList.data?.map((movie, i) => {
                return (
                  <CardMovie
                    {...movie}
                    onClick={() =>
                      Swal.fire({
                        title: movie.Title,
                        imageUrl: movie.Poster,
                        imageWidth: 400,
                        imageHeight: 500,
                        imageAlt: movie.Title,
                      })
                    }
                    url={`/details/${movie.imdbID}`}
                    textDetails="Click for Details"
                  />
                );
              })
            )}
          </div>
        )}
        {stateButton.episode && (
          <div className={styles.resultMovie} data-testid="list-episode">
            {episodeList.data.length === 0 ? (
              <NoFound
                text="We cannot find episode movie you are searching for, maybe a
              little spelling mistake?"
              />
            ) : (
              episodeList.data?.map((movie, i) => {
                return (
                  <CardMovie
                    {...movie}
                    onClick={() =>
                      Swal.fire({
                        title: movie.Title,
                        imageUrl: movie.Poster,
                        imageWidth: 400,
                        imageHeight: 500,
                        imageAlt: movie.Title,
                      })
                    }
                    url={`/details/${movie.imdbID}`}
                    textDetails="Click for Details"
                  />
                );
              })
            )}
          </div>
        )}
      </div>
    </MainLayout>
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
      .get(
        `https://www.omdbapi.com?apikey=faf7e5bb&s=${ctx.query.s}&type=movie`
      )
      .then(({ data }) => {
        return data;
      });
    res.series = await axios
      .get(
        `https://www.omdbapi.com?apikey=faf7e5bb&s=${ctx.query.s}&type=series`
      )
      .then(({ data }) => {
        return data;
      });
    res.episode = await axios
      .get(
        `https://www.omdbapi.com?apikey=faf7e5bb&s=${ctx.query.s}&type=episode`
      )
      .then(({ data }) => {
        return data;
      });
  } else {
    res.movies = await axios
      .get(`https://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=movie`)
      .then(({ data }) => {
        return data;
      });
    res.series = await axios
      .get(`https://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=series`)
      .then(({ data }) => {
        return data;
      });
    res.episode = await axios
      .get(`https://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=episode`)
      .then(({ data }) => {
        return data;
      });
  }
  return {
    props: {
      listMovie: res.movies,
      listSeries: res.series,
      listEpisodes: res.episode,
      query: ctx.query.s ? ctx.query.s : "marvel",
    },
  };
}
