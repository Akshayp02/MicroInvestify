package com.microinvestify.server_microinvestify.Models;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {
    private String amount;
    private String currency;
    private String method;
    private String username;
}
