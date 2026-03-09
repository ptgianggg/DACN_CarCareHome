package dacn.example.DACN.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dacn.example.DACN.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}