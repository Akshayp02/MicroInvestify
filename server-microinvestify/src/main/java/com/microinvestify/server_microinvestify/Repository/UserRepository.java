package com.microinvestify.server_microinvestify.Repository;

import com.microinvestify.server_microinvestify.Entity.PaymentEntity;
import com.microinvestify.server_microinvestify.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);



}
