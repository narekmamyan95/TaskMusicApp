import React, { useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { setUploadMusicPopap, setUploadMusic } from "../../store/common/slice";

const UploadPopap = () => {
  const dispatch = useDispatch();
  const isPopapActive = useSelector((store) => store.common.uploadMusicPopap);
  const [songInfo, setSongInfo] = useState({
    songName: "",
    artistName: "",
    musicFile: null,
  });
  const [loading, setLoading] = useState(false);

  //fucntions
  const popapCloseHandler = () => {
    dispatch(setUploadMusicPopap(false));
  };

  const musicValidation = (file) => {
    const fileType = file[0].type;
    const allowedTypes = ["audio/mpeg", "audio/wav"];
    if (allowedTypes.includes(fileType)) {
      setSongInfo({ musicFile: file });
    } else {
      console.error("Incorrect File");
    }
  };

  const addToDataUploadMusic = (e) => {
    e.preventDefault();
    dispatch(setUploadMusic(songInfo));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSongInfo({
        songName: "",
        artistName: "",
        musicFile: null,
      });
    }, 5000);
  };

  return (
    <>
      {isPopapActive ? (
        <div className="uploadMusicContainer">
          <form onSubmit={(e) => addToDataUploadMusic(e)}>
            <input
              type="text"
              placeholder="Song Name"
              value={songInfo.songName}
              onChange={(e) => setSongInfo({ songName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Artist Name"
              value={songInfo.artistName}
              onChange={(e) => setSongInfo({ artistName: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => musicValidation(e.target.files)}
            />
            <button type="submit" disabled={songInfo.musicFile === null}>
              Upload
            </button>
            {loading ? <div className="loading">Loading . . .</div> : null}
          </form>
          <button className="popapCloseBtn" onClick={popapCloseHandler}>
            X
          </button>
        </div>
      ) : null}
    </>
  );
};

export default UploadPopap;
