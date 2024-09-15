package com.microinvestify.server_microinvestify.Service;

import com.microinvestify.server_microinvestify.Entity.PaymentEntity;
import com.microinvestify.server_microinvestify.Entity.User;
import com.microinvestify.server_microinvestify.Models.UserModel;
import com.microinvestify.server_microinvestify.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User registerUser(UserModel userModel) {
        if (userRepository.findByUsername(userModel.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists.");
        }
        if (userRepository.findByEmail(userModel.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists.");
        }

        User user = new User();
        user.setUsername(userModel.getUsername());
        user.setFirstName(userModel.getFirstName());
        user.setLastName(userModel.getLastName());
        user.setEmail(userModel.getEmail());
        user.setUsername(userModel.getUsername());

        // Encrypt the password before saving it
        String encodedPassword = passwordEncoder.encode(userModel.getPassword());
        user.setPassword(encodedPassword);

        userRepository.save(user);
        return user;
    }


    @Override
    public Optional<User> authenticateUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            } else {
                System.out.println("Invalid password for user: " + username);
            }
        } else {
            System.out.println("User not found: " + username);
        }

        return Optional.empty();
    }

    @Override
    public ResponseEntity<UserModel> getProfile() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            UserModel userModel = new UserModel(user.getUsername(), user.getFirstName(), user.getEmail());
            return ResponseEntity.ok(userModel);
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public Optional<UserModel> getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(this::convertToUserModel);
    }

    private UserModel convertToUserModel(User user) {
        UserModel userModel = new UserModel();
        userModel.setUsername(user.getUsername());
        userModel.setFirstName(user.getFirstName());
        userModel.setLastName(user.getLastName());
        userModel.setEmail(user.getEmail());
        // Set other fields as needed
        return userModel;
    }

    public User findByUserName(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    // Method to fetch user by username and retrieve total funds
    public Double getTotalFunds(String username) {
        log.info("Retrieving total funds for username: " + username);

        // Retrieve user by username
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            // User found, retrieve total funds
            User user = optionalUser.get();
            Double totalFunds = user.getTotalFunds();

            if (totalFunds != null) {
                log.info("Total funds retrieved successfully for user: " + username);
                return totalFunds;
            } else {
                log.warn("Total funds not set for user: " + username);
                return 0.0; // or another default value as needed
            }
        } else {
            // Handle the case where the user is not found
            log.error("User not found with username: " + username);
            return 0.0; // or another default value
        }
    }





}
