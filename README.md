### 优学在线

优学在线是使用HTML、CSS和Javascript的制作的网站<br>

数据存储在6个不同的json文件中，我们通过Ajax获取数据<br>

我们在这个项目中不使用数据库<br>

用户的登录注册信息存储在localStorage中

### 功能

#### 所有页面

* 顶部导航部分：当鼠标移动到精品课程时出现下拉列表，当鼠标离开时, 下拉列表消失。

* 搜索部分：当鼠标移动到放大镜时，出现搜索框，当用户单击页面的空白时，搜索框消失。


#### 首页

* 轮播图：图片自动播放，点击左箭头/右箭头/下方小方块，切换到对应的图片

* 热门直播：鼠标滑入不同的标题，切换到不同的图片

* 精品网课/免费课程/就业面授班：鼠标滑入到不同的选项，显示相应的课程。(选项卡功能)

* 返回顶部

* 判断本地缓存的手机号和密码是否都存在, 如果都存在显示已经登录和显示个人中心; 如果其中有一项不存在则状态为未登录, 显示登录注册按钮

#### 注册页

* 如果输入框为空，则提示请输入相应内容

* 正则判断手机号，如果错误则提示格式不正确, 正确则显示正确

* 正则判断密码，密码分为低、中、高三档, 如果错误则提示格式不正确, 正确则显示低、中、高

* 确认密码需要和密码一样，如果错误则提示与原密码不一致, 正确则显示正确

* 随机数产生验证码，如果错误提示验证码错误, 正确则显示正确

* 点击免费获取短信产生短信验证，如果错误提示验证码错误, 正确则显示正确

* 如果所有条件通过则注册

* 注册的时候，在缓存中有一个数组，存储当前创建的账户信息

#### 登录页

* 获取存在于缓存中的用户信息数组， 验证对象是否在数组中存在

#### 播放页

* 视频显示

* 点击视频列表，切换到对应视频，设置相应样式

* 白天模式与黑夜模式切换

* 倍速播放

* 显示评论，上一页、下一页切换，输入页数，跳转到对应页面

* 判断用户是否登录，如果登录，则可以添加评论，否则先登录

* 添加评论可以实名评论和匿名评论

* 判断本地缓存的手机号和密码是否都存在, 如果都存在显示已经登录和显示个人中心; 如果其中有一项不存在则状态为未登录, 显示登录注册按钮

#### 列表页

* 分页显示所有课程信息, 并可以切换上一页，下一页，首页，尾页和不同页码

* 筛选免费课程和付费课程

* 筛选不同价格区间的课程

* 判断本地缓存的手机号和密码是否都存在, 如果都存在显示已经登录和显示个人中心; 如果其中有一项不存在则状态为未登录, 显示登录注册按钮

* 返回顶部

###  UStudy

UStudy web pages using HTML, CSS and Javascript<br>
Data is stored in 6 different json files and we get data by Ajax<br>
We do not use database in this project

### Functions 
#### All pages
* Top navigation section: The drop-down list appears when the mouse move into the excellent course and disappears when mouse leave

* Search section: When the mouse moves into the magnifying glass, the search box appears, and the search box disappears when user click the blank of the page

#### Index Page
* Rotation Chart: Click the left arrow |right arrow |small box below to switch to the corresponding images

* Hot live broadcast: the mouse slides into different titles and the switches to different pictures

* Online courses | Free Courses | Job Courses: the mouse slides to different options, the section displays corresponding courses

* Go back to top

* Judge whether the phone number and password of the local storage exist. If both of them exist, it will display the login and personal center; if one of them does not exist, the status will be not logged in and the login and registration will be displayed

#### Registration page

* If the input box is empty, you will be prompted to enter the corresponding content

* Regular judgment mobile phone number, if wrong, alert format is not correct, otherwise alert correct

* The password is divided into three levels: low, medium and high. If it is wrong, alert format is incorrect, and if it is correct, alert low, medium and high

* The confirmation password needs to be the same as the password. If it is wrong, it will prompt that it is inconsistent with the original password. If it is correct, alert correct

* Random number generates verification code, if error prompt verification code error, otherwise alert correct

* Click 'get SMS for free' button to generate SMS verification. If error prompts that the verification code is wrong, otherwise alert correct

* Register if all conditions pass

* When registering, there is an array in the cache to store and the account information can be created

#### Login page

* Get the user information array in the cache and verify whether the object exists in the array


#### Broadcast page

* Video display

* Click the video list to switch to the corresponding video and set the corresponding style

* Switch between day mode and night mode

* Double speed playback

* Display comments, shift between the previous page and the next page, input the number of pages, and jump to the corresponding page

* Judge whether the user is logged in. If so, you can add comments. Otherwise, log in first

* Comments can be real name comments and anonymous comments

* Judge whether the phone number and password of the local cache exist. If both of them exist, it will display the login and personal center; if one of them does not exist, the status will be not logged in and the login registration button will be displayed

#### List page

* Pagination display all course information which can be switched by the previous page, the next page, the first page, the last page and different page numbers

* Filter free and paid courses

* Filter courses with different price ranges

* Judge whether the phone number and password of the local cache exist. If both of them exist, it will display the login and personal center; if one of them does not exist, the status will be not logged in and the login registration button will be displayed

* Go back to the top