package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.model.Cart;

public interface CartService {

    Cart getCartByUser(Long userId);

    Cart addToCart(Long userId, Long productId, int quantity);

    Cart updateQuantity(Long userId, Long itemId, int quantity);

    void removeItem(Long userId, Long itemId);

    void clearCart(Long userId);
}
