import MetaTags from "./metaTags";
import Header from "../components/header";

export default function MainLayout(props) {
  return (
    <>
      <Header {...props.searchProps} />
      <MetaTags currentURL={props.currentUrl} />
      <div style={{ marginTop: "100px" }}>{props.children}</div>
    </>
  );
}
