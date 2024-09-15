package com.microinvestify.server_microinvestify.Models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class InvestmentRequest {

    private String username;
    private Double investmentAmount;
    private String investmentAsset;
    private LocalDate investmentDate = LocalDate.now();
    private Double investmentPrice;

//



}

