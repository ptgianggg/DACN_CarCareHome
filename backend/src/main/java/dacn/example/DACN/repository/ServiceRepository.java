package dacn.example.DACN.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dacn.example.DACN.entity.ServiceEntity;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
}
