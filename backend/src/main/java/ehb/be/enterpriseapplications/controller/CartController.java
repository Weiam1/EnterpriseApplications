package ehb.be.enterpriseapplications.controller;

import ehb.be.enterpriseapplications.model.Cart;
import ehb.be.enterpriseapplications.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ehb.be.enterpriseapplications.model.User;
import org.springframework.security.core.Authentication;

import java.security.Principal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(
                cartService.getCartByUser(user)
                );
    }
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(
            Authentication authentication,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") int quantity,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate
    ) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(
                cartService.addToCart(user, productId, quantity, startDate, endDate)
        );

    }



    @PutMapping("/update")
    public ResponseEntity<Cart> updateQuantity(
            Authentication authentication,
            @RequestParam Long itemId,
            @RequestParam int quantity
    ) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(
                cartService.updateQuantity(user, itemId, quantity)
        );
    }


    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeItem(
            Authentication authentication,
            @RequestParam Long itemId
    ) {
        User user = (User) authentication.getPrincipal();
        cartService.removeItem(user, itemId);
        return ResponseEntity.noContent().build();
    }


}



