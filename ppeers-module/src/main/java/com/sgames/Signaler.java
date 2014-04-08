package com.sgames;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;
import org.json.JSONObject;

public class Signaler extends WebSocketServlet implements Constants {
    private static HashMap<String, WebSocketConnection> clients = new HashMap<String, WebSocketConnection>();

    protected boolean verifyOrigin(String origin) {
        log.info(String.format("Origin: %s", origin));
        return true;
    }

    @Override
    protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request) {
        return new WebSocketConnection();
    }

    private static class WebSocketConnection extends MessageInbound {

        @Override
        protected void onOpen(WsOutbound outbound) {
            log.info("Open Connection");
        }

        @Override
        protected void onClose(int status) {
            log.info("Closed Connection");
            clients.values().remove(this);
            log.info("Clients: " + clients.size());
        }

        @Override
        protected void onBinaryMessage(java.nio.ByteBuffer message) throws IOException {
            log.info("No binary message supported");
            throw new UnsupportedOperationException("No binary message supported");
        }

        @Override
        protected void onTextMessage(CharBuffer charBuffer) throws IOException {
            String messageStr = charBuffer.toString();
            log.info(String.format("Message received: %s", messageStr));

            try {
                JSONObject command = new JSONObject(messageStr);
                if (command.has("channel") && command.has("message")) {
                    //add the new client.
                    String userId = command.getJSONObject("message").getString("userid");
                    if (!clients.containsKey(userId)) {
                        clients.put(userId, this);
                        log.info("Client added, Clients: " + clients.size());
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }


            for (String userId : clients.keySet()) {
                WebSocketConnection client = clients.get(userId);
                client.getWsOutbound().writeTextMessage(CharBuffer.wrap(messageStr));
            }
        }
    }
}
