package ehb.be.enterpriseapplications.service.impl;

import ehb.be.enterpriseapplications.dto.CheckoutResponse;
import ehb.be.enterpriseapplications.model.*;
import ehb.be.enterpriseapplications.repository.CartRepository;
import ehb.be.enterpriseapplications.repository.OrderItemRepository;
import ehb.be.enterpriseapplications.repository.OrderRepository;
import ehb.be.enterpriseapplications.service.CheckoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CheckoutServiceImpl implements CheckoutService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public CheckoutResponse checkout(User user) {

        // 1. Get user's cart
        Cart cart = cartRepository.findByUser(user).orElse(null);


        if (cart == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Your cart is empty.");
        }

        // 2. Create new Order
        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setTotalPrice(0.0);

        orderRepository.save(order);

        double totalPrice = 0.0;

        // 3. Convert CartItems → OrderItems
        for (CartItem cartItem : cart.getItems()) {

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());

            totalPrice += orderItem.getPrice();

            orderItemRepository.save(orderItem);
        }

        // 4. Update order total price
        order.setTotalPrice(totalPrice);
        orderRepository.save(order);

        // 5. Clear the cart (Option A)
        cart.getItems().clear();
        cartRepository.save(cart);

        // 6. Return response
        return new CheckoutResponse(
                order.getId(),
                totalPrice,
                "Order completed successfully!"
        );
    }
}
