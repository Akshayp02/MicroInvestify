package com.microinvestify.server_microinvestify.Service.Payment;


import com.microinvestify.server_microinvestify.Entity.InvestmentEntity;
import com.microinvestify.server_microinvestify.Entity.PaymentEntity;
import com.microinvestify.server_microinvestify.Entity.User;
import com.microinvestify.server_microinvestify.Repository.InvestmentRepository;
import com.microinvestify.server_microinvestify.Repository.PaymentRepository;
import com.microinvestify.server_microinvestify.Repository.UserRepository;
import com.microinvestify.server_microinvestify.Service.Investment.AssetPriceService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.persistence.Column;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {



    private APIContext apiContext;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    public PaymentService(APIContext apiContext) {
        this.apiContext = apiContext;
    }

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private AssetPriceService assetPriceService;

    @Column(name = "total_funds")
    private User userEntity;






    public void saveOrUpdatePayment(String paymentId, String payerId, Double paymentAmount, String username) {
        log.info("Processing payment for username: {}", username);

        // Retrieve user by username
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            LocalDate paymentDate = LocalDate.now();

            // Check if paymentId already exists
            Optional<PaymentEntity> existingPayment = paymentRepository.findByPaymentId(paymentId);

            PaymentEntity paymentEntity;

            if (existingPayment.isPresent()) {
                // Update existing payment
                paymentEntity = existingPayment.get();
                paymentEntity.setPaymentAmount(paymentAmount);
                paymentEntity.setPaymentDate(paymentDate);

                // Recalculate total funds
                double totalFunds = user.getPaymentEntities().stream()
                        .mapToDouble(PaymentEntity::getPaymentAmount)
                        .sum();
                user.setTotalFunds(totalFunds);

            } else {
                // Create new payment entity
                paymentEntity = new PaymentEntity();
                paymentEntity.setPaymentId(paymentId);
                paymentEntity.setPayerId(payerId);
                paymentEntity.setPaymentAmount(paymentAmount);
                paymentEntity.setPaymentDate(paymentDate);
                paymentEntity.setUser(user);

                // Calculate total funds including the new payment
                double totalFunds = user.getPaymentEntities().stream()
                        .mapToDouble(PaymentEntity::getPaymentAmount)
                        .sum();
                user.setTotalFunds(totalFunds + paymentAmount);

                paymentEntity.setTotalFunds(user.getTotalFunds());
            }

            // Save payment
            paymentRepository.save(paymentEntity);
            userRepository.save(user);  // Save the user with updated total funds

            log.info("Payment saved/updated successfully.");
        } else {
            log.error("User not found with username: {}", username);
        }
    }


    public void investFunds(String username, Double investmentAmount, String investmentAsset, LocalDate investmentDate, Double investmentPrice) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Subtract investment amount from user's total funds
            user.setTotalFunds(user.getTotalFunds() - investmentAmount);

            // Save investment details
            InvestmentEntity investment = new InvestmentEntity();
            investment.setInvestmentAmount(investmentAmount);
            investment.setInvestmentAsset(investmentAsset);
            investment.setInvestmentDate(investmentDate);
            investment.setInvestmentPrice(investmentPrice);

            // Calculate initial returns (returns will be updated daily)
            investment.setReturns(0.0);

            investment.setUser(user);
            investmentRepository.save(investment);
            log.info("Investment saved successfully.");
        } else {
            log.error("User not found with username: " + username);
        }
    }


    //TODO:  Method to update returns daily
    @Scheduled(cron = "0 0 0 * * ?")
    public void updateReturns() {
        List<InvestmentEntity> investments = investmentRepository.findAll();

        for (InvestmentEntity investment : investments) {
            double currentPrice = assetPriceService.getCurrentPrice(investment.getInvestmentAsset());
            double returns = (currentPrice - investment.getInvestmentPrice()) * (investment.getInvestmentAmount() / investment.getInvestmentPrice());
            investment.setReturns(returns);
            investmentRepository.save(investment);
        }

        log.info("Investment returns updated.");
    }

    public List<PaymentEntity> getPaymentEntities(String username) {
        log.info("Retrieving payment entities for username: " + username);

        // Retrieve user by username
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<PaymentEntity> paymentEntities = user.getPaymentEntities();

            if (!paymentEntities.isEmpty()) {
                log.info("Payment entities retrieved successfully.");
                return paymentEntities;
            } else {
                log.info("No payment entities found for the user.");
                return Collections.emptyList();
            }
        } else {
            // Handle the case where the user is not found
            log.error("User not found with username: " + username);
            return Collections.emptyList();
        }
    }

    // Method to calculate total funds for a user
    public Double getTotalFunds(String username) {
        List<PaymentEntity> paymentEntities = getPaymentEntities(username);

        // Calculate total funds
        return paymentEntities.stream()
                .mapToDouble(PaymentEntity::getTotalFunds)
                .sum();
    }

    public List<PaymentEntity> getUserPayments(String username) {
        return paymentRepository.findByUserUsername(username);
    }

    public Payment createPayment(
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelUrl,
            String successUrl

    ) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.format(Locale.forLanguageTag("en-US"), "%.2f", total));


        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(payer);
        payment.setTransactions(transactions);


        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);

        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);

    }

    public Payment executePayment(
            String paymentId,
            String payerId)
            throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecution);
    }

}
