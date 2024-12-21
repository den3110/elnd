"use client"

import React, { memo } from "react";
import ReactPlayer from "react-player";

const MemoVideoContent = ({video}) => {
    
  return (
    <ReactPlayer
      className="react-player"
      url={(video)}
      controls={true}
    />
  );
};

export default memo(MemoVideoContent);
