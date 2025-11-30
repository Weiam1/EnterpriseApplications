package ehb.be.enterpriseapplications.service.impl;

import ehb.be.enterpriseapplications.dto.OrderResponse;
import ehb.be.enterpriseapplications.model.Order;
import ehb.be.enterpriseapplications.model.OrderItem;
import ehb.be.enterpriseapplications.repository.OrderItemRepository;
import ehb.be.enterpriseapplications.repository.OrderRepository;
import ehb.be.enterpriseapplications.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Order createOrder(Long userId) {
        throw new UnsupportedOperationException("Not implemented yet");
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
