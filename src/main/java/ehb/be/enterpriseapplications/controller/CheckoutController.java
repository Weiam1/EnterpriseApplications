package ehb.be.enterpriseapplications.controller;

import ehb.be.enterpriseapplications.dto.CheckoutResponse;
import ehb.be.enterpriseapplications.service.CheckoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController {

    private final CheckoutService checkoutService;

    @PostMapping("/{userId}")
    public CheckoutResponse checkout(@PathVariable Long userId) {
        return checkoutService.checkout(userId);
    }
}
