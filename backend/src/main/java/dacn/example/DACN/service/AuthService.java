package dacn.example.DACN.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dacn.example.DACN.entity.User;
import dacn.example.DACN.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user){
        return userRepository.save(user);
    }

}