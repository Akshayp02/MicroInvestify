package com.microinvestify.server_microinvestify.Models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Data
@Setter
@Getter
public class MakeIvestment {
    private String username;
    private Double investmentAmount;
    private String investmentAsset; // stock symbol or cryptocurrency name
    private LocalDate investmentDate;
    private Double investmentPrice;
    private Double quantity;
    private Double returns;
    private double profit;
    private double sellPrice;
    private LocalDate sellDate;
    private double quantityToSell;
}
