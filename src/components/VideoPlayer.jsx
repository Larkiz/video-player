import { useRef } from "react";
import { Player } from "./Player";
import { Video } from "./Video";

export const VideoPlayer = () => {
  const video = useRef(null);

  return (
    <div className="video">
      <Video ref={video} />
      <Player videoRef={video} />
    </div>
  );
};
