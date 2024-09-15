package com.microinvestify.server_microinvestify.Entity;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;



@Data
@Getter
@Setter
public class SellAssetRequest {
    private String asset;
    private double quantityToSell;
    private double sellPrice;

}
