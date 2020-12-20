### 优学在线

优学在线是使用HTML、CSS和Javascript的制作的网站<br>

数据存储在6个不同的json文件中，我们通过Ajax获取数据。<br>

我们在这个项目中不使用数据库。<br>

用户的登录注册信息存储在localStorage中

### 功能

#### 所有页面

* 顶部导航部分：当鼠标移动到精品课程时出现下拉列表，当鼠标离开时, 下拉列表消失。

* 搜索部分：当鼠标移动到放大镜时，出现搜索框，当用户单击页面的空白时，搜索框消失。

* 如果没有登录, 则显示登录注册, 如果登录则显示个人中心和退出

#### 首页

* 轮播图：图片自动播放，点击左箭头/右箭头/下方小方块，切换到对应的图片

* 热门直播：鼠标滑入不同的标题，切换到不同的图片

* 精品网课/免费课程/就业面授班：鼠标滑入到不同的选项，显示相应的课程。(选项卡功能)

* 返回顶部

#### 注册页

* 如果输入框为空，则提示请输入相应内容

* 正则判断手机号，如果错误则提示格式不正确, 正确则显示正确

* 正则判断密码，密码分为低、中、高三档, 如果错误则提示格式不正确, 正确则显示低、中、高

* 确认密码需要和密码一样，如果错误则提示与原密码不一致, 正确则显示正确

* 随机数产生验证码，如果错误提示验证码错误, 正确则显示正确

* 点击免费获取短信产生短信验证，如果错误提示验证码错误, 正确则显示正确

* 如果所有条件通过则注册

* 注册的时候, 在缓存中有一个数组 ，存储当前创建的账户信息

###  UStudy

UStudy web pages using HTML, CSS and Javascript<br>
Data is stored in 6 different json files and we get data by Ajax.<br>
We do not use database in this project.

### Functions 
#### All pages
* Top navigation section: The drop-down list appears when the mouse move into the excellent course and disappears when mouse leave.

* Search section: When the mouse moves into the magnifying glass, the search box appears, and the search box disappears when user click the blank of the page.

* If the user does not login, display login and registration, otherwise display personal center and logout.(localStorage) 

#### Index Page
* Rotation Chart: Click the left arrow |right arrow |small box below to switch to the corresponding images

* Hot live broadcast: the mouse slides into different titles and the switches to different pictures

* Online courses | Free Courses | Job Courses: the mouse slides to different options, the section displays corresponding courses.

* Go back to top

#### Registration page

* If the input box is empty, you will be prompted to enter the corresponding content

* Regular judgment mobile phone number, if wrong, alert format is not correct, otherwise alert correct

* The password is divided into three levels: low, medium and high. If it is wrong, alert format is incorrect, and if it is correct, alert low, medium and high

* The confirmation password needs to be the same as the password. If it is wrong, it will prompt that it is inconsistent with the original password. If it is correct, alert correct

* Random number generates verification code, if error prompt verification code error, otherwise alert correct

* Click 'get SMS for free' button to generate SMS verification. If error prompts that the verification code is wrong, otherwise alert correct

* Register if all conditions pass

* When registering, there is an array in the cache to store and the account information can be created.

