package com.microinvestify.server_microinvestify.Controller;

import com.microinvestify.server_microinvestify.Models.InvestmentRequest;
import com.microinvestify.server_microinvestify.Models.MakeIvestment;
import com.microinvestify.server_microinvestify.Models.SellFundsRequest;
import com.microinvestify.server_microinvestify.Service.Investment.InvestmentService;
import com.microinvestify.server_microinvestify.Entity.SellAssetRequest;
import com.microinvestify.server_microinvestify.execptions.InvestmentNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/investments")
public class InvestmentsController {

    @Autowired
    private InvestmentService investmentService;

    // Buy any asset
    @PostMapping("/invest-funds")
    public ResponseEntity<String> investFunds(@RequestBody InvestmentRequest request) {
        String result = investmentService.investFunds(
                request.getUsername(),
                request.getInvestmentAmount(),
                request.getInvestmentAsset(),
                request.getInvestmentDate(),
                request.getInvestmentPrice()
        );

        return ResponseEntity.ok(result);
    }

    // Sell any asset
    @PostMapping("/sell-funds")
    public ResponseEntity<String> sellFunds(@RequestBody SellFundsRequest sellFundsRequest) {
        String username = sellFundsRequest.getUsername();
        List<SellAssetRequest> assetsToSell = sellFundsRequest.getAssetsToSell();
        investmentService.sellFunds(username, assetsToSell);
        return ResponseEntity.ok("Investments sold successfully.");
    }

    @ExceptionHandler(InvestmentNotFoundException.class)
    public ResponseEntity<String> handleInvestmentNotFoundException(InvestmentNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @GetMapping("/investmented/{username}")
    public ResponseEntity<List<MakeIvestment>> getInvestmentDetails(@PathVariable String username) {
        try {
            // Fetch investment details for the user
            List<MakeIvestment> investmentDetails = investmentService.getInvestmentDetailsByUsername(username);

            if (investmentDetails.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList());
            }
            return ResponseEntity.ok(investmentDetails);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
