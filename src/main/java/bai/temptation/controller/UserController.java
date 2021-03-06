package bai.temptation.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import bai.temptation.entity.User;
import bai.temptation.service.IUserService;

@Controller
@RequestMapping(value = "/user")
public class UserController {
	@Autowired
	private IUserService userService;

	@RequestMapping("/view")
	public String view() {
		return "main/login";
	}

	@RequestMapping("/indexview")
	public String index() {
		return "main/dataCollect";
	}

	@RequestMapping("/datacollect")
	public String dataCollect() {
		return "main/dataCollect";
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ModelAndView login(User model, HttpSession session) {
		User user = userService.getUserByUsername(model.getUsername());

		if (user == null || !user.getPassword().equals(model.getPassword())) {
			return new ModelAndView("redirect:/login.jsp");
		} else {
			session.setAttribute("user", user);
			ModelAndView mav = new ModelAndView();
			mav.setViewName("index");
			return mav;
		}
	}
}
