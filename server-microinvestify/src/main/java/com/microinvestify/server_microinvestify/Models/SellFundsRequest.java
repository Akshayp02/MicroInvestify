package com.microinvestify.server_microinvestify.Models;


import com.microinvestify.server_microinvestify.Entity.SellAssetRequest;
import lombok.Data;

import java.util.List;

@Data
public class SellFundsRequest {
    private String username;  // The username of the person selling assets
    private List<SellAssetRequest> assetsToSell;
}
