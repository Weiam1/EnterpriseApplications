package ehb.be.enterpriseapplications.controller;

import ehb.be.enterpriseapplications.dto.CheckoutResponse;
import ehb.be.enterpriseapplications.model.User;
import ehb.be.enterpriseapplications.service.CheckoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController {

    private final CheckoutService checkoutService;

    @PostMapping
    public CheckoutResponse checkout(Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        return checkoutService.checkout(user.getId());
    }

}
