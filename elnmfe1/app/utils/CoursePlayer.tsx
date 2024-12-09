import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  //start add
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:8000/api/v1/getVdoCipherOTP", {
  //       videoId: videoUrl,
  //     })
  //     .then((res) => {
  //       setVideoData(res.data);
  //     });
  // }, [videoUrl]);
  //end add

  return (
      <div
          style={{
            position: 'relative',
            paddingTop: '56.25%',
            overflow: 'hidden',
          }}
      >
        {/* {videoData.otp && videoData.playbackInfo !== '' && ( */}
        <iframe
            src={
              // `https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=JkckZgysed9RECBI`
              videoUrl
            }
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,

            }}
            allowFullScreen={true}
            // allow='encrypted-media'
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        ></iframe>
        {/* )} */}
      </div>
  );
};

export default CoursePlayer;
