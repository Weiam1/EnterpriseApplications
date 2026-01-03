package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.model.Cart;
import ehb.be.enterpriseapplications.model.User;

public interface CartService {

    Cart getCartByUser(User user);

    Cart addToCart(User user, Long productId, int quantity);

    Cart updateQuantity(User user, Long itemId, int quantity);

    void removeItem(User user, Long itemId);

    void clearCart(User user);
}
