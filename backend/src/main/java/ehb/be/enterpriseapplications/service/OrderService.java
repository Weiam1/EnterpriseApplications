package ehb.be.enterpriseapplications.service;

import ehb.be.enterpriseapplications.dto.OrderResponse;
import ehb.be.enterpriseapplications.model.Order;
import ehb.be.enterpriseapplications.model.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user);

    List<OrderResponse> getOrdersByUser(Long userId);
}
