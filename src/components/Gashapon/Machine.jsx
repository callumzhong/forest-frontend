import clsx from "clsx";
import { audio } from "data/config";
import { useCallback, useEffect, useState } from "react";
import getRandomNumber from "utils/getRandomNumber";
import sleep from "utils/sleep";
import Ball from "./Ball";
import style from "./Machine.module.css";

const ballStyles = [
  "yellow",
  "red",
  "blue",
  "lime",
  "indigo",
];
const selectedColor = () =>
  ballStyles[getRandomNumber(0, ballStyles.length - 1)];

const configs = [
  {
    position: "-bottom-[10px] left-[60px]",
    animation: style["ball-rotate-bottom"],
  },
  {
    position: "bottom-[20px] left-[60px]",
    animation: style["ball-rotate-bottom"],
  },
  {
    position: "bottom-[30px] left-[30px]",
    animation: style["ball-rotate-right"],
  },
  {
    position: "bottom-[30px] left-[90px]",
  },
  {
    position: "bottom-[0px] left-[0px]",
  },
  {
    position: "bottom-[0px] left-[30px]",
  },
  {
    position: "bottom-[0px] left-[90px]",
  },
  {
    position: "bottom-[0px] left-[120px]",
  },
  {
    position: "bottom-[0px] left-[150px]",
  },
  {
    position: "bottom-[30px] left-[0px]",
  },
  {
    position: "bottom-[30px] left-[120px]",
  },
  {
    position: "bottom-[30px] left-[150px]",
  },
];

const Machine = ({ onOpen, onPlay }) => {
  const [balls, setBalls] = useState([]);
  const [isAnimationButton, setIsAnimationButton] =
    useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const [selectedBall, setSelectedBall] = useState();
  const updateBallsHandler = useCallback(() => {
    setBalls(() => {
      const arr = [];
      for (let index = 0; index < configs.length; index++) {
        arr.push({
          color: selectedColor(),
          style: {
            transform: `rotate(${getRandomNumber(
              12,
              240,
            )}deg)`,
          },
          ...configs[index],
        });
      }
      return arr;
    });
  }, []);
  const playHandler = async (e) => {
    const isPlay = onPlay();
    if (isPlay) {
      audio.gashapon.play();
      setIsAnimationButton(true);
      await sleep(2700);
      setIsAnimationButton(false);
      setIsAnimation(true);
      await sleep(1000);
      setSelectedBall(balls[0]);
    }
  };
  const openHandler = async () => {
    onOpen(selectedBall);
    setSelectedBall();
    setIsAnimation(false);
  };
  useEffect(() => {
    if (!selectedBall) {
      updateBallsHandler();
    }
  }, [selectedBall, updateBallsHandler]);
  return (
    <div className="relative w-[185px]">
      <div className="absolute z-10 h-[185px] w-full"></div>
      <div className="relative h-[180px] overflow-hidden border-4 border-indigo-800 bg-gray-200">
        <div className="border-1 absolute left-1/2 -top-2 z-10 mx-auto h-4 w-6/12 -translate-x-1/2 rounded-xl border-gray-400 bg-white p-2"></div>
        <div className="absolute -inset-y-[22px] -left-[120px] border-l-[150px] border-b-[30px] border-t-[30px] border-l-[rgb(68,91,243,0.3)] border-b-transparent border-t-transparent "></div>
        <div className="absolute -inset-y-[22px] -right-[120px] border-r-[150px] border-b-[30px] border-t-[30px] border-r-[rgb(68,91,243,0.3)] border-b-transparent border-t-transparent"></div>
        {balls.map((ball, idx) => {
          return (
            <Ball
              key={idx}
              color={ball.color}
              style={ball.style}
              className={ball.position}
              animation={isAnimation && ball.animation}
            />
          );
        })}
      </div>
      <div className="relative z-10 w-full overflow-hidden bg-indigo-900 py-8">
        <div className="flex items-center  justify-around">
          <div className="flex h-16 w-10 justify-center rounded-t-full bg-gray-200">
            {selectedBall && (
              <Ball
                onClick={openHandler}
                className={`${style["ball-rotate-bottom"]} cursor-pointer`}
                color={selectedBall.color}
                style={selectedBall.style}
              />
            )}
          </div>
          <button
            disabled={selectedBall}
            onClick={playHandler}
            className="h-12 w-12 rounded-full border-[6px] border-double"
          >
            <div
              className={clsx(
                "m-auto h-full w-2 bg-white",
                { "animate-spin-slow": isAnimationButton },
              )}
            >
              <div className="m-auto h-full w-1 bg-gray-500"></div>
            </div>
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-4 rounded bg-red-500 shadow-md shadow-red-400"></div>
      </div>
    </div>
  );
};

export default Machine;
