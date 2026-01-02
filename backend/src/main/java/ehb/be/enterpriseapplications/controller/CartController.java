package ehb.be.enterpriseapplications.controller;

import ehb.be.enterpriseapplications.model.Cart;
import ehb.be.enterpriseapplications.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") int quantity
    ) {
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }

    @PutMapping("/update")
    public ResponseEntity<Cart> updateQuantity(
            @RequestParam Long userId,
            @RequestParam Long itemId,
            @RequestParam int quantity
    ) {
        return ResponseEntity.ok(cartService.updateQuantity(userId, itemId, quantity));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeItem(
            @RequestParam Long userId,
            @RequestParam Long itemId
    ) {
        cartService.removeItem(userId, itemId);
        return ResponseEntity.ok("Item removed");
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok("Cart cleared");
    }
}
