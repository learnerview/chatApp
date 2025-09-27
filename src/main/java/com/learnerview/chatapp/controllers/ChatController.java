package com.learnerview.chatapp.controllers;

import com.learnerview.chatapp.entities.Message;
import com.learnerview.chatapp.service.RoomService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatController {

    private final SimpMessagingTemplate template;
    private final RoomService roomService;

    public ChatController(SimpMessagingTemplate template, RoomService roomService) {
        this.template = template;
        this.roomService = roomService;
    }

    // DTO for incoming chat messages
    public static class ChatPayload {
        private String content;

        public ChatPayload() {}

        public ChatPayload(String content) {
            this.content = content;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }

    // Handle chat messages
    @MessageMapping("/sendMessage/{roomId}")
    public void sendMessage(@DestinationVariable String roomId,
                            @Payload ChatPayload payload,
                            Principal principal) {
        String sender = principal.getName();
        Message message = new Message(sender, payload.getContent());

        // Save to room history
        roomService.addMessage(roomId, message);

        // Broadcast to subscribers
        template.convertAndSend("/topic/room/" + roomId, message);
    }

//    // Handle typing indicator (extra feature)
//    @MessageMapping("/typing/{roomId}")
//    public void typing(@DestinationVariable String roomId,
//                       Principal principal) {
//        String sender = principal.getName();
//        template.convertAndSend("/topic/typing/" + roomId, sender + " is typing...");
//    }
}
