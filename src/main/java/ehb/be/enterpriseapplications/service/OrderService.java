package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.dto.OrderResponse;
import ehb.be.enterpriseapplications.model.Order;

import java.util.List;

public interface OrderService {

    Order createOrder(Long userId);

    List<OrderResponse> getOrdersByUser(Long userId);
}
