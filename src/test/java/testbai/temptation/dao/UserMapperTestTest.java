package testbai.temptation.dao;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.Assert;

import bai.temptation.dao.UserMapper;
import bai.temptation.entity.User;
import testbai.temptation.BaseTest;

public class UserMapperTestTest extends BaseTest {

	@Autowired
	private UserMapper userMapper;

	@Test
	public void insertUser() throws Exception {
		User user = userMapper.findByUsername("admin");
		Assert.assertNotNull(user);
		Assert.assertEquals(user.getPassword(), "admin");
	}
}
