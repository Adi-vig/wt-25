package com.billapp.Billapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BillController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @PostMapping("/calculate")
    @ResponseBody
    public Map<String, Object> calculateBill(@RequestParam int units) {
        double bill = 0;

        if (units <= 50) {
            bill = units * 3.50;
        } else if (units <= 150) {
            bill = (50 * 3.50) + ((units - 50) * 4.00);
        } else if (units <= 250) {
            bill = (50 * 3.50) + (100 * 4.00) + ((units - 150) * 5.20);
        } else {
            bill = (50 * 3.50) + (100 * 4.00) + (100 * 5.20) + ((units - 250) * 6.50);
        }

        System.out.println("Calculated bill: " + bill);

        Map<String, Object> response = new HashMap<>();
        response.put("bill", String.format("%.2f", bill)); // Return as formatted string
        return response;
    }
}
