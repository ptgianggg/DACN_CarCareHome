package dacn.example.DACN.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "services")
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private Double originalPrice;

    private Integer discountPercentage;

    private String imageUrl;

    private String storeName;

    private String storeAddress;

    private String duration;

    private Boolean active;
}
