import Image from "next/image";
import styles from "../../styles/noFound.module.css";

export default function NoFound(props) {
  return (
    <div className={styles.container}>
      <Image src="/not-found.svg" alt="not found" width={300} height={300} />
      <p className={styles.text}>{props.text}</p>
    </div>
  );
}
