package ehb.be.enterpriseapplications.repository;

import ehb.be.enterpriseapplications.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
