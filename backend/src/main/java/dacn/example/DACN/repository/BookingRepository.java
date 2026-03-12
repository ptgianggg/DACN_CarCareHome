package dacn.example.DACN.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dacn.example.DACN.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
