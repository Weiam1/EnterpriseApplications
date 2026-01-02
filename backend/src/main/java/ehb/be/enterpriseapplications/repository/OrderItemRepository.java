package ehb.be.enterpriseapplications.repository;

import ehb.be.enterpriseapplications.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
