import MetaTags from "./metaTags";
import MenuBar from "../components/menuBar";
import Header, { HeaderPokemonDetail } from "../components/header";
import { goBack } from "../helpers/route";
import { formatIdNumber } from "../helpers/formatter";

export default function MainLayout(props) {
  return (
    <div>
      <MetaTags currentURL={props.currentURL} />
      {!props?.noHeader ? (
        <Header />
      ) : (
        <HeaderPokemonDetail
          id={formatIdNumber(props.pokemonId)}
          onClick={() => {
            goBack();
          }}
        />
      )}
      {props.children}
      <MenuBar />
    </div>
  );
}
