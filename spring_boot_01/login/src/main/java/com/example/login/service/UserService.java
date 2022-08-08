package com.example.login.service;

import com.example.login.dto.UserDto;
import com.example.login.exception.NotFoundException;
import com.example.login.mapper.UserMapper;
import com.example.login.model.User;
import com.example.login.request.LoginRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    List<User> userList = new ArrayList<>();


    public UserService() {
        userList.add(new User(1, "root1", "root1@gmail.com", "111111", "root1.png"));
        userList.add(new User(2, "root2", "root2@gmail.com", "222222", "root2.png"));
        userList.add(new User(3, "root3", "root3@gmail.com", "333333", "root3.png"));
        userList.add(new User(4, "root4", "root4@gmail.com", "444444", "root4.png"));
        userList.add(new User(5, "root5", "root5@gmail.com", "555555", "root5.png"));
        userList.add(new User(6, "root6", "root6@gmail.com", "777777", "root6.png"));
    }
    public UserDto getUserInfo(LoginRequest request) {
        User user = checkLogin(request).orElseThrow(() -> {
            throw new NotFoundException("user doesn't exist");
        });
        return UserMapper.toDto(user);
    }

    public Optional<User> checkLogin(LoginRequest request){
        String name = request.getUserName();
        String pass = request.getPassword();
        return userList.stream()
                .filter(user -> user.getUserName().equals(name) && user.getPassword().equals(pass))
                .findFirst();
    }
}
