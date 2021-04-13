import styles from "../../styles/cardMovie.module.css";
import Image from "next/image";

export function CardMovieSmall(props) {
  return (
    <a href={props.url}>
      <div className={styles.cardMovieSmallContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={
              props.Poster === "N/A" ? "/image-not-available.png" : props.Poster
            }
            className={styles.imageCardMovieSmall}
            alt={props.Poster}
            width={85}
            height="100%"
          />
        </div>
        <div className={styles.infoContainerSmall}>
          <p className={styles.titleCardMovieSmall} title={props.Title}>
            {props.Title}
          </p>
          <p>{props.Year}</p>
          <p>{props.Type}</p>
        </div>
      </div>
    </a>
  );
}

export default function CardMovie(props) {
  return (
    <div className={styles.container} data-testid="container-card-movie">
      <Image
        width={300}
        height={370}
        style={{
          cursor: "pointer",
          filter: "opacity(0.5) !important",
        }}
        className={styles.imageCard}
        src={props.Poster === "N/A" ? "/image-not-available.png" : props.Poster}
        alt={props.Title}
        onClick={props.onClick}
        loading="lazy"
        data-testid="image-card"
      />
      <p className={styles.text} data-testid="title-card">
        {props.Title} <span data-testid="year-card">{` (${props.Year})`}</span>
      </p>
      <a
        className={styles.detailsText}
        href={props.url}
        data-testid="details-anchor"
      >
        {props.textDetails}
      </a>
    </div>
  );
}
