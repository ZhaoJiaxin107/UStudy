window.onload = function () {
    // Get goodCourse and course type in top nav
    var goodCourse = document.getElementById('goodcourse');
    // console.log(goodCourse);
    var courseType = document.getElementById('coursetype');
    // console.log(courseType);
    // When mouse enter into goodCourse, display course type,
    // Otherwise hide courseType
    goodCourse.onmouseenter = function () {
        courseType.style.display = 'block';
    }
    courseType.onmouseleave = function () {
        this.style.display = 'none';
    }
    /* 
        Slide the mouse into the search icon to 
        display the entire search box
    */
    // get the search icon, search course and search box element
    var searchIcon = document.getElementById('searchIcon');
    var searchCourse = document.getElementById('searchCourse');
    var searchBox = document.getElementById('search');
    // console.log(searchIcon, searchCourse, searchBox);

    // When the mouse enter into the search icon, display the search box 
    // Onmouseenter will not trigger the event of parent element
    searchIcon.onmouseenter = function () {
        // display the search box, visiblity = visible
        searchBox.style.visibility = 'visible';
        searchCourse.style.visibility = 'visible';
        // auto focus ele.focus()
        searchCourse.focus();
    }

    // Click on the blank space, the search box disappears, leaving only the search icon
    // Consider stop propagation
    document.onclick = function (evs) {
        // Consider compatible
        var ev = window.event || evs;
        ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true;
        // searchBox disappears
        searchBox.style.visibility = 'hidden';
        searchCourse.style.visibility = 'hidden';
        // search icon displays
        searchIcon.style.visibility = 'visible';
    }

    /* 
       login verification
    */
    // Get form and em

    var registerForm = document.getElementById('registerform');
    var marks = registerForm.getElementsByTagName('em');
    // console.log(marks);
    // flag: true info right, flag:false info wrong
    var flag = true;
    // Get username 
    var username = registerform.username;
    // console.log(username);
    // phone regExp
    var userReg = /^1[3-9]\d{9}$/;

    judgeNull(username, marks[0], '请输入手机!');

    username.onchange = function () {
        // change color
        marks[0].style.color = '#FF6600';
        // judge regExp
        // if it is the wrong value
        if (!userReg.test(this.value)) {
            marks[0].innerHTML = '账号格式不正确!'
            flag = false;
        }
        else {
            marks[0].innerHTML = '<i class = "iconfont icon-dui1"></i>';
            flag = true;
        }
    }

    // Get password
    var password = registerForm.password;
    // console.log(password);

    judgeNull(password, marks[1], '请输入密码!');

    // password reg can be classified into low medium and high
    // low version: all number or all alphabets
    var lowReg = /^\d{6,18}$|^[a-zA-Z]{6,18}$/;
    // medium version: number + alphabets, first is letter
    var mediumReg = /(?!^[a-zA-Z]{6,18}$)^[a-zA-Z][0-9a-zA-Z]{5,17}$/;
    // high version: number + alphabets + symbols, first is letter
    var highReg = /(?!^[!@#$%^&*()_+-=]{6,18}$)(?!^\d{6,18}$)(?!^[a-zA-Z]{6,18}$)^[a-zA-Z][0-9a-zA-Z!@#$%^&*()_+-=]{5,17}$/;

    password.onchange = function () {
        // change color
        marks[1].style.color = '#ff6600';
        // first judge the length
        if (password.value.length < 6 || password.value.length > 18) {
            marks[1].innerHTML = '密码应该为6-20位之间!'
            flag = false;
        }
        // Judge three version of password
        if (lowReg.test(this.value)) {
            marks[1].innerHTML = '低';
            flag = true;
        } else if (mediumReg.test(this.value)) {
            marks[1].innerHTML = '中';
            flag = true;
        } else if (highReg.test(this.value)) {
            marks[1].innerHTML = '高';
            flag = true;
        } else {
            marks[1].innerHTML = '密码格式不正确!';
            flag = false;
        }
    }

    // Get confirmpassword
    var confirmPassword = registerForm.confirmpassword;
    // console.log(confirmPassword);

    judgeNull(confirmPassword, marks[2], '请再次输入密码!')

    // judge whether confirmPassword equals to password
    judgeEqual(confirmPassword, password, marks[2], '与原密码不一致!');
    // get verification
    var verification = registerForm.verification;
    // console.log(verification);
    // get random number button
    var randomCode = document.getElementById('code');
    // console.log(randomCode);
    var newCode = getRandomCode(5);
    randomCode.innerHTML = newCode;
    verificationEqual(verification, newCode, marks[3], '验证码错误!');
    // When click the randomCode button, generate new code
    randomCode.onclick = function () {
        newCode = getRandomCode(5);
        this.innerHTML = newCode;
        verificationEqual(verification, newCode, marks[3], '验证码错误!');
    }

    judgeNull(verification, marks[3], '请输入验证码!');

    // get message, getmessage
    var message = document.getElementById('message');
    var getMessage = document.getElementById('getmessage');
    // console.log(message);
    getMessage.onclick = function () {
        // get random random code
        var messageCode = getRandomCode(6);
        alert(messageCode);
        // judgeEqual(message, messageCode, marks[4],'验证码不正确!');
        verificationEqual(message, messageCode, marks[4], '验证码错误!');
    }
    judgeNull(message, marks[4], '请输入验证码!');

    /* 
     Store user data into local storage
    */
    // Determine whether the user array exists in the current cache.
    // If there is no array, create an array to store the data source

    var userArr = [{ username: '13322221111', password: '123456' }];
    if (!localStorage.userArr) {
        // use not exist, create userArr in cache
        localStorage.userArr = JSON.stringify(userArr);
    } else {
        // user exists, save existed user information
        userArr = JSON.parse(localStorage.userArr);
    }
    // console.log(localStorage);
    // console.log(userArr);

    // Get register button
    // var registerButton = registerForm.register;
    // console.log(registerButton);


    registerForm.onsubmit = function(){
        // If all the verification passes, user info correct
        console.log(flag);
        if(!flag) return false;
        // register user
        var username = registerForm.username.value;
        var password = registerForm.password.value;
        console.log(username, password);

        // save data -- as array 
        var userInfo = {
            username: username,
            password: password
        }
        // console.log(userInfo.username);

        // judge whether the user has registered
        // Traverse array to find whether to register
        for(var i = 0; i < userArr.length; i++){
            // console.log(userArr[i]);
            if(userArr[i].username == userInfo.username){
                alert('用户已注册, 请直接登录! 如果忘记密码, 请修改密码!');
                // window.location = './login.html';
                return false;
            }
        }
        // User has not been registered, register account
        userArr.push(userInfo);
        // console.log(userArr);

        // Save userInfo into cache
        localStorage.userArr = JSON.stringify(userArr);
        // console.log(localStorage);

        return false;
    }

    function judgeNull(name, mark, content) {
        name.onblur = function () {
            // if the value is '' 
            // console.log(username.value);
            if (this.value == '') {
                mark.innerHTML = content;
                mark.style.color = '#999999';
                flag = false;
            }
        }
    }

    function judgeEqual(pre, next, mark, content) {
        pre.onchange = function () {
            // change color
            mark.style.color = '#ff6600';

            if (this.value != next.value) {
                mark.innerHTML = content;
            } else {
                mark.innerHTML = '<i class = "iconfont icon-dui1"></i>';
            }
        }
    }

    function verificationEqual(pre, next, mark, content) {
        pre.onchange = function () {
            mark.style.color = '#ff6600';
            if (this.value != next) {
                mark.innerHTML = content;
                flag = false;
            } else {
                mark.innerHTML = '<i class = "iconfont icon-dui1"></i>';
                flag = true;
            }
        }
    }

    function getRandomCode(n) {
        // n: the digit that we want
        var str = '0123456789';
        // save random code
        var s = '';
        for (var i = 0; i < n; i++) {
            var num = Math.floor(Math.random() * str.length);
            s = s + str[num];
        }
        return s;
    }

}