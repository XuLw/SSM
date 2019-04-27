package bai.temptation.dao;

import bai.temptation.entity.User;

public interface UserMapper {
	public abstract User findByUsername(String username);
}
