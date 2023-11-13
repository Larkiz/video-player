export const useUnactiveCheck = (callBack) => {
  return () => {
    let time = 3;

    const intervalId = setInterval(() => {
      if (time === 0) {
        callBack(false);
        clearInterval(intervalId);
      }

      time -= 1;
    }, 1000);

    document.addEventListener("mousemove", () => (time = 3));
  };
};
