package com.microinvestify.server_microinvestify.Entity;

import jakarta.persistence.*;
import lombok.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Entity
@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvestmentEntity> investments = new ArrayList<>();

    @Column(nullable = false)
    private Double totalFunds = 0.0;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<PaymentEntity> paymentEntities = new ArrayList<>();

    public List<InvestmentEntity> getInvestments() {
        return investments;
    }

    public void setInvestments(List<InvestmentEntity> investments) {
        this.investments = investments;
    }

    public Double getTotalFunds() {
        return totalFunds;
    }

    public void setTotalFunds(Double totalFunds) {
        this.totalFunds = totalFunds;
    }


    public void addPayment(PaymentEntity paymentEntity) {
        paymentEntities.add(paymentEntity);
        totalFunds += paymentEntity.getPaymentAmount();
    }

    public void removePayment(PaymentEntity paymentEntity) {
        paymentEntities.remove(paymentEntity);
        totalFunds -= paymentEntity.getPaymentAmount();
    }


}
