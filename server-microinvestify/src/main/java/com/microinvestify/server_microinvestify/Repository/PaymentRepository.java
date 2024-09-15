package com.microinvestify.server_microinvestify.Repository;

import com.microinvestify.server_microinvestify.Entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    PaymentEntity findByPayerId(String payerId);
    List<PaymentEntity> findByUserUsername(String username);
    Optional<PaymentEntity> findByPaymentId(String paymentId);
    List<PaymentEntity> findByUsername(String username);

}
