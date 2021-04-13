import styles from "../../styles/searchBar.module.css";
import Image from "next/image";
import { CardMovieSmall } from "../../src/components/cardMovie";

export default function SearchBar(props) {
  return (
    <div data-testid="search-bar">
      <form method="POST" action={props?.url} className={styles.container}>
        <Image
          src="/magnifying-glass.svg"
          width={25}
          height={25}
          className={styles.imageMagnify}
          alt="search"
        />
        <label htmlFor="search" />
        <input
          data-testid="search-input"
          id="search"
          type="text"
          onChange={props?.onChange}
          onFocus={props?.onFocus}
          onBlur={props?.onBlur}
          autoComplete="off"
          placeholder={props?.placeHolder}
        />
        <a
          className={styles.submitText}
          href={props?.url}
          data-testid="submit-anchor"
        >
          {props?.submitText}
        </a>
      </form>
      {props?.recommendation?.length > 0 && (
        <div className={styles.searchResult}>
          <div className={styles.contentSearchResult}>
            {props?.recommendation.map((movie, i) => {
              return (
                <CardMovieSmall {...movie} url={`/details/${movie.imdbID}`} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
