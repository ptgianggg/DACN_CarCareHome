package dacn.example.DACN.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import dacn.example.DACN.service.AuthService;
import dacn.example.DACN.entity.User;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        authService.register(user);
        return "Register success";
    }
}