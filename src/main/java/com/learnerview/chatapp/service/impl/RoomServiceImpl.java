package com.learnerview.chatapp.service.impl;

import com.learnerview.chatapp.entities.Message;
import com.learnerview.chatapp.entities.Room;
import com.learnerview.chatapp.repositories.RoomRepository;
import com.learnerview.chatapp.service.RoomService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public Room createIfAbsent(String roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) {
            room = new Room();
            room.setRoomId(roomId);
            room = roomRepository.save(room);
        }
        return room;
    }

    @Override
    public Room findByRoomId(String roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    @Override
    public Room save(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public List<Message> getLatestMessages(String roomId, int page, int size) {
        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) return Collections.emptyList();
        List<Message> messages = room.getMessages();
//        int total = messages.size();
//        int start = Math.max(0, total - (page + 1) * size);
//        int end = Math.min(total, start + size);
//        return messages.subList(start, end);
        return messages;
    }

    @Override
    public Message addMessage(String roomId, Message message) {
        Room room = createIfAbsent(roomId);
        room.getMessages().add(message);
        roomRepository.save(room);
        return message;
    }
}
