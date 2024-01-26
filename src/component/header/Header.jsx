import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { inputstyle, selectStyle } from "../../style/style";
import { tracks } from "../../data/tracks.js";
import pauseImge from "../../images/icons8-pause-20.png";
import { useDispatch } from "react-redux";
import {
  setSearchInputText,
  setSearchPanelActive,
} from "../../store/common/slice.js";
import { setUploadMusicPopap } from "../../store/common/slice.js";

const Header = () => {
  const audioRef = useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  //functions

  const playAllMusicHandler = () => {
    setIsPlay(!isPlay);
  };
  const openUploadMusicPopap = () => {
    dispatch(setUploadMusicPopap(true));
  };

  useEffect(() => {
    if (audioRef.current) {
      isPlay ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlay]);

  useEffect(() => {
    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    };

    if (audioRef.current) {
      const currentAudio = audioRef.current;
      audioRef.current.onended = handleEnded;
      return () => {
        if (currentAudio) {
          currentAudio.onended = null;
        }
      };
    }
  }, [currentIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentIndex].src;
      if (isPlay) {
        audioRef.current.play();
      }
    }
  }, [currentIndex, isPlay]);

  useEffect(() => {
    dispatch(setSearchInputText(searchText));
  }, [searchText, dispatch]);

  return (
    <div className="headerContainer" data-testid="test-1">
      <audio src={tracks[currentIndex].src} ref={audioRef}></audio>
      <div className="firstElementsContainer">
        <form>
          <button type="button" onClick={playAllMusicHandler}>
            {isPlay ? (
              <img src={pauseImge} alt="pauseImg" />
            ) : (
              <span>&#9654;</span>
            )}
            Play All
          </button>
          <select name="playAll">
            {tracks.map((track, index) => (
              <option key={index} value={track.name}>
                {track.name}
              </option>
            ))}
          </select>
        </form>
        <form>
          <button>
            <span>+</span>Add All
          </button>
          <select name="Add All">
            <option value="song"></option>
          </select>
        </form>
      </div>
      <button onClick={openUploadMusicPopap} className="uploadMusicBtn">
        Upload Music
      </button>
      <div className="secodElementsContainer">
        <form>
          <select name="Order" style={selectStyle}>
            <option value="Track Number">Track Number</option>
            <option value="Song Name">Song Name</option>
            <option value="Artist Name">Artist Name</option>
          </select>
        </form>
        <input
          type="text"
          style={inputstyle}
          placeholder="Filter"
          onChange={(e) => {
            setSearchText(e.target.value);
            dispatch(setSearchPanelActive(true));
            e.target.value === ""
              ? dispatch(setSearchPanelActive(false))
              : dispatch(setSearchPanelActive(true));
          }}
        />
      </div>
    </div>
  );
};

export default Header;
