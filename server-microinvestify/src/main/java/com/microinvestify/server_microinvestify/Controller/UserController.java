package com.microinvestify.server_microinvestify.Controller;

import com.microinvestify.server_microinvestify.Entity.User;
import com.microinvestify.server_microinvestify.Models.LoginRequest;
import com.microinvestify.server_microinvestify.Models.UserModel;

import com.microinvestify.server_microinvestify.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // User Registration API
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserModel userModel) {
        try {
            User registeredUser = userService.registerUser(userModel);
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while registering the user.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Optional<User> user = userService.authenticateUser(username, password);
        if (user.isPresent()) {
            return ResponseEntity.ok(username);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("LOGIN_FAILED");
        }
    }

    // to get current user data

    @GetMapping("/profile/{username}")
    public ResponseEntity<UserModel> getUserByUsername(@PathVariable String username) {
        Optional<UserModel> userModel = userService.getUserByUsername(username);
        if (userModel.isPresent()) {
            return ResponseEntity.ok(userModel.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return "User logged out successfully";
    }

    @GetMapping("/total-funds/{username}")
    public ResponseEntity<Double> getTotalFunds(@PathVariable String username) {
        Double totalFunds = userService.getTotalFunds(username);

        if (totalFunds == null || totalFunds == 0) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(totalFunds);
    }




}
