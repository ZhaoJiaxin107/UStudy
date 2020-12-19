window.onload = function () {

    // Get local storage
    //console.log(localStorage);

    if (!localStorage.username && !localStorage.password) {
        console.log('未登录');
        localStorage.loginState = false;
    } else {
        console.log('已登录');
        localStorage.loginState = true;
    }
    // generate template
    var html = template('login', localStorage);

    // append father element
    var notLogin = document.getElementById('notlogin');
    notLogin.innerHTML = html;

    // click exit button
    if (localStorage.loginState == 'true') {
        // click exit button, log out
        var logout = document.getElementById('logout');
        // console.log(logout);

        // add click event
        logout.onclick = function () {
            // logout
            localStorage.username = '';
            localStorage.password = '';
            localStorage.loginState = false;

            // refresh
            location.reload();
        }

    }
    // Get goodCourse and course type in top nav
    var goodCourse = document.getElementById('goodcourse');
    // console.log(goodCourse);
    var courseType = document.getElementById('coursetype');
    // console.log(courseType);
    // When mouse enter into goodCourse, display course type,
    // Otherwise hide courseType
    goodCourse.onmouseenter = function () {
        // buffMove(courseType, {'opacity' : 1})
        courseType.style.opacity = 1;
    }
    courseType.onmouseleave = function () {
        
        this.style.opacity = 0;
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
            Rate change section, click rate. the broadcasting speed shift to 
            corresponding rate
        */
    var rateChangeLink = document.getElementById('ratechangelink');
    var rateChangeList = document.querySelector('.ratechangelist');



    //When mouse enter into ratechangelink, display 
    //rateChangelist
    rateChangeLink.onmouseenter = function () {
        rateChangeList.style.display = 'block';
    }
    // When mouse leave, hide rate change list
    rateChangeList.onmouseleave = function () {
        this.style.display = 'none';
    }

    // Get video element
    var videoList = document.getElementById('videolist');
    // console.log(videoList);
    var video = videoList.getElementsByTagName('video')[0];
    // canpplay event
    video.oncanplay = function () {

    }
    // Get all rate button
    var rates = rateChangeList.getElementsByTagName('li');
    // console.log(rates[0]);

    var times = [1, 1.2, 1.35, 1.5, 1.6, 1.8, 2.0];
    var timesLabel = ['x 1倍', 'x 1.2倍', 'x 1.35倍', 'x 1.5倍',
        'x 1.6倍', 'x 1.8倍', 'x 2.0倍'];
    // Give function to each rate

    for (var i = 0; i < rates.length; i++) {
        rateClick(rates[i], times[i]);
    }

    video.onratechange = function () {
        // video.load(); //refresh
        video.play();
    }


    function rateClick(ele, time) {
        ele.onclick = function () {
            video.playbackRate = time;
            // exlusive
            for (var k = 0; k < rates.length; k++) {
                rates[k].style.backgroundColor = '';
                rates[k].innerHTML = timesLabel[k];
            }
            this.style.backgroundColor = '#10D269';
            rateChangeLink.innerHTML = this.innerHTML;
            this.innerHTML = '<i class = "iconfont icon-dui2"></i> ' + this.innerHTML;
        }
    }

    // Get data from ajax (playlist)
    ajax('get', '../data/playList.json', '', function (res) {
        // console.log(res);
        // Transform data

        var playList = JSON.parse(res);
        // console.log(playList);
        // Rendering data into playlist
        var playListUl = document.getElementById('playlist');
        // console.log(playListUl);

        // Get every li
        var playlistLis = playListUl.getElementsByTagName('li');
        // console.log(playlistLis);

        // Get every a, i
        // get content
        var content = playListUl.getElementsByTagName('a');
        var label = playListUl.getElementsByTagName('i');
        // console.log(content, label);
        // Rendering playlist
        for (var i = 0; i < playlistLis.length; i++) {
            playlistLis[i].innerHTML = `<a href="#">${playList[i].title}</a>
                                        <i class="iconfont icon-bo_fang1"></i>`;
        }

        // Get video element
        // var videoList = document.getElementById('videolist');
        // // console.log(videoList);
        // var video = videoList.getElementsByTagName('video')[0];
        // console.log(video);
        // Get title
        var title = document.getElementById('title');
        // console.log(title);

        // Change Mode
        var mode = document.getElementById('mode');
        // console.log(mode);

        // Get catalog box
        var catalogBox = document.getElementById('catalog');
        var catalogCon = catalog.querySelector('a');
        var catalogBottom = catalog.querySelector('i');
        // console.log(catalog, catalogCon);

        var num = 0;

        // Get uppanel
        var uppanel = document.querySelector('.uppanel');
        // console.log(uppanel);
        mode.tag = 0; // tag = 0 default night mode tag =1 day mode
        nightMode();

        mode.onclick = function () {
            // if it is night mode, change to day mode
            if (this.tag == 0) {
                // change to day mode
                // label change
                this.innerHTML = '<img src="../img/nightmode.png" alt=""> &nbsp;黑夜模式';
                
                dayMode();
                // console.log(num);
                playlistLis[num].style.backgroundColor = '#ffffff';
                // change tag
                this.tag = 1;
            } else {
                this.innerHTML = '<img src="../img/daymode.png" alt="">&nbsp;白天模式';
                
                nightMode();
                // console.log(num);
                playlistLis[num].style.backgroundColor = '#333333';
                // change tag
                this.tag = 0;
            }
        }

        // DayMode();

        // NightMode();
        function dayMode() {
            // The background of uppanel is #F7F7F7
            uppanel.style.backgroundColor = '#F7F7F7';
            // The background of catlogbox is #ffffff
            catalogBox.style.backgroundColor = '#FFFFFF';
            // The background of catalog content is #ffffff
            catalogCon.style.backgroundColor = '#FFFFFF';
            // The color of catalog content is #999999
            catalogCon.style.color = '#65A0E7';
            // Add border-bottom to the catalogCon
            catalogBottom.style.display = "block";
            // The background of playlist #FFFFFF
            playListUl.style.background = '#FFFFFF';
            // the background of rateChangeList is  #ffffff
            rateChangeList.style.backgroundColor = '#ffffff';
            // The color of rateChangelist is #333333
            rateChangeList.style.color = '#333333';

            for (var i = 0; i < playlistLis.length; i++) {
                // save index
                playlistLis[i].index = i;
                playlistLis[i].className = 'day';
                // add click event
                playlistLis[i].onclick = function () {
                    // console.log(this.index);
                    shiftVideo(this.index);
                    num = this.index;
                    // Exclusive
                    for (var j = 0; j < playlistLis.length; j++) {
                        playlistLis[j].style.backgroundColor = '';
                        content[j].style.color = '';
                        label[j].style.color = '';
                    }
                    // Background turns to white
                    this.style.backgroundColor = '#ffffff';
                    // Color turns to orange
                    content[this.index].style.color = '#EF7407';
                    label[this.index].style.color = '#EF7407';
                }
            }
        }
        // When click every li, video shift to corresponding src
        // title changes as well
        function nightMode() {
            // The background of uppanel is #2B2B2B
            uppanel.style.backgroundColor = '#2B2B2B';
            // The background of catlogbox is #3f3f3f
            catalogBox.style.backgroundColor = '#3F3F3F';
            // The background of catalog content is #323232
            catalogCon.style.backgroundColor = '#323232';
            // The color of catalog content is #999999
            catalogCon.style.color = '#999999'
            // The background of playlist #333333
            playListUl.style.background = '#333333';
            // remove border-bottom
            catalogBottom.style.display = "none";
            // the background of rateChangeList is  
            rateChangeList.style.backgroundColor = '#2B2B2B';
            // The color of rateChangelist is #ffffff
            rateChangeList.style.color = '#ffffff';
            for (var i = 0; i < playlistLis.length; i++) {
                // save index
                playlistLis[i].index = i;
                playlistLis[i].className = 'night';
                // add click event
                playlistLis[i].onclick = function () {
                    // console.log(this.index);
                    shiftVideo(this.index);
                    num = this.index;
                    // Exclusive
                    for (var j = 0; j < playlistLis.length; j++) {
                        playlistLis[j].style.backgroundColor = '';
                        content[j].style.color = '';
                        label[j].style.color = '';
                    }
                    // Background turns to black
                    this.style.backgroundColor = '#000000';
                    // Color turns to orange
                    content[this.index].style.color = '#EF7407';
                    label[this.index].style.color = '#EF7407';
                }
            }
        }

        function shiftVideo(index) {
            video.src = playList[index].src;
            title.innerHTML = playList[index].title;
        }
    });


    // Get data from ajax(comment)
    ajax('get', '../data/comment.json', '', function (res) {
        // console.log(res);
        // Transform to js data
        var commentUrl = JSON.parse(res);
        // console.log(commentUrl);

        // Get comment length element
        var commentLength = document.getElementById('commentlength');
        // console.log(commentLength);
        // Rendering data
        commentLength.innerHTML = commentUrl.length;

        // Rendering default page
        // One page shows two comments
        var pageNum = 0;
        var len = 2;

        // Get maximum page
        var maxPage = Math.ceil(commentUrl.length / len);

        // var showComment = commentUrl.slice(pageNum * len, (pageNum + 1) * len);
        // console.log(showComment);

        // Rendering comment to the commentlist
        // Get element commentlist
        var commentList = document.getElementById('commentlist');
        // console.log(commentlist);

        getComment();

        // Next Page function
        // Get next page element
        var shift = document.getElementById('shift');
        // Get currenPage
        var currentPage = shift.querySelector('input');
        // Get totalPage
        var totalPage = shift.getElementsByTagName('span')[0];

        var determine = shift.querySelector('button');
        // console.log(determine);
        // console.log(currentPage, totalPage);
        // console.log(shift);
        var previous = shift.getElementsByTagName('span')[1];

        var next = shift.getElementsByTagName('span')[2];
        // console.log(previous, next);

        // When click the previous button, page number--
        // Rendering the page
        previous.onclick = function () {
            pageNum--;
            // Shift page
            shiftPage();
        }
        // When click the next button, page number++
        // Rendering the page
        next.onclick = function () {
            pageNum++;
            // Shift page
            shiftPage();
        }

        // Click button, get input value, and shift page
        determine.onclick = function () {
            // Get input value, judge first 
            if (currentPage.value - 1 > maxPage || currentPage.value - 1 < 0) {
                alert("请输入正确的页数");
                currentPage.value = pageNum + 1;
                return;
            } else {
                pageNum = currentPage.value - 1;
            }
            shiftPage();
        }


        // Click publish button, publish comments
        // User should login in first
        var publishBox = document.getElementById('publish');
        // console.log(publishBox); 
        var publishBtn = publishBox.querySelector('button');
        // get textarea
        var textarea = publishBox.querySelector('textarea');
        // get checkbox
        var anonymous = publishBox.querySelector('#anonymous');
        // console.log(anonymous);
        // console.log(textarea);
        // console.log(publishBtn);
        publishBtn.onclick = function () {
            // whether user is login
            // console.log(localStorage);

            if (localStorage.loginState == 'false') {
                // not login
                // prompt to jump to login page
                var message = confirm('请登录');
                if (message) {
                    window.location = './login.html';
                }
            } else {
                // login
                // get corresponding input userinfo avatar time
                // console.log(anonymous.checked);
                var newComment = {
                        "name":anonymous.checked ? "匿名用户": localStorage.username,
                        "time":new Date().toLocaleString(),
                        "src":anonymous.checked ? "../img/avatar-7.jpg" :"../img/avatar-4.jpg",
                        "comment":textarea.value,
                        "line":"3"
                };
                //console.log(newComment);
                // put newObj into commentUrl
                // put it at the first position
                commentUrl.unshift(newComment);
                // console.log(commentUrl);

                // refresh page, first jump to the first page, refresh again
                pageNum = 0;
                maxPage = Math.ceil(commentUrl.length / len);
                // Update commentLength and totalPage
                commentLength.innerHTML = commentUrl.length;
                totalPage.innerHTML = maxPage;

                shiftPage();
            }
        }


        function starNum(arr) {
            var star = '';
            var starNum = Number(arr.line);
            // console.log(typeof Number(starNum));
            for (var j = 0; j < starNum; j++) {
                star += ' <i class="iconfont icon-xingxing1"></i>'
            }
            return star;
        }

        // Generating page fragments
        function getComment() {
            // Get the data we want to rendering 0,1
            // slice(startIndex, lastIndex)
            // startIndex：pageNum * length
            // lastIndex: (pageNum + 1) * length
            var showComment = commentUrl.slice(pageNum * len, (pageNum + 1) * len);
            var html = '';
            for (var i = 0; i < showComment.length; i++) {
                var star = starNum(showComment[i]);
                html += `<li>
                <div class="user">
                    <img src="${showComment[i].src}" alt="">&nbsp;&nbsp;
                    ${showComment[i].name}&nbsp;&nbsp;` + star +
                    `</div>
                    <p class="content">
                        ${showComment[i].comment}
                    </p>
                    <p class="time fr">
                        ${showComment[i].time}
                    </p>
                </li>`
            }
            // Append html to commetList
            commentList.innerHTML = html;

        }

        // ShiftPage()
        function shiftPage() {

            // console.log(maxPage);

            // If pageNum arrives max page, alert and stay in the last page
            if (pageNum >= maxPage) {
                alert('已经是最后一页!');
                // stay in the last page
                pageNum = maxPage - 1;
            }
            // If pageNum arrives the first page, alert and stay in the first page
            if (pageNum < 0) {
                alert('已经是第一页!');
                pageNum = 0;
            }

            // Rendering comment data
            getComment();
            // Update currentPage and totalPage
            currentPage.value = pageNum + 1;
            totalPage.innerHTML = maxPage;
        }
    });
}


