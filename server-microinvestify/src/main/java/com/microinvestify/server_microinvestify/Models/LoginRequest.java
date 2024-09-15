package com.microinvestify.server_microinvestify.Models;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginRequest {
    private String username;
    private String password;
}
