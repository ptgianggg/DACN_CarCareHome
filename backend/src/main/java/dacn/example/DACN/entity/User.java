package dacn.example.DACN.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;

    private String phone;

    private String role;
}