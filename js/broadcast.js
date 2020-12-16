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
    
    for(var i = 0; i < rates.length; i++){
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
        console.log(playList);
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

        // console.log(catalog, catalogCon);

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
                // change tag
                this.tag = 1;
            } else {
                this.innerHTML = '<img src="../img/daymode.png" alt="">&nbsp;白天模式';
                nightMode();
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
            catalogCon.style.borderBottom = ".03rem solid #65A0E7";
            // The background of playlist #FFFFFF
            playListUl.style.background = '#FFFFFF';

            for (var i = 0; i < playlistLis.length; i++) {
                // save index
                playlistLis[i].index = i;
                // add mouse enter event
                playlistLis[i].onmouseenter = function () {
                    this.style.background = '#ffffff';
                }
                // add click event
                playlistLis[i].onclick = function () {
                    // console.log(this.index);
                    shiftVideo(this.index);

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
            catalogCon.style.borderBottom = "none";


            for (var i = 0; i < playlistLis.length; i++) {
                // save index
                playlistLis[i].index = i;
                // add click event
                playlistLis[i].onclick = function () {
                    // console.log(this.index);
                    shiftVideo(this.index);

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

                playlistLis[i].onmouseenter = function () {
                    this.style.background = '#000000';
                }
                playlistLis[i].onmouseleave = function () {
                    this.style.background = '';
                }
            }
        }

        function shiftVideo(index) {
            video.src = playList[index].src;
            title.innerHTML = playList[index].title;
        }
    });
}


