
const messageDivs = document.getElementsByClassName('innermessageDiv');
const buttons = document.getElementsByClassName("myBtn");


for(let i=0;i<messageDivs.length;i++){
	messageDivs[i].style.display = "none";
}




// buttons[0].addEventListener("click", function() {
//     if(messageDivs[0].style.display === "none"){
//     	messageDivs[0].style .display = "block";
//     	buttons[0].innerHTML = "Collapse"
//     }else{
//          messageDivs[0].style .display = "none"
//          buttons[0].innerHTML = "View Message"
//     }
// });

// buttons[1].addEventListener("click", function() {
//     if(messageDivs[1].style.display === "none"){
//     	messageDivs[1].style .display = "block";
//     	buttons[1].innerHTML = "Collapse";
//     }else{
//          messageDivs[1].style .display = "none"
//          buttons[1].innerHTML = "View Message";
//     }
// });

// buttons[2].addEventListener("click", function() {
//      if(messageDivs[2].style.display === "none"){
//     	messageDivs[2].style .display = "block";
//     	buttons[2].innerHTML = "Collapse"
//     }else{
//          messageDivs[2].style .display = "none"
//          buttons[2].innerHTML = "View Message"
//     }
// });



for(let i=0; i<messageDivs.length; i++){
	buttons[i].addEventListener("click", function() {
    if(messageDivs[i].style.display === "none"){
        messageDivs[i].style .display = "block";
        buttons[i].innerHTML = "Collapse"
    }else{
         messageDivs[i].style .display = "none"
         buttons[i].innerHTML = "View Message"
    }
});

}

