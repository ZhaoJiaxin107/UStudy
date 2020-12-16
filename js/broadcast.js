window.onload = function(){
     // Get data from ajax (playlist)
     ajax('get','../data/playList.json','',function(res){
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

        // Rendering playlist
        for(var i = 0; i < playlistLis.length; i++){
            playlistLis[i].innerHTML = `<a href="#">${playList[i].title}</a>
                                        <i class="iconfont icon-bo_fang1"></i>`;
        }

        // Get video element
        var videoList = document.getElementById('videolist');
        // console.log(videoList);
        var video = videoList.getElementsByTagName('video')[0];
        // console.log(video);
        // Get title
        var title = document.getElementById('title');
        // console.log(title);
        // When click every li, video shift to corresponding src
        // title changes as well
        for(var i = 0; i < playlistLis.length; i++){
            // save index
            playlistLis[i].index = i;
            // add click event
            playlistLis[i].onclick = function(){
                // console.log(this.index);
                video.src = playList[this.index].src;
                title.innerHTML = playList[this.index].title;

                // Exclusive
                for(var j = 0; j < playlistLis.length; j++){
                    playlistLis[j].style.backgroundColor = '';
                }
                // Background turns to back
                this.style.backgroundColor = '#000000';
            }
        }
    });
}
    
   
