import styles from "../styles/searchBar.module.css";
import axios from "axios";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Home({ data }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.searchBox}>
            <img
              src="/magnifying-glass.svg"
              width={20}
              style={{ margin: "3px", filter: "opacity(0.3)" }}
            />
            <input type="text" />
          </div>
          <div>
            <p style={{ margin: "0 0 0 15px" }}>Submit</p>
          </div>
        </div>
      </div>
      <Carousel>
        <div
          style={{
            height: "45vh",
            backgroundImage: `url(${data.Search[0].Poster})`,
          }}
        >
          {data.Search[0].Title}
        </div>
        <div
          style={{
            height: "45vh",
            backgroundImage: `url(${data.Search[1].Poster})`,
          }}
        >
          {data.Search[1].Title}
        </div>
        <div
          style={{
            height: "45vh",
            backgroundImage: `url(${data.Search[2].Poster})`,
          }}
        >
          {data.Search[2].Title}
        </div>
      </Carousel>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios
    .get("http://www.omdbapi.com?apikey=faf7e5bb&s=marvel&type=movie")
    .then(({ data }) => {
      return data;
    });

  return { props: { data: res } };
}
