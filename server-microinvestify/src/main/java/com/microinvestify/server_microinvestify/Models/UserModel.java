package com.microinvestify.server_microinvestify.Models;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserModel {

    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private String email;


    public UserModel(String username,String firstName,String email){
        super();
        this.email =email;
        this.firstName = firstName;
        this.username = username;
    }



}
