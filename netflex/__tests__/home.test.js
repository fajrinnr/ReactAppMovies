import React from "react"; //
import { render, fireEvent, wai } from "@testing-library/react"; //
import { Provider } from "react-redux"; //
// import { createMemoryHistory } from "history"; //
import axios from "axios";
import store from "../redux/store"; //
import Home from "../pages/[[...app]]";

describe("Test Movie Details Page", () => {
  let movieData;
  let seriesData;
  let episodeData;
  beforeAll(async () => {
    movieData = await axios
      .get("http://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=movie")
      .then(({ data }) => {
        return data;
      });
    seriesData = await axios
      .get("http://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=series")
      .then(({ data }) => {
        return data;
      });
    episodeData = await axios
      .get("http://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=episode")
      .then(({ data }) => {
        return data;
      });
  });

  test("Successfully Load Details Movie Page", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Home
          listSeries={seriesData}
          listEpisodes={episodeData}
          listMovie={movieData}
        />
      </Provider>
    );

    const header = getByTestId("header");
    // const movieDetails = getByTestId("container-details");
    const searchBar = getByTestId("search-bar");
    const pillsType = getByTestId("container-pill-type");

    expect(header).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(pillsType).toBeInTheDocument();
    // expect(movieDetails).toBeInTheDocument();
  });

  test("Successfully Click Pill to see another type of movie", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Home
          listSeries={seriesData}
          listEpisodes={episodeData}
          listMovie={movieData}
        />
      </Provider>
    );

    await fireEvent.click(getByTestId("pill-series"));
    expect(getByTestId("list-series")).toBeInTheDocument();

    await fireEvent.click(getByTestId("pill-episode"));
    expect(getByTestId("list-episode")).toBeInTheDocument();

    await fireEvent.click(getByTestId("pill-movie"));
    expect(getByTestId("list-movie")).toBeInTheDocument();
  });
});
