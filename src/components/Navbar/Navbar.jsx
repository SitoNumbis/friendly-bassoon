import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroadcastTower,
  faChevronDown,
  faEdit,
  faGear,
  faMapPin,
  faMicrophone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

// components
import SimpleInput from "../SimpleInput/SimpleInput";

// styles
import styles from "./styles.module.css";

// images
import noPhoto from "../../assets/images/no-photo.webp";
import noProduct from "../../assets/images/no-product.jpg";
import { faSpeakerDeck } from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  const { languageState } = useLanguage();

  const [user, setUser] = useState("Sito Numbis");

  const [area, setArea] = useState("My Area");
  const [state, setState] = useState("State");
  const [city, setCity] = useState("City");

  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setSearching(true);
  };

  const [searchingByAudio, setSearchingByAudio] = useState(false);
  const [searching, setSearching] = useState(false);

  return (
    <header className={`${styles.main} bg-dark-alt-bg`}>
      <div className="flex gap-3 items-center justify-start">
        <img
          className="h-[100%] w-[100px] rounded-3xl"
          src={noProduct}
          alt={`${area}-photo`}
        />
        <div className="flex flex-col">
          <h3>
            {area}{" "}
            <button className="button ml-2">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </h3>
          <p className="text-dark-alt-text text-sm">
            <FontAwesomeIcon icon={faMapPin} className="text-primary" /> {state}{" "}
            <span className="text-dark-text">{city}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SimpleInput
          className="p-3"
          leftIcon={
            <>
              {searching ? (
                <div className="aGrow flex items-center justify-center w-8 h-8 bg-primary rounded-full absolute top-[50%] -translate-y-[50%] left-1">
                  <FontAwesomeIcon
                    className="text-dark-text"
                    icon={searchingByAudio ? faSpeakerDeck : faSearch}
                  />
                </div>
              ) : null}
            </>
          }
          inputProps={{
            value: searchInput,
            onChange: handleSearch,
            type: "search",
            className: "bg-dark-bg rounded-3xl pl-10 py-2",
          }}
          rightIcon={
            <button className="absolute top-[50%] right-1 -translate-y-[50%] button w-8 h-8">
              <FontAwesomeIcon
                icon={searchingByAudio ? faMicrophone : faSearch}
              />
            </button>
          }
        />
        <button className="button text-dark-alt-text w-5 h-5 flex items-center justify-center">
          <FontAwesomeIcon icon={faBroadcastTower} />
        </button>
        <button className="button text-dark-alt-text w-5 h-5 flex items-center justify-center">
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={noPhoto}
          alt={user}
          className="w-[40px] h-[40px] rounded-full"
        />
        <p className="text-dark-alt-text">
          {languageState.texts.navbar.greets},{" "}
          <span className="text-dark-text">{user}</span>
        </p>
        <button className="button text-dark-alt-text text-sm">
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
