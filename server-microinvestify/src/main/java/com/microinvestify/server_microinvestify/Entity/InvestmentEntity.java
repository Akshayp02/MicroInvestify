package com.microinvestify.server_microinvestify.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "investments")
public class InvestmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // Ensure this is non-nullable
    private User user;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(nullable = false)
    private Double investmentAmount;

    @Column(nullable = false)
    private String investmentAsset;

    @Column(nullable = false)
    private LocalDate investmentDate;

    @Column(nullable = false)
    private Double investmentPrice;

    @Column(nullable = false)
    private Double returns;

    @Column(nullable = false)
    private Double quantity;

    @Column(name = "percentage_return", nullable = false)
    private Double percentageReturn = 0.0; // Default to 0.0 if not provided

    @Column(nullable = false)
    private double remainingQuantity;

    @Column(nullable = false)
    private double profit;

    private LocalDate sellDate;

}
