package com.microinvestify.server_microinvestify.Controller;


import com.microinvestify.server_microinvestify.Entity.InvestmentEntity;
import com.microinvestify.server_microinvestify.Repository.InvestmentRepository;
import com.microinvestify.server_microinvestify.Service.Investment.AssetPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    @Autowired
    private AssetPriceService assetPriceService;

    @Autowired
    private InvestmentRepository investmentRepository;

    // Endpoint to get the current price of an asset
    @GetMapping("/price/{asset}")
    public ResponseEntity<Double> getCurrentPrice(@PathVariable String asset) {
        double currentPrice = assetPriceService.getCurrentPrice(asset);
        return ResponseEntity.ok(currentPrice);
    }

    // Endpoint to calculate returns based on investment price and current price
    @GetMapping("/returns/{investmentId}")
    public ResponseEntity<Double> calculateReturns(@PathVariable Long investmentId) {
        InvestmentEntity investment = investmentRepository.findById(investmentId).orElse(null);
        if (investment == null) {
            return ResponseEntity.notFound().build();
        }
        double currentPrice = assetPriceService.getCurrentPrice(investment.getInvestmentAsset());
        double returns = (currentPrice - investment.getInvestmentPrice()) * (investment.getInvestmentAmount() / investment.getInvestmentPrice());
        return ResponseEntity.ok(returns);
    }
}
