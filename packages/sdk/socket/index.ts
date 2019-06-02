interface SocketParams {
  url: string;
  onOpen: () => void;
  onMessage: (event: MessageEvent) => void;
}

export function connectSocket(params: SocketParams): WebSocket {
  const { url, onOpen, onMessage } = params;
  const socket = new WebSocket(url);

  socket.onopen = () => {
    onOpen();
  };
  socket.onmessage = (event) => {
    onMessage(event);
    // socket.send(encodeBuffer);
  };

  return socket;
}
