
const x = document.getElementById('divinnermsg').style;
x.display = "none";



displayMessage = () =>{
	if(x.display === "none"){
        document.getElementById("divinnermsg").style.display = "block";
        document.getElementById("seemessage1").innerHTML = "Collapse"
    }else if(x.display === "block"){
    	document.getElementById("divinnermsg").style.display = "none";
    	document.getElementById("seemessage1").innerHTML = "View message"
    }
}







document.getElementById("seemessage1").addEventListener("click", displayMessage);