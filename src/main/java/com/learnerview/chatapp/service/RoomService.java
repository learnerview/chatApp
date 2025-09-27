package com.learnerview.chatapp.service;

import com.learnerview.chatapp.entities.Message;
import com.learnerview.chatapp.entities.Room;

import java.util.List;

public interface RoomService {
    Room createIfAbsent(String roomId);
    Room findByRoomId(String roomId);
    Room save(Room room);
    List<Message> getLatestMessages(String roomId, int page, int size);
    Message addMessage(String roomId, Message message);
}
