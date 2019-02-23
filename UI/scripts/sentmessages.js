
// const x = document.getElementById('divinnermsg').style;
// x.display = "none";

const messageDivs = document.getElementsByClassName('innermessageDiv');
const buttons = document.getElementsByClassName("myBtn");


for(let i=0;i<messageDivs.length;i++){
	messageDivs[i].style.display = "none";
}




buttons[0].addEventListener("click", function() {
    if(messageDivs[0].style.display === "none"){
    	messageDivs[0].style .display = "block";
    }else{
         messageDivs[0].style .display = "none"
    }
});

buttons[1].addEventListener("click", function() {
    if(messageDivs[1].style.display === "none"){
    	messageDivs[1].style .display = "block";
    }else{
         messageDivs[1].style .display = "none"
    }
});

buttons[2].addEventListener("click", function() {
     if(messageDivs[2].style.display === "none"){
    	messageDivs[2].style .display = "block";
    }else{
         messageDivs[2].style .display = "none"
    }
});