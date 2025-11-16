package ehb.be.enterpriseapplications.repository;

import ehb.be.enterpriseapplications.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
