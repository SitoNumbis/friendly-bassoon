import { memo, useEffect, useMemo, useState } from "react";

// awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faCloudSun,
  faCloudMoon,
} from "@fortawesome/free-solid-svg-icons";

// contexts
import { useLanguage } from "../../../contexts/LanguageProvider";

// components
import Loading from "../../Loading/Loading";

// styles
import styles from "./styles.module.css";

const icons = (weathercode, is_day) => {
  switch (weathercode) {
    case 0:
    case 1:
    case 2:
      if (is_day) return faCloudSun;
      return faCloudMoon;
    default: // clear sky
      if (is_day) return faSun;
      return faMoon;
  }
};

function Weather() {
  const { languageState } = useLanguage();

  const [weatherCode, setWeatherCode] = useState(0);
  const [isDay, setIsDay] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [windspeed, setWindspeed] = useState(0);

  const [loading, setLoading] = useState(true);

  async function weatherFetch() {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"
      );
      const data = await response.json();
      const { current_weather } = data;
      const { is_day, temperature, weathercode, windspeed } = current_weather;
      console.log(data);
      setIsDay(is_day);
      setTemperature(temperature);
      setWeatherCode(weathercode);
      setWindspeed(windspeed);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    weatherFetch();
  }, []);

  return (
    <article id="weather" className={`cell ${styles.main}`}>
      {loading ? <Loading /> : null}

      {!loading ? (
        <>
          <FontAwesomeIcon
            className="text-6xl text-dark-text appear"
            icon={icons(weatherCode, isDay)}
          />
          <div className="appear">
            <p className="text-dark-alt-text">{temperature} °C</p>
            <p className="text-dark-alt-text">{windspeed} Km/h</p>
          </div>
        </>
      ) : null}
    </article>
  );
}

export default Weather;
