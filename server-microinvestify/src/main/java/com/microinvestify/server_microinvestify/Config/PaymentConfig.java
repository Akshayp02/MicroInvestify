package com.microinvestify.server_microinvestify.Config;


import com.paypal.base.rest.APIContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PaymentConfig {

    @Value("${paypal.client.id}")
    private String clientID;
    @Value("${paypal.client.secret}")
    private String clientSecret;
    @Value("${paypal.mode}")
    private String mode;

    @Bean
    public APIContext apiContext() {
        APIContext apiContext = new APIContext(clientID, clientSecret, mode);
        return apiContext;
    }

}
