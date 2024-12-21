import React, { memo } from "react";
import ReactPlayer from "react-player";

const MemoVideo = ({video}) => {
    
  return (
    <ReactPlayer
      className="react-player"
      url={URL.createObjectURL(video)}
      controls={true}
    />
  );
};

export default memo(MemoVideo);
