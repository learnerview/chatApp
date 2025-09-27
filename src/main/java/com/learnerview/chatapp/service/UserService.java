package com.learnerview.chatapp.service;

import com.learnerview.chatapp.entities.User;

public interface UserService {
    User register(User user);
    User findByUsername(String username);
}
