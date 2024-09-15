package com.microinvestify.server_microinvestify.Controller;

import com.microinvestify.server_microinvestify.Entity.PaymentEntity;
import com.microinvestify.server_microinvestify.Models.PaymentRequest;
import com.microinvestify.server_microinvestify.Service.Payment.PaymentService;
import com.microinvestify.server_microinvestify.Service.UserServiceImp;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.http.HttpClient;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    private UserServiceImp userServiceImp;

    private String username;

    @PostMapping("/create")
    public String createPayment(@RequestBody PaymentRequest paymentRequest) {
        try {

            username = paymentRequest.getUsername();
            log.info("Received username: " + username);


            String cancelUrl = "http://localhost:8080/api/payments/cancel";
            String successUrl = "http://localhost:8080/api/payments/success";

            Payment payment = paymentService.createPayment(
                    Double.valueOf(paymentRequest.getAmount()),
                    paymentRequest.getCurrency(),
                    paymentRequest.getMethod(),
                    "sale",
                    "Add Funds to Wallet",
                    cancelUrl,
                    successUrl
            );

            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    return "redirect:" + links.getHref();
                }
            }
        } catch (PayPalRESTException e) {
            log.error("Error during payment creation", e);
            return "error: " + e.getMessage(); // Return detailed error message to client
        }
        return "error: Payment could not be initiated.";
    }


    @GetMapping("/success")
    public String successPay(@RequestParam("paymentId") String paymentId,
                             @RequestParam("PayerID") String payerId) {
        try {
            // Execute payment with PayPal service
            Payment payment = paymentService.executePayment(paymentId, payerId);

            if ("approved".equalsIgnoreCase(payment.getState())) {
                // Extract payment amount from the payment object
                Double paymentAmount = Double.valueOf(payment.getTransactions().get(0).getAmount().getTotal());
                paymentService.saveOrUpdatePayment(paymentId, payerId, paymentAmount, username);

                return "Payment Success";
            } else {
                log.error("Payment not approved. State: " + payment.getState());
                return "Payment not approved";
            }
        } catch (PayPalRESTException e) {
            // Log error and redirect to a failure page
            log.error("Error occurred during payment execution", e);
            return "error: " ;
        }
    }


    @GetMapping("/cancel")
    public String cancelPay() {
        return  "Payment Cancelled";
    }

    @GetMapping("/error")
    public String errorPay() {
        return "Payment Error";
    }

    @GetMapping("/payments-history/{username}")
    public ResponseEntity<List<PaymentEntity>> getPaymentsByUsername(@PathVariable String username) {
        List<PaymentEntity> paymentEntities = paymentService.getPaymentEntities(username);
        if (paymentEntities.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(paymentEntities);
    }

//    // Endpoint to fetch total funds for a user
//    @GetMapping("/total-funds/{username}")
//    public ResponseEntity<Double> getTotalFunds(@PathVariable String username) {
////        Double totalFunds = paymentService.getTotalFunds(username);
//       Double totalFunds = paymentService.getTotalFunds(username);
//        if (totalFunds == null || totalFunds == 0) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(totalFunds);
//    }


}
