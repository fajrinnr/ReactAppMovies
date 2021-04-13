import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getRecommendation } from "../../redux/actions/action";
import MainLayout from "../../src/layouts/mainLayout";
import styles from "../../styles/details.module.css";

export default function Details({ movie }) {
  const recommendation = useSelector((state) => state.recommendations);
  const [keyword, setKeyword] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(getRecommendation(keyword));
  }, [keyword]);
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
    >
      <div className={styles.container} data-testid="container-details">
        <div className={styles.topContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={
                movie.Poster === "N/A"
                  ? "/image-not-available.png"
                  : movie.Poster
              }
              alt={movie.Title}
              width={300}
              height={444}
              loading="lazy"
            />
            <div className={styles.starRatingContainer}>
              <Image src="/star.svg" alt="star" width={30} height={30} />
              <div>
                <span className={styles.textStarRating}>
                  {movie.imdbRating}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h1>{movie.Title}</h1>
            <div className={styles.infoMovie}>
              <p>{movie.Rated}</p>
              <span>|</span>
              <p>{movie.Runtime}</p>
              <span>|</span>
              <p>{movie.Genre}</p>
              <span>|</span>
              <p>{`${movie.Released} (${movie.Country})`}</p>
            </div>
            <h2>Ratings</h2>
            {movie.Ratings?.map((rating, i) => {
              return (
                <div className={styles.containerRating} key={i}>
                  <p>
                    {`${rating.Source}:`}{" "}
                    <span
                      className={styles.valueRating}
                      style={{
                        backgroundColor:
                          rating.Source === "Rotten Tomatoes"
                            ? "#FA320A"
                            : "#F5C518",
                      }}
                    >
                      {rating.Value}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ width: "90%" }}>
          <h2>Plot</h2>
          <p>{movie.Plot}</p>
          <h2>{`People Behind ${movie.Title} movie`}</h2>
          <div className={styles.gridWrapper}>
            <p>Director:</p>
            <a
              href={
                movie.Director !== "N/A" &&
                `https://www.google.com/search?q=${movie.Director}`
              }
              target="_blank"
            >
              {movie.Director}
            </a>
          </div>
          <div className={styles.gridWrapper}>
            <p>Writers:</p>
            <p>
              {movie.Writer?.split(",").map((writer, i) => {
                return (
                  <span key={i}>
                    <a
                      href={
                        movie.Director !== "N/A" &&
                        `https://www.google.com/search?q=${writer}`
                      }
                      target="_blank"
                    >
                      {writer}
                    </a>
                    {i !== movie.Writer.split(",").length - 1 && <span>,</span>}
                  </span>
                );
              })}
            </p>
          </div>
          <div className={styles.gridWrapper}>
            <p>Stars: </p>
            <p>
              {movie.Actors?.split(",").map((actor, i) => {
                return (
                  <span key={i}>
                    <a
                      href={
                        actor !== "N/A" &&
                        `https://www.google.com/search?q=${actor}`
                      }
                      target="_blank"
                    >
                      {actor}
                    </a>
                    {i !== movie.Actors.split(",").length - 1 && <span>,</span>}
                  </span>
                );
              })}
            </p>
          </div>
          {movie.BoxOffice && (
            <>
              <h2>Box Office</h2>
              <h3>{`${movie.BoxOffice} (Gross USA)`}</h3>
            </>
          )}
          <h2>Company</h2>
          <p>{`Production: ${movie.Production}`}</p>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const movie = await axios
    .get(`https://www.omdbapi.com?apikey=faf7e5bb&i=${ctx.params.id}`)
    .then(({ data }) => {
      return data;
    });

  return {
    props: {
      movie,
    },
  };
}
