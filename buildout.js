
const smallerScreenDiv = document.getElementById("sectionFloatDiv");

const tableMessages = document.getElementsByClassName("messageRowss");

smallerScreenDiv.style.display = "none";

// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementsByClassName("addNewGroup");

// Get the <span> element that closes the modal
const span = document.getElementById("close");

const continueView = document.getElementById("continue");


modal.style.display = "none"


for(let i=0;i<tableMessages.length;i++){
        tableMessages[i].onclick = function() {
        window.location.href='./chatMessages.html';
    }
}








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
  }else if(event.target == modall){
    modall.style.display = "none";
  }
}







const showDivSmallScreen = () => {
    if(smallerScreenDiv.style.display === "none"){
        document.getElementById("sectionFloatDiv").style.display = "block";
    }else{
        document.getElementById("sectionFloatDiv").style.display = "none";
    };
};

const removeDivSmallScreen = () => {
    if(smallerScreenDiv.style.display === "block"){
        document.getElementById("sectionFloatDiv").style.display = "none";
    }
};









//script for running send message

// Get the modal
const modall = document.getElementById('myModall');

// Get the button that opens the modal
const btnn = document.getElementsByClassName("hoverablee");

// Get the <span> element that closes the modal
const spann = document.getElementById("closee");

modall.style.display = "none"

spann.onclick = function() {
  modall.style.display = "none";
}

// When the user clicks on the button, open the modal 
for(let i=0;i<btnn.length;i++){
        btnn[i].onclick = function() {
      modall.style.display = "block";
    }
}








document.getElementById("menutoggler").addEventListener("click", showDivSmallScreen);
document.getElementById("smallCreateGrp").addEventListener("click", removeDivSmallScreen);
document.getElementById("smallComposeGrp").addEventListener("click", removeDivSmallScreen);