import styles from "../../styles/header.module.css";
import SearchBar from "../components/searchBar";

export default function Header(props) {
  return (
    <div className={styles.container} data-testid="header">
      <div className={styles.textContainer}>
        <p className={styles.netflexText} data-testid="title-header">
          NETFLEX
        </p>
        <a
          className={styles.movieListText}
          href="/"
          data-testid="movie-list-anchor"
        >
          Movie List
        </a>
      </div>
      <SearchBar {...props} />
    </div>
  );
}
