package com.sgames;

import java.util.logging.Logger;

import org.apache.catalina.websocket.WebSocketServlet;

public interface Constants {
    public final static String channel = "httplocalhost8080Homeroomhtml";
    public static final String ANONYMOUS_PREFIX = "_";
    public final static Logger log = Logger.getLogger(WebSocketServlet.class.getName());
}
