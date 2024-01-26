import React from "react";
import "./style.css";
import Table from "../table/Table";
import UploadPopap from "../uploadMusic/UploadPopap";

const Main = () => {
  return (
    <div className="mainPageContainer">
      <Table />
      <UploadPopap />
    </div>
  );
};

export default Main;
