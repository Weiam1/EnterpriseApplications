package ehb.be.enterpriseapplications.repository;

import ehb.be.enterpriseapplications.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
