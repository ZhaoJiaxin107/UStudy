window.onload = function(){
     // Get data from ajax (playlist)
     ajax('get','../data/playList.json','',function(res){
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

        // Rendering playlist
        for(var i = 0; i < playlistLis.length; i++){
            playlistLis[i].innerHTML = `<a href="#">${playList[i].title}</a>`;
        }

        // When click every li, video shift to corresponding src
        
    });
}
    
   
