package com.microinvestify.server_microinvestify.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "payment_entity")
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String paymentId;

    private String username;

    private String payerId;
    private Double paymentAmount;
    private Double totalFunds;

    @Column(nullable = true)
    private LocalDate paymentDate;

    // Update this to @ManyToOne because a payment is associated with one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    public void updateTotalFunds(Double additionalAmount) {
        if (this.totalFunds == null) {
            this.totalFunds = 0.0;
        }
        this.totalFunds += additionalAmount;
    }
    public Double getTotalFunds() {
        return totalFunds;
    }
}
