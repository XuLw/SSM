# LOG

## [环境搭建](https://www.cnblogs.com/iflytek/p/7096481.html)

1. maven 安装 配置 [官网下载](https://www.cnblogs.com/teach/p/5906425.html)

2. [mysql安装](https://www.cnblogs.com/reyinever/p/8551977.html)

3. [eclipse配置tomcat](http://www.cnblogs.com/2016-10-07/p/7298515.html)

## 框架学习要点

1. 主要需要配置的是 Spring ， mybatis， springMVC
	+ 单独配置Spring， mybatis
	+ mybatis + 到spring 有一个配置文件
	+ SpringMVC一个配置文件

2. web.xml 中指定配置文件

## BUG

#### 多注意版本问题 
>

+ [CHKJ3000E WAR](https://bgasparotto.com/chkj3000e-war-validation-failed-eclipse-error/)

+ [web.xml is missing and is set to true](https://blog.csdn.net/sinat_22911279/article/details/77454139)

+ [mysql忘记密码](https://blog.csdn.net/whimewcm/article/details/83621358)

+ java.sql.SQLException: validateConnection false : 跟数据库相关的，多数是驱动版本问题

+ Multiple Contexts have a path of 'xxxx' [server.xml有重复context项](https://blog.csdn.net/ivanzhangqf/article/details/50326533)

+ Null ModelAndView returned to DispatcherServlet with name 'springmvc': assuming 
	> SpringMVC 未找到 controller 原因：<context:component-scan base=package="" /> 与实际controller的位置不匹配

+ 单元测试 加载bean出错 ： @ContextConfiguration(locations = { configure file  }) locations 不能要写全称，不能写spring-*

+ javax.net.ssl.SSLException: closing inbound before receiving peer's close_notify : sqlUrl 加上参数 ： useSSL=false