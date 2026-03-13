package dacn.example.DACN.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class BookingRequest {

    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String vehicleType;
    private String vehiclePlate;
    private String serviceType;
    private LocalDate bookingDate;
    private LocalTime bookingTime;
    private String branchName;
    private String note;
    private String status;
    private BigDecimal totalPrice;
}
