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
        buffMove(courseType, { 'opacity': 1 })
        // courseType.style.opacity = 1;
    }
    courseType.onmouseleave = function () {
        buffMove(this, { 'opacity': 0 })
        // this.style.opacity = 0;
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

    // When click bottom up arrow, the page goes to the top
    // Get top arrow element
    var topArrow = document.getElementById('toparrow');
    //console.log(topArrow);
    // Add click event in window onscroll function
     // whether it is at top
     var isTop = true;
     window.onscroll = function () {
         // Get the distance the mouse has scrolled
         var scrollDistance = document.documentElement.scrollTop || document.body.scrollTop;
         // console.log(scrollDistance);
         // When scroll distance > 500, display top arrow, else hide top arrow
         if (scrollDistance >= 500) {
             topArrow.style.display = 'block';
         } else {
             topArrow.style.display = 'none';
         }
         if (!isTop) {
             clearInterval(topArrow.timer);
         }
         isTop = false;
     }
 
     topArrow.onclick = function () {
         this.timer = setInterval(function () {
             // Get the scroll distance to the top
             var scrollDistance = document.documentElement.scrollTop || document.body.scrollTop;
             // set speed
             var speed = Math.floor(-scrollDistance / 6);
             document.documentElement.scrollTop = document.body.scrollTop = scrollDistance + speed;
 
             isTop = true; // set the state of flag
 
             if (scrollDistance == 0) {
                 clearInterval(this.timer);
             }
         }, 50);
     }


    /* 
        When mouse enter pricerange, display ul list
        When mouse leave ullist, ullist disappears
    */
    // get pricerange a ul element
    var priceRange = document.getElementById('pricerange');
    var priceLink = priceRange.querySelector('a');
    var priceList = priceRange.querySelector('ul');
    // console.log(priceRange,priceLink, priceList);
    // When mouse enter priceLink, display priceList
    priceLink.onmouseenter = function () {
        this.style.backgroundColor = '#ffffff';
        priceList.style.display = 'block';
    }
    // When mouse leave priceList, priceList disappears
    priceList.onmouseleave = function () {
        priceLink.style.backgroundColor = '';
        priceList.style.display = 'none';
    }

    // Get data from play.json
    ajax('get', '../data/play.json', '', function (res) {
        // console.log(res)
        // Transform to js data
        var courseUrl = JSON.parse(res);
        // save filter data 
        var newCourseUrl = courseUrl;
        // console.log(courseUrl);
        // get element courselist
        var courseList = document.getElementById('courselist');

        // Click free or charge, filter corresponding
        // courses

        // get label, freeCheck and chargeCheck
        var label = document.getElementsByTagName('label');
        // console.log(label);
        var freeCheck = document.getElementById('free');
        var chargeCheck = document.getElementById('charge');


        // console.log(total);

        // Rendering default page
        // One page shows 16 courses
        var pageNum = 0;
        var lenPerPage = 16;

        // Rendering page nav
        // Geting element pagenav, span page
        var pageNav = document.getElementById('pagenav');
        var pageSeq = pageNav.getElementsByClassName('pagesequence')[0];

        // console.log(pageNav, pageSeq);
        var pageSpan;
        var total, maxPage;
        // get firstPage and last page
        var firstBtn = pageNav.querySelector('#first');
        var lastBtn = pageNav.querySelector('#last');
        // console.log(firstBtn, lastBtn);

        // get different price range from priceList we have defined before
        var priceLis = priceList.getElementsByTagName('li');
        // console.log(priceLis);

        // Rendering course to the page
        getCourse(newCourseUrl);

        // updatePageSeq()
        updatePageSeq();

        /* 
            Next Page funtion, when click next page button 
            the page turns to the next page

            Previous page funciton, when click previous button,
            the page turns to the previous page
        */
        var previous = pageNav.querySelector('#pre');
        var next = pageNav.querySelector('#next');
        // console.log(previous, next);

        next.onclick = function () {
            pageNum++;
            shiftPage();
        }

        previous.onclick = function () {
            pageNum--;
            shiftPage();
        }
        /* 
            Click firstBtn and lastBtn, the page jumps to first page and last page
        */
        firstBtn.onclick = function () {
            pageNum = 0;
            shiftPage();
        }
        lastBtn.onclick = function () {
            pageNum = maxPage - 1;
            shiftPage();
        }

        // Add click event to the free label
        label[0].onclick = function () {

            // If free is checked, charge should not be checked
            chargeCheck.checked = freeCheck.checked ? false : chargeCheck.checked;

            // console.log(freeCheck.checked);

            if (freeCheck.checked) {
                // filter data
                newCourseUrl = courseUrl.filter(function (v, i) {
                    // console.log(v, i);
                    return v.price == 0;
                });
            } else {
                newCourseUrl = courseUrl;
            }
            getCourse(newCourseUrl);

            // update page number
            updatePageSeq();
        }

        // add click event to the charge label
        label[1].onclick = function () {
            // if charge is checked, free should not be checked
            freeCheck.checked = chargeCheck.checked ? false : freeCheck.checked;

            if (chargeCheck.checked) {
                newCourseUrl = courseUrl.filter(function (v, i) {
                    return v.price > 0;
                });
            } else {
                newCourseUrl = courseUrl;
            }
            // console.log(newCourseUrl);
            // Rendering data for the page
            getCourse(newCourseUrl);

            updatePageSeq();

        }
        // choose different price ranges, the page show course
        // which price is in the right range

        choosePriceRange(0, 0, 99999);
        choosePriceRange(1, 1, 99);
        choosePriceRange(2, 100, 499);
        choosePriceRange(3, 500, 999);
        choosePriceRange(4, 1000, 9999);
        choosePriceRange(5, 10000, 99999);

        function createPageSeq() {
            var sequence = '';
            for (var i = 0; i < maxPage; i++) {
                sequence += '<span>' + (i + 1) + '</span>';
            }
            // give content to the pageSeq
            pageSeq.innerHTML = sequence;
            // The default page is one
            pageSpan = pageSeq.getElementsByTagName('span');
            // console.log(pageSpan);
            // give current page active class
            var currentPage = pageSpan[pageNum];
            currentPage.className = 'active';
        }

        function getCourse(url) {
            // Rendering data to course list
            // show data we want to 
            // slice(startIndex, lastIndex)
            // 0 - 15  16- 31 32 - 48
            // startIndex: pageNum * lenPerPage
            // lastIndex: (pageNum+1) * lenPerPage
            var showCourse = url.slice(pageNum * lenPerPage, (pageNum + 1) * lenPerPage);
            // console.log(showCourse);
            var html = '';
            for (var i = 0; i < showCourse.length; i++) {
                html += `<li>
            <a class="img">
                <img src="${showCourse[i].img}" alt="course">
            </a>
            <h3>${showCourse[i].title}</h3>
            <p>
                共有<b id = "num">${showCourse[i].num}</b>人在学</span>
                <em>&nbsp;&nbsp;|&nbsp;&nbsp;</em>
                <span>￥<b id = "price">${showCourse[i].price}</b></span>
            </p>
        </li>`
            }
            // append html to courselist
            courseList.innerHTML = html;
        }

        function shiftPage() {
            // if page arrives at max page, stay in the max page
            if (pageNum >= maxPage) {
                alert('已经到达最后一页');
                // stay in the last page
                pageNum = maxPage - 1;
            }

            // if page arrives at the first page. stay in the first page
            if (pageNum < 0) {
                alert('已经是第一页!');
                pageNum = 0;
            }

            getCourse(newCourseUrl);

            for (var k = 0; k < pageSpan.length; k++) {
                pageSpan[k].className = '';
            }
            currentPage = pageSpan[pageNum];
            currentPage.className = 'active';
        }

        function clickEveryPage() {
            for (var i = 0; i < pageSpan.length; i++) {
                // save index
                pageSpan[i].index = i;
                pageSpan[i].onclick = function () {
                    pageNum = this.index;
                    shiftPage();
                }
            }
        }

        // add click event to priceLis 
        function choosePriceRange(index, startPrice, endPrice) {
            priceLis[index].onclick = function () {
                // fiter price from 1 to 99
                newCourseUrl = courseUrl.filter(function (v, i) {
                    return (v.price >= startPrice && v.price <= endPrice)
                });
                //console.log(newCourseUrl);
                // Rendering data for the page
                getCourse(newCourseUrl);

                updatePageSeq();
            }
        }


        function updatePageSeq() {
            // update page number
            total = newCourseUrl.length;
            // console.log(newTotal);
            maxPage = Math.ceil(total / lenPerPage);
            createPageSeq();
            clickEveryPage();
        }
    });
}