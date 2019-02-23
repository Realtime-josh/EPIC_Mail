
const messageDivs = document.getElementsByClassName('innermessageDiv');
const buttons = document.getElementsByClassName("myBtn");


for(let i=0;i<messageDivs.length;i++){
	messageDivs[i].style.display = "none";
}



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




// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementsByClassName("myBtnnn");

// Get the <span> element that closes the modal
const span = document.getElementById("close");

const continueView = document.getElementById("continue");



modal.style.display = "none"




// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on the button, open the modal 
for(let i=0;i<btn.length;i++){
        btn[i].onclick = function() {
      modal.style.display = "block";
    }
}



continueView.onclick = function(){
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


document.getElementById("allmessages").addEventListener("click", function(){
  window.location.href='./dashboard.html';
})





