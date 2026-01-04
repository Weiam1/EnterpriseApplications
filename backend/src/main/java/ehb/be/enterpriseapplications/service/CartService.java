package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.model.Cart;
import ehb.be.enterpriseapplications.model.User;

import java.time.LocalDate;

public interface CartService {

    Cart getCartByUser(User user);

    Cart addToCart(User user, Long productId, int quantity, LocalDate startDate, LocalDate endDate);

    Cart updateQuantity(User user, Long itemId, int quantity);

    void removeItem(User user, Long itemId);

    void clearCart(User user);
}
