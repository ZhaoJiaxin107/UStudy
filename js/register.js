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

}