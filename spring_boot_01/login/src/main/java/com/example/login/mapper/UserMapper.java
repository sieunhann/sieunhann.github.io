package com.example.login.mapper;

import com.example.login.dto.UserDto;
import com.example.login.model.User;

public class UserMapper {
    public static UserDto toDto(User user){
        UserDto userDto = new UserDto();
        userDto.setUserName(user.getUserName());
        userDto.setEmail(user.getEmail());
        userDto.setAvatar(user.getAvatar());
        return userDto;
    }
}
