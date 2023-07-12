import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// contexts
import { useLanguage } from "../../../contexts/LanguageProvider";

// styles
import styles from "./styles.module.css";
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

// images
import noImage from "../../../assets/images/no-image.jpg";

// audio
import audio from "../../../assets/audio/lofi.mp3";
import { useMemo } from "react";

function MusicPlayer() {
  const { languageState } = useLanguage();

  const [album, setAlbum] = useState("no name");
  const [author, setAuthor] = useState("unknown");
  const [title, setTitle] = useState("no title");

  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const parseTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds}`;
  };

  const [volume, setVolume] = useState(1);

  const handlePause = (e) => {
    const { target } = e;
    const { currentTime } = target;
    setCurrentTime(currentTime);
    setPlaying(false);
  };

  const [currentTimeTimeoutId, setCurrentTimeTimeoutId] = useState(null);

  const handleInit = (e) => {
    const { target } = e;
    const { duration, currentTime, volume } = target;
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
    console.log(intervalId);
  };

  useEffect(() => {
    const newAudio = new Audio(audio);
    setCurrentSong(newAudio);
    newAudio.addEventListener("ended", handlePause);
    newAudio.addEventListener("play", handlePlay);
    newAudio.addEventListener("pause", handlePause);
    newAudio.addEventListener("loadeddata", handleInit);
    return () => {
      newAudio.removeEventListener("ended", handlePause);
      newAudio.removeEventListener("loadeddata", handleInit);
      newAudio.removeEventListener("play", handlePlay);
      newAudio.removeEventListener("pause", handlePause);
    };
  }, []);

  const localPlay = useCallback(() => {
    setPlaying(!playing);
    if (currentSong !== null) {
      if (!playing) currentSong.play();
      else currentSong.pause();
    }
  }, [currentSong, playing]);

  return (
    <article id="music-player" className={`cell ${styles.main}`}>
      <img
        src={noImage}
        className="rounded-s-3xl w-[150px] h-full object-cover object-center"
        alt={`${author} - ${title}`}
      />
      <div className="flex flex-col h-full w-full items-start justify-center gap-2 rounded">
        <div>
          <span className="text-dark-alt-text text-sm">
            {languageState.texts.musicPlayer.album}
          </span>
          <span className="ml-2">{album}</span>
        </div>
        <div>
          <h3 className="text-xl">
            {author} - {title}
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
        </div>
        <div className="flex w-full justify-between items-center pr-4 mt-1">
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
    </article>
  );
}

export default MusicPlayer;
