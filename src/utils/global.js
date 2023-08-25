var url = "ws://localhost:8883/LoginWebSocket?FantasyTimetoken=";
var token = sessionStorage.getItem("FantasyTimetoken");
const webSocket = new WebSocket(url + token);

// 暂时无用
export default {
    webSocket,
};
