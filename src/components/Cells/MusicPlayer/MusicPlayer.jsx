import { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

// components
import Loading from "../../Loading/Loading";

// contexts
import { useLanguage } from "../../../contexts/LanguageProvider";

// styles
import styles from "./styles.module.css";

// images
import noImage from "../../../assets/images/no-image.jpg";

// audio
import audio from "../../../assets/audio/lofi.mp3";

function MusicPlayer() {
  const { languageState } = useLanguage();

  const [album, setAlbum] = useState(undefined);
  const [author, setAuthor] = useState(undefined);
  const [title, setTitle] = useState(undefined);

  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const parseTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${String(minutes).length ? 0 : ""}${minutes}:${
      String(seconds).length === 1 ? 0 : ""
    }${seconds}`;
  };

  const [volume, setVolume] = useState(1);

  const [currentTimeTimeoutId, setCurrentTimeTimeoutId] = useState(null);

  const handlePause = useCallback(
    (e) => {
      const { target } = e;
      const { currentTime } = target;
      setCurrentTime(currentTime);
      setPlaying(false);
      clearInterval(currentTimeTimeoutId);
    },
    [currentTimeTimeoutId]
  );

  const [loading, setLoading] = useState(false);

  const handleInit = (e) => {
    const { target } = e;
    const { duration, currentTime, volume } = target;
    // eslint-disable-next-line no-undef
    ID3.loadTags(audio, function () {
      // eslint-disable-next-line no-undef
      var tags = ID3.getAllTags(audio);
      const { artist, title, album } = tags;
      setAuthor(artist);
      setTitle(title);
      setAlbum(album);
      setLoading(false);
    });
    setCurrentTime(currentTime);
    setDuration(duration);
  };

  const handlePlay = (e) => {
    const { target } = e;
    const { currentTime } = target;
    setCurrentTime(currentTime);
    const intervalId = setInterval(() => {
      setCurrentTime(target.currentTime);
    });
    setCurrentTimeTimeoutId(intervalId);
  };

  useEffect(() => {
    const newAudio = new Audio(audio);
    setCurrentSong(newAudio);

    newAudio.addEventListener("play", handlePlay);
    newAudio.addEventListener("loadeddata", handleInit);
    return () => {
      newAudio.removeEventListener("loadeddata", handleInit);
      newAudio.removeEventListener("play", handlePlay);
    };
  }, []);

  useEffect(() => {
    if (currentSong !== null) {
      currentSong.addEventListener("ended", handlePause);
      currentSong.addEventListener("pause", handlePause);
    }

    return () => {
      if (currentSong !== null) {
        currentSong.removeEventListener("ended", handlePause);
        currentSong.removeEventListener("pause", handlePause);
      }
    };
  }, [handlePause]);

  const localPlay = useCallback(() => {
    setPlaying(!playing);
    if (currentSong !== null) {
      if (!playing) currentSong.play();
      else currentSong.pause();
    }
  }, [currentSong, playing]);

  const handlerRange = useCallback(() => {
    const sliderEl = document.querySelector("#range2");
    const value = sliderEl.value;
    setCurrentTime(value);
    currentSong.fastSeek(value);
  }, [currentSong]);

  useEffect(() => {
    const sliderEl = document.querySelector("#range2");
    const progress = (currentTime / sliderEl.max) * 100;
    sliderEl.style.background = `linear-gradient(to right, #fbfbfb ${progress}%, #222222 ${progress}%)`;
  }, [currentTime]);

  useEffect(() => {
    const sliderEl = document.querySelector("#range2");
    sliderEl.addEventListener("input", handlerRange);
    return () => {
      sliderEl.removeEventListener("input", handlerRange);
    };
  }, [handlerRange]);

  return (
    <article id="music-player" className={`cell ${styles.main} pr-3`}>
      {loading ? <Loading /> : null}
      {!loading ? (
        <>
          <img
            src={noImage}
            className="rounded-3xl w-[250px] h-full object-cover object-center"
            alt={`${author} - ${title}`}
          />
          <div className="flex flex-col h-full w-full items-start justify-center gap-2 rounded">
            <div>
              <span className="text-dark-alt-text text-sm">
                {languageState.texts.musicPlayer.album}
              </span>
              <span className="ml-2">
                {album || languageState.texts.musicPlayer.noAlbum}
              </span>
            </div>
            <div>
              <h3 className="text-xl">
                {author || languageState.texts.musicPlayer.noAuthor} -{" "}
                {title || languageState.texts.musicPlayer.noTitle}
              </h3>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex w-full items-center justify-between">
                <span className="text-sm text-dark-alt-text">
                  {parseTime(currentTime)}
                </span>
                <span className="text-sm text-dark-alt-text">
                  {parseTime(duration)}
                </span>
              </div>
              <div className="range">
                <input
                  id="range2"
                  type="range"
                  value={currentTime}
                  max={duration}
                  min={0}
                  onChange={handlerRange}
                />
              </div>
            </div>
            <div className="flex w-full justify-between items-center mt-1">
              <button
                className={`button ${repeat ? "text-primary" : ""}`}
                onClick={() => setRepeat(!repeat)}
              >
                <FontAwesomeIcon icon={faRepeat} />
              </button>
              <div className="flex justify-between items-center gap-2">
                <button className="button">
                  <FontAwesomeIcon icon={faBackward} />
                </button>
                <button
                  onClick={localPlay}
                  className="button bg-dark-alt-text hover:bg-dark-text text-dark-bg w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={playing ? faPause : faPlay} />
                </button>
                <button className="button">
                  <FontAwesomeIcon icon={faForward} />
                </button>
              </div>
              <button
                className={`button ${shuffle ? "text-primary" : ""}`}
                onClick={() => setShuffle(!shuffle)}
              >
                <FontAwesomeIcon icon={faShuffle} />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </article>
  );
}

export default MusicPlayer;
