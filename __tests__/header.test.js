import React from "react"; //
import { render, fireEvent } from "@testing-library/react"; //
import { createMemoryHistory } from "history";
import Header from "../src/components/header";

describe("Test Movie Details Page", () => {
  test("Successfully Load Header Component", () => {
    const { getByTestId } = render(<Header />);
    const containerHeader = getByTestId("header");
    const headerTitle = getByTestId("title-header");
    const movieListAnchor = getByTestId("movie-list-anchor");
    const searchBar = getByTestId("search-bar");

    expect(containerHeader).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
    expect(movieListAnchor).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
  });

  test("Successfully Redirect Home if Movie List Anchor is clicked", () => {
    const { getByTestId } = render(<Header />);
    const history = createMemoryHistory();
    const movieListAnchor = getByTestId("movie-list-anchor");

    fireEvent.click(movieListAnchor);
    expect(history.location.pathname).toBe("/");
  });
});
