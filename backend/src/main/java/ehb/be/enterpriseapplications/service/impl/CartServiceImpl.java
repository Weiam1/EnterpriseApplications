package ehb.be.enterpriseapplications.service.impl;

import ehb.be.enterpriseapplications.model.Cart;
import ehb.be.enterpriseapplications.model.CartItem;
import ehb.be.enterpriseapplications.model.Product;
import ehb.be.enterpriseapplications.model.User;
import ehb.be.enterpriseapplications.repository.CartItemRepository;
import ehb.be.enterpriseapplications.repository.CartRepository;
import ehb.be.enterpriseapplications.repository.ProductRepository;
import ehb.be.enterpriseapplications.repository.UserRepository;
import ehb.be.enterpriseapplications.service.CartService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;


    @Override
    @Transactional
    public Cart getCartByUser(User user) {

        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);

                    Cart savedCart = cartRepository.saveAndFlush(cart); // 🔥 مهم جدًا
                    return savedCart;
                });
    }


    @Override
    @Transactional

        public Cart addToCart(User user, Long productId, int quantity) {

        // 1️⃣ تأكد أن الـ Cart محفوظ وله ID
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.saveAndFlush(newCart);
                });
        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }


        // 2️⃣ المنتج
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 3️⃣ هل العنصر موجود؟
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (item == null) {
            item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setPriceAtThatTime(product.getPrice());

            cart.getItems().add(item);
        } else {
            item.setQuantity(item.getQuantity() + quantity);
        }

        // 4️⃣ احفظ cart (Cascade يحفظ items)
        return cartRepository.saveAndFlush(cart);

    }


    @Override
    public Cart updateQuantity(User user, Long itemId, int quantity) {

        Cart cart = getCartByUser(user);

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (quantity <= 0) {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }

        return cartRepository.save(cart);
    }


    @Override
    public void removeItem(User user, Long itemId) {

        Cart cart = getCartByUser(user);

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cart.getItems().remove(item);
        cartItemRepository.delete(item);

        cartRepository.save(cart);
    }



    @Override
    public void clearCart(User user) {
        Cart cart = getCartByUser(user);
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
