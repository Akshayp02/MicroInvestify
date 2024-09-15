package com.microinvestify.server_microinvestify.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                        .requestMatchers("/api/users/register",
                                "/api/users/login",
                                "/api/users/total-funds/{username}",
                                "/api/users/logout",
                                "/api/users/profile/{}",
                                "/api/payments/create",
                                "/api/payments/success",
                                "/api/payments/cancel",
                                "/api/payments/error",
                                "/api/payments/payments-history/**",
                                "/api/investments/investmented/{username}",
                                "/api/investments/invest-funds",
                                "/api/investments/sell-funds"

                        ).permitAll()
                        .anyRequest().authenticated()
        );
        http.csrf(csrf ->
                        csrf.ignoringRequestMatchers("/api/users/register",
                                "/api/users/login",
                                "/api/users/total-funds/{username}",
                                "/api/users/logout",
                                "/api/users/profile/{}",
                                "/api/payments/create",
                                "/api/payments/success",
                                "/api/payments/cancel",
                                "/api/payments/error",
                                "/api/payments/payments-history/{username}",
                                "/api/investments/investmented/{username}",
                                "/api/investments/invest-funds",
                                "/api/investments/sell-funds"

                        )
                )
                .httpBasic();

        return http.build();
    }
}
