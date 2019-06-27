module.exports = {
  "apiHost":process.env.NODE_ENV==='development'?"10.30.0.28:9999/gate":"52.199.38.166:9999/gate",
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
