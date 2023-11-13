import { useEffect, useState, useRef } from "react";
import { useUnactiveCheck } from "./utils.jsx/InactivityCheck";

export const Player = ({ videoRef }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [isShow, setShow] = useState(true);
  const [time, setTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const unactive = useUnactiveCheck(setShow);

  const timingId = useRef("");

  useEffect(() => {
    if (isPlaying) {
      timingId.current = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timingId.current);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current.currentTime >= time) {
      setCurrentTime(0);
      setPlaying(false);
    }
  }, [currentTime]);

  useEffect(() => {
    videoRef.current.volume = 50 / 100;
    videoRef.current.addEventListener("loadeddata", () =>
      setTime(Math.floor(videoRef.current.duration))
    );
  }, []);

  useEffect(() => {
    if (isShow) unactive();
  }, [isShow]);

  document.addEventListener("mousemove", () => {
    if (!isShow) setShow(true);
  });

  function playVideo() {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setPlaying(!isPlaying);
  }

  function increaseTime() {
    videoRef.current.currentTime += 10;
    setCurrentTime((prev) => prev + 10);
  }
  function decreaseTime() {
    videoRef.current.currentTime -= 10;
    setCurrentTime((prev) => prev - 10);
  }

  function changeVolume(e) {
    let vol = e.target.value;
    videoRef.current.volume = vol / 100;
  }

  function changeTime(e) {
    setCurrentTime(Number(e.target.value));
    videoRef.current.currentTime = e.target.value;
  }

  if (isShow) {
    return (
      <div className="player">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          onChange={changeVolume}
        />
        <button onClick={playVideo}>{isPlaying ? "Пауза" : "Старт"}</button>
        <button onClick={decreaseTime}>-10</button>
        <button onClick={increaseTime}>+10</button>
        <input
          type="range"
          className="input-time"
          value={currentTime}
          min={0}
          max={time}
          step={1}
          onChange={changeTime}
        />
      </div>
    );
  } else {
    return;
  }
};
