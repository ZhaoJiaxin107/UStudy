window.onload = function(){
    // Get goodCourse and course type in top nav
    var goodCourse = document.getElementById('goodcourse');
    // console.log(goodCourse);
    var courseType = document.getElementById('coursetype');
    // console.log(courseType);
    // When mouse enter into goodCourse, display course type,
    // Otherwise hide courseType
    goodCourse.onmouseenter = function(){
        courseType.style.display = 'block';
    }
    courseType.onmouseleave = function(){
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
     searchIcon.onmouseenter = function(){
         // display the search box, visiblity = visible
         searchBox.style.visibility = 'visible';
         searchCourse.style.visibility = 'visible';
         // auto focus ele.focus()
         searchCourse.focus();
     }
 
     // Click on the blank space, the search box disappears, leaving only the search icon
     // Consider stop propagation
     document.onclick = function(evs){
         // Consider compatible
         var ev = window.event || evs;
         ev.stopPropagation ? ev.stopPropagation():ev.cancelBubble = true;
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
    // Get username 
    var username = registerform.username;
    // console.log(username);
    // phone regExp
    var userReg = /^1[3-9]\d{9}$/;
    
    judgeNull(username, marks[0], '请输入手机!');

    username.onchange = function(){
        // judge regExp
        // if it is the wrong value
        if(!userReg.test(this.value)){
            marks[0].innerHTML = '账号格式不正确!';
            marks[0].style.color = '#FF6600';
        }
        else{
            marks[0].innerHTML = '<i class = "iconfont icon-dui1"></i>'
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
    var mediumReg  = /(?!^[a-zA-Z]{6,18}$)^[a-zA-Z][0-9a-zA-Z]{5,17}$/;
    // high version: number + alphabets + symbols, first is letter
    var highReg = /(?!^[!@#$%^&*()_+-=]{6,18}$)(?!^\d{6,18}$)(?!^[a-zA-Z]{6,18}$)^[a-zA-Z][0-9a-zA-Z!@#$%^&*()_+-=]{5,17}$/;

    password.onchange = function(){
        // change color
        marks[1].style.color = '#ff6600';
        // first judge the length
        if(password.value.length < 6 || password.value.length > 18){
            marks[1].innerHTML = '密码应该为6-20位之间!'
            return false;
        }
        // if it is low version
        if(lowReg.test(this.value)){
            marks[1].innerHTML = '低';
        }else if(mediumReg.test(this.value)){
            marks[1].innerHTML = '中';
        }else if(highReg.test(this.value)){
            marks[1].innerHTML = '高';
        }else{
            marks[1].innerHTML = '密码格式不正确!';
        }
    }







    function judgeNull(name, mark, content){
        name.onblur = function(){
            // if the value is '' 
            // console.log(username.value);
            if(this.value == ''){
                mark.innerHTML = content;
                mark.style.color = '#999999';
            }
        }
    }
    
}