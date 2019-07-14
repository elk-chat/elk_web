import { HeartBeat } from "@little-chat/sdk";

const heartbeatFreq = 30 * 1000;

let timer;

const initHeartBeat = () => {
  timer = setInterval(() => {
    HeartBeat({});
  }, heartbeatFreq);
  return () => {
    clearInterval(timer);
  };
};

export default initHeartBeat;
