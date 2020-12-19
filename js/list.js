window.onload = function () {
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
        // Add click event to topArrow
        topArrow.onclick = function () {
            // Make the page back to the top
            document.documentElement.scrollTop = 0;
            // Consider compatible
            document.body.scrollTop = 0;
        }
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
        // console.log(courseUrl);

        // calculate number of course 
        var total = courseUrl.length;
        // console.log(total);

        // Rendering default page
        // One page shows 16 courses
        var pageNum = 0;
        var lenPerPage = 16;

        // Get maximum page
        var maxPage = Math.ceil(total / lenPerPage);
        console.log(maxPage);

        // Rendering page nav
        // Geting element pagenav, span page
        var pageNav = document.getElementById('pagenav');
        var pageSeq = pageNav.getElementsByClassName('pagesequence')[0];
        // console.log(pageNav, pageSeq);
        createPageSeq();
        // The default page is one

        // Rendering course to the page
        getCourse();

        function getCourse() {
            // Rendering data to course list
            // get element courselist
            var courseList = document.getElementById('courselist');
            // console.log(courseList);

            // show data we want to 
            // slice(startIndex, lastIndex)
            // 0 - 15  16- 31 32 - 48
            // startIndex: pageNum * lenPerPage
            // lastIndex: (pageNum+1) * lenPerPage
            var showCourse = courseUrl.slice(pageNum * lenPerPage, (pageNum + 1) * lenPerPage);
            console.log(showCourse);
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

        function createPageSeq() {
            var sequence = '';
            for (var i = 0; i < maxPage; i++) {
                sequence += '<span>' + (i + 1) + '</span>';
            }
            // give content to the pageSeq
            pageSeq.innerHTML = sequence;
            // give first page active class
            var firstPage = pageSeq.getElementsByTagName('span')[0];
            //console.log(firstPage);
            firstPage.className = 'active';
        }




    });




}