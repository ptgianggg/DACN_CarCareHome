package dacn.example.DACN.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dacn.example.DACN.repository.UserRepository;
import dacn.example.DACN.entity.User;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User save(User user){
        return userRepository.save(user);
    }
}