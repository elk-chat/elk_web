const socket = new WebSocket(testUrl);

socket.onopen = () => {
  socket.send(encodeBuffer);
};

socket.onmessage = (event) => {
  // socket.send(encodeBuffer);
  console.log(UserRegisterReq.decode(event.data));
};