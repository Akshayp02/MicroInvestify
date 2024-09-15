package com.microinvestify.server_microinvestify.execptions;

public class InvestmentNotFoundException extends RuntimeException {


    public InvestmentNotFoundException(String message) {
        super(message);

    }
}
