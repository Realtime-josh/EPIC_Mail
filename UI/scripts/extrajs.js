
const displayReplyMessage = document.getElementById("myModalll")

displayReplyMessage.style.display = "none";


const showMessageReplyDialog = () => {
    if(displayReplyMessage.style.display === "none"){
        document.getElementById("myModalll").style.display = "block";
    }
};


// Get the <span> element that closes the modal
const spannn = document.getElementById("closeee");

spannn.onclick = function() {
  displayReplyMessage.style.display = "none";
}



document.getElementById("quickSend").addEventListener("click", showMessageReplyDialog)







