package dacn.example.DACN.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dacn.example.DACN.dto.BookingRequest;
import dacn.example.DACN.entity.Booking;
import dacn.example.DACN.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    public Booking createBooking(BookingRequest request) {
        Booking booking = new Booking();
        mapRequestToEntity(request, booking);
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, BookingRequest request) {
        Booking booking = getBookingById(id);
        mapRequestToEntity(request, booking);
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        Booking booking = getBookingById(id);
        bookingRepository.delete(booking);
    }

    private void mapRequestToEntity(BookingRequest request, Booking booking) {
        booking.setCustomerName(request.getCustomerName());
        booking.setCustomerPhone(request.getCustomerPhone());
        booking.setCustomerEmail(request.getCustomerEmail());
        booking.setVehicleType(request.getVehicleType());
        booking.setVehiclePlate(request.getVehiclePlate());
        booking.setServiceType(request.getServiceType());
        booking.setBookingDate(request.getBookingDate());
        booking.setBookingTime(request.getBookingTime());
        booking.setBranchName(request.getBranchName());
        booking.setNote(request.getNote());
        booking.setStatus(request.getStatus());
        booking.setTotalPrice(request.getTotalPrice());
    }
}
