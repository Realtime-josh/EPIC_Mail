
// const x = document.getElementById('divinnermsg').style;
// x.display = "none";

const x = document.getElementsByClassName('innermessageDiv');
const y = document.getElementsByClassName("myBtn")

// for(let i=0;i<x.length;i++){
// 	x[i].style.display = "none";
// }


// displayMessage = () =>{
// 	if(x.display === "none"){
//         document.getElementById("divinnermsg").style.display = "block";
//         document.getElementById("seemessage1").innerHTML = "Collapse"
//     }else if(x.display === "block"){
//     	document.getElementById("divinnermsg").style.display = "none";
//     	document.getElementById("seemessage1").innerHTML = "View message"
//     }
// }


displayMessage = () =>{
	for(let i=0; i<x.length; i++){	    
			if(x[i].style.display === "none"){
		        document.getElementsByClassName(x[i]).style.display = "block";
		        document.getElementById("seemessage1").innerHTML = "Collapse"
		    }else if(x.style.display === "block"){
		    	document.getElementsByClassName(x[i]).style.display = "none";
		    	document.getElementById("seemessage1").innerHTML = "View message"
		    }
         
	}
}







document.getElementById("seemessage1").addEventListener("click", displayMessage);