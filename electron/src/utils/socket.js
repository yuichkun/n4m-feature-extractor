import io from "socket.io-client";
import i18n from "i18next";
const socket = io("http://localhost:3000").connect();

socket.on("connect", () => {
  console.log("Connected to Max 8");
});

socket.on("message", msg => {
  if (msg === "ja" || msg === "en") {
    i18n.changeLanguage(msg);
  }
});

export default socket;
