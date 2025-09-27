package com.learnerview.chatapp.repositories;

import com.learnerview.chatapp.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}
