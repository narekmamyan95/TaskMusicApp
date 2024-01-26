import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import dotImge from "../../images/icons8-braille-20.png";
import pauseImge from "../../images/icons8-pause-20.png";
import playImge from "../../images/icons8-play-20.png";
import { tracks } from "../../data/tracks.js";
import likeIcon from "../../images/icons8-like-20.png";
import completedIcon from "../../images/icons8-ok-20.png";
import shareIcon from "../../images/icons8-share-20.png";
import downIcon from "../../images/icons8-down-20.png";
import likedIcon from "../../images/likedIcon.png";
import { useDispatch } from "react-redux";
import { setPopap, setCurrentMusic } from "../../store/common/slice.js";
import CurrentMusic from "../curentMusic/CurrentMusic.jsx";
import { useSelector } from "react-redux";

const Table = () => {
  const audioRef = useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const [track, setTrack] = useState(tracks);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const dispatch = useDispatch();
  const searchInputText = useSelector((store) => store.common.searchText);
  const searchPanelActive = useSelector(
    (store) => store.common.isSerachPanelActive
  );

  //functions
  const playPauseToggle = () => {
    setIsPlay(!isPlay);
  };

  const LikedToogle = (item) => () => {
    setTrack((prevTrack) =>
      prevTrack.map((i) => (i.id === item ? { ...i, liked: !i.liked } : i))
    );
  };

  const playCurrentMusicToggle = (item) => {
    setTrack((prevTrack) =>
      prevTrack.map((i) => (i.id === item ? { ...i, playing: !i.playing } : i))
    );
    if (currentTrackId === item) {
      audioRef.current.paused
        ? audioRef.current.play()
        : audioRef.current.pause();
      setIsPlay(!isPlay);
    } else {
      audioRef.current.src = item.src;
      audioRef.current.play();
      setIsPlay(true);
      setCurrentTrackId(item.id);
    }
  };

  const openCurrentMusicPopap = (item) => () => {
    dispatch(setPopap(true));
    dispatch(setCurrentMusic(item));
  };

  useEffect(() => {
    isPlay ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlay]);

  useEffect(() => {
    let filteredTracks = tracks;
    if (searchPanelActive) {
      filteredTracks = filteredTracks.filter((i) =>
        i.songName.toLowerCase().includes(searchInputText.toLowerCase())
      );
    }
    setTrack(filteredTracks);
  }, [searchPanelActive, searchInputText]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Song Name</th>
            <th>Artist Name</th>
            <th>Track</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {track.map((item, index) => (
            <tr key={item.id}>
              <td>
                <audio
                  src={item.src}
                  onClick={playPauseToggle}
                  ref={audioRef}
                />
              </td>
              <td className="borderFirstChild">
                <img
                  src={dotImge}
                  alt="dotImge"
                  onClick={openCurrentMusicPopap(item)}
                />
                {isPlay && currentTrackId === item.id ? (
                  <img
                    onClick={() => {
                      playPauseToggle();
                    }}
                    src={pauseImge}
                    alt="pauseImg"
                  />
                ) : (
                  <img
                    src={playImge}
                    onClick={() => {
                      playPauseToggle();
                      playCurrentMusicToggle(item);
                    }}
                    alt="playImg"
                  />
                )}
              </td>
              <td>{item.songName}</td>
              <td>{item.artistName}</td>
              <td>{item.id}</td>
              <td>
                <img
                  src={item.liked ? likedIcon : likeIcon}
                  alt="likeIcon"
                  onClick={LikedToogle(item.id)}
                />
                <img src={completedIcon} alt="completedIcon" />
                <img src={shareIcon} alt="shareIcon" />
                <img src={downIcon} alt="downIcon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CurrentMusic />
    </>
  );
};

export default Table;
