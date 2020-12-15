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
        login localStorage
    */
    // When login, get userArr, verify if obj exists in userArr

    // get localStorage
    // console.log(localStorage.userArr);

    // transform into JS data
    var userArr = JSON.parse(localStorage.userArr);
    // console.log(userArr);

    // get form
    var loginForm = document.getElementById('loginform');
    // console.log(loginForm);

    // click login button, onsubmit event
    loginForm.onsubmit = function () {

        // get input value
        var username = loginForm.username.value;
        var password = loginForm.password.value;
        // console.log(username, password);

        var loginInfo = {
            'username': username,
            'password': password
        }

        // console.log(username);

        // Judge whether the user exists
        if (localStorage.userArr.indexOf(username) == -1) {
            // User does not exists
            alert('用户未注册, 请先注册');
            // Jump to the register page
            location.href = './register.html';
        } else {
            // User exists
            // if it is not exists, return -1, else return index
            if (localStorage.userArr.indexOf(JSON.stringify(loginInfo)) == -1) {
                alert('密码错误, 请重新输入');
            } else {
                // console.log('手机号和密码都正确 可以登录');
                // Save username, password, loginState in localStorage
                localStorage.username = username;
                localStorage.password = password;
                localStorage.loginState = true;

                // Jump to the index page
                window.location.href = '../index.html';
            }
        }

        // Judge whether loginInfo exists by tranversing userArr
        // Whether username and password match
        /* for(var i = 0; i < userArr.length; i++){
            if(userArr[i].username == username){
                // has registered
                if(userArr[i].password == password){
                    // can login
                    localStorage.username = username;
                    localStorage.password = password;
                    localStorage.loginState = true;

                    // Jump to the index page
                    window.location.href = '../index.html';
                    return false;
                }else{
                    // incorrect password
                    alert('用户密码错误, 请重新输入');
                    return false;
                }
            }
        }

        // not register
        alert('用户未注册,请先注册'); */

        // prevent submit
        return false;
    }

}