/**
 * It controls all the connection part with the
 * web socket and with the other user cams.
 * The chat, the list of users if someone kick other
 * etc.
 */
(function(connection, $) {
    var currentUserUUID = Math.round(Math.random() * 60535) + 5000;
    var URL = "ws://" + location.host + "/signaler";
    var channels = {};
    var webSocket = {};
    var c = {};

    window.onbeforeunload = function() {
        c.leave();
        webSocket.close()
    };

    var initMultiConnection = function() {
        c = new RTCMultiConnection();
        c.session = {
            audio: false,
            video: true
        };

        c.onstream = function(e) {
            room.openCam(e);
        };

        //overriding "openSignalingChannel" method
        c.openSignalingChannel = function(config) {
            var channel = config.channel || this.channel;
            channels[channel] = config;

            if (config.onopen) setTimeout(config.onopen, 1000);

            return {
                send: function (message) {
                    webSocket.send(JSON.stringify({
                        sender: currentUserUUID,
                        channel: channel,
                        message: message
                    }));
                },
                channel: channel
            };
        };
    };

    var initWebSocket = function (url) {
        var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket
        webSocket = new WS(url);

        webSocket.onmessage = getMessage;
    };

    var getMessage = function(e) {
        var data = JSON.parse(e.data);

        if (data.sender == currentUserUUID) {
            console.info("same currentUserUUID and data.sender");
            return;
        }

        if (channels[data.channel] && channels[data.channel].onmessage) {
            channels[data.channel].onmessage(data.message);
        }
    };

    connection.getConnection = function() {
        return c;
    };

    connection.getWebSocket = function() {
        return webSocket;
    };

    connection.init = function() {
        //custom signaler using web socket.
        initWebSocket(URL);

        //open connection
        initMultiConnection();

        c.connect();

        console.info("Init Connection");
    }
}(window.connection = window.connection || {}, jQuery));