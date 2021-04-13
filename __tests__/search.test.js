import React from "react"; //
import { render, fireEvent, waitFor } from "@testing-library/react"; //
import axios from "axios";
import { createMemoryHistory } from "history";
import SearchBar from "../src/components/searchBar";

describe("Test Movie Details Page", () => {
  let movieData;
  beforeAll(async () => {
    movieData = axios
      .get("http://www.omdbapi.com?apikey=faf7e5bb&i=tt4154664")
      .then(({ data }) => {
        return data;
      });
  });

  test("Successfully Load Search Component", () => {
    const { getByTestId } = render(<SearchBar />);
    const searchBar = getByTestId("search-bar");

    expect(searchBar).toBeInTheDocument();
  });

  test("Successfully got query when value on input changed", async () => {
    const { getByTestId } = render(
      <SearchBar url="/?s=Batman" recommendation={["tets", "test"]} />
    );

    const searchInput = getByTestId("search-input");
    const submitAnchor = getByTestId("submit-anchor");
    await fireEvent.change(searchInput, {
      target: { value: "Batman" },
    });

    expect(submitAnchor.href).toBe("http://localhost/?s=Batman");
  });
});
