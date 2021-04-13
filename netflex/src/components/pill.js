import styles from "../../styles/pill.module.css";

export default function Pill(props) {
  return (
    <p
      className={styles.pill}
      onClick={props.onClick}
      style={props.customStyle}
      data-testid={props["data-testid"]}
    >
      {props.text}
    </p>
  );
}
