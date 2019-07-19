import { HeartBeat } from "@little-chat/sdk";

const heartbeatFreq = 30 * 1000;

let timer;

const initHeartBeat = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    HeartBeat({});
  }, heartbeatFreq);
  return () => {
    clearInterval(timer);
  };
};

export default initHeartBeat;
