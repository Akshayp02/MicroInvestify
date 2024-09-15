package com.microinvestify.server_microinvestify.Service;

import com.microinvestify.server_microinvestify.Entity.User;
import com.microinvestify.server_microinvestify.Models.UserModel;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface UserService {

    User registerUser(UserModel userModel);
    Optional<User> authenticateUser(String username, String password);
    ResponseEntity<UserModel> getProfile();
    Optional<UserModel> getUserByUsername(String username);
    Double getTotalFunds(String username);

}
