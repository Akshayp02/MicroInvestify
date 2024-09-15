package com.microinvestify.server_microinvestify.Repository;



import com.microinvestify.server_microinvestify.Entity.InvestmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvestmentRepository extends JpaRepository<InvestmentEntity, Long> {
    List<InvestmentEntity> findByUsername(String username);
    Optional<InvestmentEntity> findByUsernameAndInvestmentAsset(String username, String investmentAsset);
}
