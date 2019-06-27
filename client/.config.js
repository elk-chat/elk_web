module.exports = {
  "apiHost":process.env.NODE_ENV==='development'?"ws://10.30.0.28:9999/gate":"wss://im.99safe.org/gate",
  // "apiHost":"192.168.192.145:9999/gate",
  "beforeWSHook": (data) => {
    console.log(data)
    return data;
  },
  "afterWSHook": (data) => {
    console.log(data)
    return data;
  },
}
