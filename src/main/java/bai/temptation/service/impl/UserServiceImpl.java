package bai.temptation.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bai.temptation.dao.UserMapper;
import bai.temptation.entity.User;
import bai.temptation.service.IUserService;

@Service("userService")
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserMapper userMapper;

	@Override
	public User getUserByUsername(String username) {
		if (null == username || "".equals(username))
			return null;

		User user = userMapper.findByUsername(username);

		return user;
	}

}
