package ehb.be.enterpriseapplications.service.impl;

import ehb.be.enterpriseapplications.dto.OrderResponse;
import ehb.be.enterpriseapplications.model.Cart;
import ehb.be.enterpriseapplications.model.CartItem;
import ehb.be.enterpriseapplications.model.Order;
import ehb.be.enterpriseapplications.model.OrderItem;
import ehb.be.enterpriseapplications.repository.CartItemRepository;
import ehb.be.enterpriseapplications.repository.CartRepository;
import ehb.be.enterpriseapplications.repository.OrderItemRepository;
import ehb.be.enterpriseapplications.repository.OrderRepository;
import ehb.be.enterpriseapplications.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;


    @Override
    public Order createOrder(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Your cart is empty");
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setCreatedAt(LocalDateTime.now());
        order.setTotalPrice(0.0);

        orderRepository.save(order);

        double total = 0.0;

        for (CartItem ci : cart.getItems()) {
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(ci.getProduct());
            oi.setQuantity(ci.getQuantity());
            oi.setPrice(ci.getProduct().getPrice() * ci.getQuantity());

            total += oi.getPrice();

            orderItemRepository.save(oi);
            order.getItems().add(oi);

        }

        order.setTotalPrice(total);
        orderRepository.save(order);

        List<CartItem> itemsToDelete = new ArrayList<>(cart.getItems());
        cart.getItems().clear();
        cartRepository.save(cart); // update cart first

        cartItemRepository.deleteAll(itemsToDelete);


        return order;
    }

    @Override
    public List<OrderResponse> getOrdersByUser(Long userId) {

        List<Order> orders = orderRepository.findByUserId(userId);

        return orders.stream()
                .map(order -> new OrderResponse(
                        order.getId(),
                        order.getCreatedAt(),
                        order.getTotalPrice(),
                        order.getItems().stream()
                                .map(item -> new OrderResponse.ItemInfo(
                                        item.getProduct().getName(),
                                        item.getQuantity(),
                                        item.getPrice()
                                )).collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }
}
