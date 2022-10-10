import io from "socket.io-client";
import React from "react";
export const socket = io.connect(
  "http://ec2-54-254-207-123.ap-southeast-1.compute.amazonaws.com:8080/"
);
export const SocketContext = React.createContext();
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
