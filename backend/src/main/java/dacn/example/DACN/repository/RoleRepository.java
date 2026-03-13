package dacn.example.DACN.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dacn.example.DACN.entity.Role;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
