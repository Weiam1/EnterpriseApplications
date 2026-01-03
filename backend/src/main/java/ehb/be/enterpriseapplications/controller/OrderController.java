package ehb.be.enterpriseapplications.controller;

import ehb.be.enterpriseapplications.dto.OrderResponse;
import ehb.be.enterpriseapplications.model.Order;
import ehb.be.enterpriseapplications.model.User;
import ehb.be.enterpriseapplications.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    public OrderResponse createOrder(@RequestParam Long userId) {
        Order order = orderService.createOrder(userId);
        return mapToResponse(order);
    }


    @GetMapping
    public List<OrderResponse> getUserOrders(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return orderService.getOrdersByUser(user.getId());
    }


    private OrderResponse mapToResponse(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getCreatedAt(),
                order.getTotalPrice(),
                order.getItems().stream()
                        .map(item -> new OrderResponse.ItemInfo(
                                item.getProduct().getName(),
                                item.getQuantity(),
                                item.getPrice()
                        ))
                        .toList()
        );
    }
}
