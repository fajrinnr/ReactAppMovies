import axios from "axios";

export const GET_RECOMMENDATION = (recommendation) => ({
  type: "ADD_RECOMMENDATION",
  payload: {
    recommendation,
  },
});

export const ADD_MOVIES = (movies, page) => ({
  type: "ADD_MOVIES",
  payload: {
    page,
    movies,
  },
});

export const ADD_SERIES = (series, page) => ({
  type: "ADD_SERIES",
  payload: {
    page,
    series,
  },
});

export const ADD_EPISODES = (episodes, page) => ({
  type: "ADD_EPISODES",
  payload: {
    page,
    episodes,
  },
});

export const getRecommendation = (keyword) => {
  return (dispatch) => {
    axios
      .get(`https://www.omdbapi.com?apikey=faf7e5bb&s=${keyword}`)
      .then(({ data }) => {
        if (data.Search) {
          dispatch(GET_RECOMMENDATION(data.Search));
        } else {
          dispatch(GET_RECOMMENDATION([]));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const addMovies = (keyword, page) => {
  return (dispatch) => {
    axios
      .get(
        `https://www.omdbapi.com?apikey=faf7e5bb&s=${keyword}&type=movie&page=${page}`
      )
      .then(({ data }) => {
        if (data.Search) {
          dispatch(ADD_MOVIES(data.Search, page));
        } else {
          dispatch(ADD_MOVIES([]));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const addSeries = (keyword, page) => {
  return (dispatch) => {
    axios
      .get(
        `https://www.omdbapi.com?apikey=faf7e5bb&s=${keyword}&type=series&page=${page}`
      )
      .then(({ data }) => {
        if (data.Search) {
          dispatch(ADD_SERIES(data.Search, page));
        } else {
          dispatch(ADD_SERIES([]));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const addEpisodes = (keyword, page) => {
  return (dispatch) => {
    axios
      .get(
        `https://www.omdbapi.com?apikey=faf7e5bb&s=${keyword}&type=episode&page=${page}`
      )
      .then(({ data }) => {
        if (data.Search) {
          dispatch(ADD_EPISODES(data.Search, page));
        } else {
          dispatch(ADD_EPISODES([]));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
