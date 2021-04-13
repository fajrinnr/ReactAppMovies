import React from "react"; //
import { render, fireEvent, wai } from "@testing-library/react"; //
import { Provider } from "react-redux"; //
// import { createMemoryHistory } from "history"; //
import axios from "axios";
import store from "../redux/store"; //
import MovieDetails from "../pages/details/[id]";

describe("Test Movie Details Page", () => {
  let movieData;
  beforeAll(async () => {
    movieData = axios
      .get("https://www.omdbapi.com?apikey=faf7e5bb&i=tt4154664")
      .then(({ data }) => {
        return data;
      });
  });

  test("Successfully Load Details Movie Page", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MovieDetails movie={movieData} />
      </Provider>
    );

    const header = getByTestId("header");
    const movieDetails = getByTestId("container-details");
    const searchBar = getByTestId("search-bar");

    expect(header).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(movieDetails).toBeInTheDocument();
  });
});
