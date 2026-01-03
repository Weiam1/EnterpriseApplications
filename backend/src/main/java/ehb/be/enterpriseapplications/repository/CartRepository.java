package ehb.be.enterpriseapplications.repository;
import ehb.be.enterpriseapplications.model.User;

import ehb.be.enterpriseapplications.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserId(Long userId);
    Optional<Cart> findByUser(User user);

}
