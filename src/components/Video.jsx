import { forwardRef, useEffect } from "react";
import videoSrc from "../assets/video/test.mp4";

export const Video = forwardRef((props, ref) => {
  return (
    <>
      <video ref={ref} src={videoSrc} />
    </>
  );
});
