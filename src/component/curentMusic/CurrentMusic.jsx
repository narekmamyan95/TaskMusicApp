import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import closeIcon from "../../images/icons8-close-25.png";
import { setPopap } from "../../store/common/slice";

const CurrentMusic = () => {
  const dispatch = useDispatch();
  const isPopapOpen = useSelector((store) => store.common.currentPopap);
  const currentMusicData = useSelector((store) => store.common.currentMusic);

  //functions

  const closePopapHandler = () => {
    dispatch(setPopap(false));
  };

  return (
    <>
      {isPopapOpen ? (
        <div className="popapContainer">
          <div>
            <h1>Song Details</h1>
            <b>
              <span>Track</span>
              {currentMusicData.id}
            </b>
            <b>
              <span>Artist</span>
              {currentMusicData.artistName}
            </b>
            <b>
              <span>Song</span>
              {currentMusicData.songName}
            </b>
            <img src={closeIcon} alt="closeIcon" onClick={closePopapHandler} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CurrentMusic;
