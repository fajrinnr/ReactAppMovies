import React from "react"; //
import { render, screen, fireEvent } from "@testing-library/react"; //
import axios from "axios";
import { createMemoryHistory } from "history";
import CardMovie from "../src/components/cardMovie";

jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

describe("Test Movie Details Page", () => {
  let movieData;
  beforeAll(async () => {
    movieData = await axios
      .get("http://www.omdbapi.com?apikey=faf7e5bb&i=tt4154664")
      .then(({ data }) => {
        return data;
      });
  });

  test("Successfully Load Card Movie Component", () => {
    const { getByTestId } = render(
      <CardMovie {...movieData} textDetails="Details" />
    );

    const cardMovieContainer = getByTestId("container-card-movie");
    const imageCard = screen.getByAltText(/Captain Marvel/i);
    const titleCard = getByTestId("title-card");
    const yearCard = getByTestId("year-card");
    const detailsAnchor = getByTestId("details-anchor");
    expect(cardMovieContainer).toBeInTheDocument();
    expect(imageCard).toBeInTheDocument();
    expect(titleCard).toBeInTheDocument();
    expect(titleCard.textContent).toEqual("Captain Marvel  (2019)");
    expect(yearCard.textContent).toEqual(" (2019)");
    expect(detailsAnchor.textContent).toEqual("Details");
  });

  test("Successfully Load Card Movie Component", async () => {
    const history = createMemoryHistory();
    const { getByTestId } = await render(
      <CardMovie
        {...movieData}
        textDetails="Details"
        url={`/details/${movieData.imdbID}`}
      />
    );

    const detailsAnchor = getByTestId("details-anchor");
    fireEvent.click(detailsAnchor);
    expect(detailsAnchor.href).toEqual("http://localhost/details/tt4154664");
  });
});
