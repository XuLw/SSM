package bai.temptation.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import bai.temptation.entity.User;

@Repository
public interface UserMapper {
	public abstract User findByUsername(String username);
}
