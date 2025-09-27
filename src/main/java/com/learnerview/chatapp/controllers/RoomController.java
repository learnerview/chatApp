package com.learnerview.chatapp.controllers;

import com.learnerview.chatapp.entities.Room;
import com.learnerview.chatapp.service.RoomService;
import com.learnerview.chatapp.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;
import java.util.List;

@Controller
public class RoomController {

    private final RoomService roomService;
    private final UserService userService;

    public RoomController(RoomService roomService, UserService userService) {
        this.roomService = roomService;
        this.userService = userService;
    }

    @GetMapping({"/", "/rooms"})
    public String roomsPage(Principal principal, Model model) {
        if (principal != null) {
            model.addAttribute("username", principal.getName());
        } else {
            model.addAttribute("username", "Guest");
        }
        return "rooms";
    }


    @PostMapping("/rooms/join")
    public String joinRoom(@RequestParam("roomId") String roomId,
                           Principal principal,
                           RedirectAttributes redirectAttributes) {
        if (roomId == null || roomId.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Room ID cannot be empty");
            return "redirect:/rooms";
        }
        roomService.createIfAbsent(roomId.trim());
        return "redirect:/chat/" + roomId.trim();
    }

    @GetMapping("/chat/{roomId}")
    public String chatPage(@PathVariable String roomId,
                           @RequestParam(value = "page", defaultValue = "0") int page,
                           Principal principal,
                           Model model) {
        model.addAttribute("username", principal.getName());
        model.addAttribute("roomId", roomId);
        List<com.learnerview.chatapp.entities.Message> messages = roomService.getLatestMessages(roomId, page, 20);
        model.addAttribute("messages", messages);
        return "chat";
    }
}
