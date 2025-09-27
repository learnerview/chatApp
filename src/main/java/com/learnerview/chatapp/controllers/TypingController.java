package com.learnerview.chatapp.controllers;

import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class TypingController {

    private final SimpMessagingTemplate template;

    public TypingController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/typing/{roomId}")
    public void typing(@DestinationVariable String roomId, Principal principal) {
        if (principal == null) return;
        String username = principal.getName();
        template.convertAndSend("/topic/typing/" + roomId, username);
    }
}
