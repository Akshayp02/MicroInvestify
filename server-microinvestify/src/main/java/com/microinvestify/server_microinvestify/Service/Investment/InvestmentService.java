package com.microinvestify.server_microinvestify.Service.Investment;

import com.microinvestify.server_microinvestify.Entity.InvestmentEntity;
import com.microinvestify.server_microinvestify.Entity.SellAssetRequest;
import com.microinvestify.server_microinvestify.Entity.User;
import com.microinvestify.server_microinvestify.Models.InvestmentRequest;
import com.microinvestify.server_microinvestify.Models.MakeIvestment;
import com.microinvestify.server_microinvestify.Models.UserModel;
import com.microinvestify.server_microinvestify.Repository.InvestmentRepository;
import com.microinvestify.server_microinvestify.Repository.UserRepository;
import com.microinvestify.server_microinvestify.Service.UserService;
import com.microinvestify.server_microinvestify.execptions.InvestmentNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InvestmentService {

    @Autowired
    private final InvestmentRepository investmentRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final UserService userService;

    @Autowired
    private final AssetPriceService assetPriceService;



    @Transactional
    public String investFunds(String username, Double investmentAmount, String investmentAsset, LocalDate investmentDate, Double investmentPrice) {
        // Retrieve user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));


        if (user.getTotalFunds() < investmentAmount) {
            return "Insufficient funds";
        }


        InvestmentEntity investment = new InvestmentEntity();
        investment.setUsername(username);
        investment.setInvestmentAmount(investmentAmount);
        investment.setInvestmentAsset(investmentAsset);
        investment.setInvestmentDate(investmentDate);
        investment.setInvestmentPrice(investmentPrice);
        investment.setQuantity(investmentAmount / investmentPrice); // quantity is investmentAmount divided by investmentPrice
        investment.setReturns(0.0);
        investment.setPercentageReturn(0.0);
        investment.setProfit(0.0);
        investment.setRemainingQuantity(investment.getQuantity());
        investment.setUser(user);

        // Save investment
        investmentRepository.save(investment);

        // Update user's total funds
        user.setTotalFunds(user.getTotalFunds() - investmentAmount);
        userRepository.save(user);

        return "Investment successful";
    }
    private void updateUserTotalFunds(User user) {
        // Calculate total funds based on investments
        double totalFunds = user.getInvestments().stream()
                .mapToDouble(InvestmentEntity::getInvestmentAmount)
                .sum();

        user.setTotalFunds(totalFunds);
        userRepository.save(user);
    }


    public Double getCurrentAssetPrice(String asset) {
        return assetPriceService.getCurrentPrice(asset);
    }

    public List<MakeIvestment> getInvestmentDetailsByUsername(String username) {
        // Retrieve investments for the user
        List<InvestmentEntity> investments = investmentRepository.findByUsername(username);

        // Map to InvestmentRequest
        List<MakeIvestment> investmentRequests = investments.stream()
                .map(investment -> {
                    MakeIvestment request = new MakeIvestment();
                    request.setInvestmentAmount(investment.getInvestmentAmount());
                    request.setInvestmentAsset(investment.getInvestmentAsset());
                    request.setInvestmentDate(investment.getInvestmentDate());
                    request.setInvestmentPrice(investment.getInvestmentPrice());
                    request.setQuantity(investment.getQuantity());
                    request.setReturns(investment.getPercentageReturn());
                    return request;
                })
                .collect(Collectors.toList());

        // Reverse the list if needed
        Collections.reverse(investmentRequests);

        return investmentRequests;
    }

    public void sellFunds(String username, List<SellAssetRequest> assetsToSell) {
        UserModel userModel = userService.getUserByUsername(username)
                .orElseThrow(() -> new InvestmentNotFoundException("User not found with username: " + username));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new InvestmentNotFoundException("User not found with username: " + username));

        double totalAmountAddedToFunds = 0;

        for (SellAssetRequest request : assetsToSell) {
            log.info("Selling asset: " + request.getAsset());
            String asset = request.getAsset();
            double quantityToSell = request.getQuantityToSell();
            double sellPrice = request.getSellPrice();

            // Get user's investment details for the asset
            InvestmentEntity investment = investmentRepository.findByUsernameAndInvestmentAsset(username, asset)

                    .orElseThrow(() -> new InvestmentNotFoundException("Investment in asset not found: " + asset));

            // Check if the user has enough quantity to sell
            if (investment.getRemainingQuantity() < quantityToSell) {
                throw new InvestmentNotFoundException("Insufficient quantity to sell for asset: " + asset);
            }
            double profit = (sellPrice - investment.getInvestmentPrice()) * quantityToSell;
            double amountFromSale = sellPrice * quantityToSell;


            double remainingQuantity = investment.getRemainingQuantity() - quantityToSell;
            investment.setRemainingQuantity(remainingQuantity);

            investment.setProfit(profit);
            investment.setSellDate(LocalDate.now());

            investmentRepository.save(investment);


            totalAmountAddedToFunds += amountFromSale;
        }

        // Update user's total funds with the total amount added from all sales
        double updatedFunds = user.getTotalFunds() + totalAmountAddedToFunds;
        user.setTotalFunds(updatedFunds);
        userRepository.save(user);
    }

    //TODO: Implement this method
    @Scheduled(cron = "0 * * * * ?")
    public void updateReturns() {
        List<InvestmentEntity> investments = investmentRepository.findAll();

        for (InvestmentEntity investment : investments) {
            double currentPrice = assetPriceService.getCurrentPrice(investment.getInvestmentAsset());
            double returns = (currentPrice - investment.getInvestmentPrice()) * (investment.getQuantity());
            investment.setReturns(returns);
            investmentRepository.save(investment);
        }

        log.info("Investment returns updated.");
    }
}
