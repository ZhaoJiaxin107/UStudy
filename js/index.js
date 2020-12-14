window.onload = function(){
    /* 
        1.1 Slide the mouse into the search icon to 
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
    
    // When mouse enter into banner, left/right button diaplay
    // Get banner, left/right button
    var banner = document.getElementById('banner');
    var arrows = banner.getElementsByTagName('button');
    // console.log(banner, arrows);
    banner.onmouseover = function(){
        // display arrow
        for(var i = 0; i < arrows.length; i++){
            arrows[i].style.display = 'block';
        }
    }
    banner.onmouseout = function(){
        // display arrow
        for(var i = 0; i < arrows.length; i++){
            arrows[i].style.display = 'none';
        }
    }

    /* 
        Footer link tab
    */
    // Get element footlink a p
    var footlink = document.getElementById('footlink');
    // console.log(footlink);
    
    var options = footlink.querySelectorAll('.option');
    var paras = footlink.getElementsByTagName('p');

    // console.log(options, paras);
    footLinkShift(options, paras);
    

    // 2.Realization of rotation banners
    // 2.1 Ajax request address data
    ajax('get', './data/banner.json','',function(res){
        // console.log(res);
        // transform data
        var bannerUrl = JSON.parse(res);
        console.log(bannerUrl);

        // 2.2 Data rendering to the banner
        // Get banner ul span
        var banner = document.getElementById('banner');
        // console.log(banner);
        var bannerlist = banner.querySelector('.bannerlist');
        var shiftlist = banner.querySelector('.shiftlist');
        // console.log(bannerlist, shiftlist);

        // Declare variables to store address
        var bannerImage = '', shift = '';
        for(var i = 0; i < bannerUrl.length; i++){
            // console.log(bannerUrl[i]);
            bannerImage += '<li><img src="'+ bannerUrl[i] +'" alt="banner"></li>';
            shift += '<span></span>'
        }
        // Rendering to the father element
        bannerlist.innerHTML = bannerImage;
        shiftlist.innerHTML = shift;

        // 2.3 Initialize banner styles
        var spans = shiftlist.getElementsByTagName('span');
        spans[0].className = 'active';

        // Seamless carousel puls last banner
        bannerlist.innerHTML += '<li><img src="'+ bannerUrl[0] +'" alt="banner"></li>';

        // Make the banner move
        // Get the width of banner
        var cw = banner.clientWidth;
        // console.log(cw);

        // Recalculate the width of bannerlist
        bannerlist.style.width = (bannerUrl.length + 1) * cw + 'px';
        
        // Suppose the picture is the first one
        var n = 0;
        // Distance of moving = index * bannerImage width
        // Direction : 0 - 1 - 2 - 3 - 4 -5 - 0
        banner.timer = setInterval(auto, 4000);
        // enter the banner, clear interval
        banner.onmouseenter = function(){
            clearInterval(banner.timer);
        }
        // leave the banner, activate the timer
        banner.onmouseleave = function(){
            banner.timer = setInterval(auto, 4000);
        }
        // Click shift button, shift to corresponding banner image
        for(var i = 0; i < spans.length; i++){
            // Custom index
            spans[i].index = i;
            // Add click event to each span
            spans[i].onclick = function(){
                n = this.index - 1;
                auto();
            }
        }
        // Click right button, shift to the next banner image
        var btns = banner.getElementsByTagName('button');
        // console.log(btns);

        btns[1].onclick = function(){
            auto();
        }

        // Click left button, shift to the previous banner image
        btns[0].onclick = function(){
            n -= 2;
            auto();
        }
        // auto()
        function auto(){
            // Index ++
            n++;

            // If index gets to the last one, return the first one
            if(n > bannerUrl.length){
                n = 0;
                // Change position 
                bannerlist.style.left = n * (-cw) + 'px';
                // Update index
                n = 1;
            }
            // If index gets to the first one, return the last one
            if(n < 0){
                n = bannerUrl.length - 1;
                // flash
                bannerlist.style.left = n * (-cw) + 'px';
            }

            // Call move(ele, attr, step, target) function
            move(bannerlist, 'left', 50, n * (-cw));

            // Exclusive operation
            for(var i = 0; i < spans.length; i++){
                spans[i].className = '';
            }

            // shift and bannerImage corresponds to each other
            spans[n == bannerUrl.length ? 0 : n].className = 'active';
        }
    });

    // 3.Realization of hot live list
    // 3.1 Ajax request data (img/desc/time)
    ajax('get','./data/hot.json','',function(res){
        // console.log(res);
        // Transform data
        var hotUrl = JSON.parse(res);
        console.log(hotUrl);

        // Rendering the page, comment previous static data in html page
        // Get father element
        var hotContent = document.getElementById('hotcontent');
        // console.log(hotContent);
        var hotImage = hotContent.getElementsByClassName('hotimg');
        var sequence = hotContent.getElementsByClassName('sequence');
        // console.log(hotImage, sequence);
        // Rendering image and sequence
        for(var i = 0; i < hotUrl.length; i++){
            hotImage[i].innerHTML = '<img src=' + hotUrl[i].src + ' alt="hot"></img>';
            sequence[i].innerHTML = hotUrl[i].name;
        }

        // Rendering data to the right panel
        // Get father element hotdesc
        var hotDesc = document.getElementById('hotdesc');
        // console.log(hotDesc);
        // Get element time and h3
        var time = hotDesc.getElementsByClassName('time');
        var h3 = hotDesc.getElementsByTagName('h3');
        // console.log(time, h3);

        // Rendering time and desc into time and h3
        for(var i = 0; i < hotUrl.length; i++){
           time[i].innerHTML = '<span>'+ hotUrl[i].time +'</span>';
           h3[i].innerHTML = '<a href="#">' + hotUrl[i].name +'</a>';
        }

        /* 
            Tab function, click each li to get the content of corresponding desc, 
            and the background color of li is pink
        */
        //  Get element li from father element hotDesc
        var lis = hotDesc.getElementsByTagName('li');
        // console.log(lis);
        for(var i = 0; i < lis.length; i++){
            // custom index to save index
            lis[i].index = i;
            // event: when mouse enter into li
            lis[i].onmouseenter = function(){
                this.style.backgroundColor = '#FFF7F3';
                // console.log(this.index);
                // exclusive
                for(var j = 0; j < lis.length; j++){
                    hotImage[j].className = 'hotimg';
                    sequence[j].className = 'sequence';
                }
                // shift
                hotImage[this.index].className = 'active hotimg';
                sequence[this.index].className = 'active sequence';
            }
            // when mouse leave the li, background turn to white
            lis[i].onmouseleave = function(){
                this.style.backgroundColor = '#ffffff';
            }
        }
    });
    
    // 4.Readlization of online courses
    // 4.1 Ajax request data
    ajax('get','./data/lessonContent_new.json','',function(res){
        // console.log(res);
        var transRes = JSON.parse(res);
        // goodLesson
        var goodLesson = transRes.goodLesson;
        Tab(goodLesson,'onlinecourse','onlinetype','onlinecontent');

        // freeLesson
        var freeLesson = transRes.freeLesson;
        Tab(freeLesson, 'freecourse','freetype', 'freecontent');

        var jobLesson = transRes.jobLesson;
        Tab(jobLesson, 'jobcourse', 'jobtype', 'jobcontent')
    });

    function Tab(lesson, courseId, typeId, contentClass){
        
        // console.log(lesson);
        var course = document.getElementById(courseId);
        var title = course.querySelector('h3');
        // console.log(title);
        // Get father element type
        var type = document.getElementById(typeId);
        // console.log(type);
        var typeLis = type.getElementsByTagName('li');
        var typeCon = type.getElementsByTagName('a');
        // console.log(typeLis);
        var content = document.getElementsByClassName(contentClass);
        // console.log(content);
        // When mouse enter into h3, display default value
        title.onmouseenter = function(){
            content[content.length - 1].className = contentClass + ' active';
        }
        // When mouse enter into each type, show corresponding content
        for(var i = 0; i < typeLis.length; i++){
            typeLis[i].index = i;
            typeLis[i].onmouseenter = function(){
                // set and border
                // Exclusive
                for(var j = 0; j < typeLis.length;j++){
                     typeLis[j].style.borderBottom = 'none';
                     typeCon[j].style.color = '#333333';
                }
                this.style.borderBottom = '1px solid #FD5843';
                typeCon[this.index].style.color = '#FD5843';
                // get attribute
                var attr = this.getAttribute('attr');
                // console.log(attr);

                // console.log(lesson[attr]);
                // console.log(typeof lesson[attr][0].price);
                // record length
                var length = lesson[attr].length;
                //Rendering the page to corresponding content
                // console.log(this.index);
                content[this.index].innerHTML = '';
                // append content
               /*  for(var i = 0; i < length; i++){
                    content[this.index].innerHTML += '<li>\
                    <a href="#">\
                        <img src="'+ lesson[attr][i].img +'" alt="">\
                    </a>\
                    <a href="#" class = "desc">\
                       '+ lesson[attr][i].title +'\
                    </a>\
                    <p class = "detail clearfix">\
                       <span class = "price"><b>￥</b>'+ parseFloat(lesson[attr][i].price) +'</span>\
                       <span class = "length fr">'+ lesson[attr][i].time +'</span>\
                    </p>\
                </li>';
                } */
                for(var i = 0; i < length; i++){
                    content[this.index].innerHTML += `<li>
                    <a href="#">
                        <img src=" ${lesson[attr][i].img} " alt="">
                    </a>
                    <a href="#" class = "desc">
                        ${lesson[attr][i].title} 
                    </a>
                    <p class = "detail clearfix">
                       <span class = "price"><b>￥</b> ${parseFloat(lesson[attr][i].price)} </span>
                       <span class = "length fr"> ${lesson[attr][i].time} </span>
                    </p>
                </li>`;
                }
                // exclusive
                for(var k = 0; k < content.length; k++){
                    content[k].className = contentClass;
                }
                content[this.index].className = contentClass + ' active'; 
            }
        }
    }


    function footLinkShift(options, paras){
        // Add mouse enter event to each option
        for(var i = 0; i < options.length; i++){
            // save index
            options[i].index = i;
            // add mouse enter event
            options[i].onmouseenter = function(){
                // console.log(this.index);
                // exclusive
                for(var j = 0; j < paras.length; j++){
                    paras[j].className = '';
                    options[j].style.color = '#666666';
                }
                // content shift to each para
                paras[this.index].className = 'active';
                // option color turns to red
                this.style.color = '#FF0000';
            }
        }
    }
}