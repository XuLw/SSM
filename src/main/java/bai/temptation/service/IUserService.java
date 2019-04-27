package bai.temptation.service;

import org.springframework.stereotype.Repository;

import bai.temptation.entity.User;

@Repository
public interface IUserService {

	User getUserByUsername(String username);


}
