package com.microinvestify.server_microinvestify.Models;


import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockData {
    private String stock;
    private double price;
    private double change;


}