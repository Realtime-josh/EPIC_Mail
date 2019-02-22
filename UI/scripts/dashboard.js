
const electronics = document.getElementById("electronics");
const categories1 = document.getElementById("categories1").style;
categories1.display = "none";

const categories2 = document.getElementById("categories2").style;
categories2.display = "none";

const divBiggerScreens = document.getElementById("menuLargerScreens").style;
divBiggerScreens.display = "none";



//Functions
showDivSmallScreen = () => {
    if(categories1.display === "none"){
        document.getElementById("categories1").style.display = "block";
    }else{
        document.getElementById("categories1").style.display = "none";
        document.getElementById("categories2").style.display = "none";
    };
}


toggleBigMenuDiv = () =>{
	if(divBiggerScreens.display === "none"){
        document.getElementById("menuLargerScreens").style.display = "block";
    }
}

hideBigMenuDiv = () =>{
	if(divBiggerScreens.display === "block"){
        document.getElementById("menuLargerScreens").style.display = "none";
    }
}

showSmallMenuDiv = () =>{
	if(categories2.display === "none"){
        document.getElementById("categories2").style.display = "block";
    }
}

hideSmallMenuDiv = () =>{
	if(categories2.display === "block"){
        document.getElementById("categories2").style.display = "none";
    }
}

hideSmallMenuDivs = () =>{
	if(categories1.display === "block" || categories2.display === "block"){
        document.getElementById("categories1").style.display = "none";
        document.getElementById("categories2").style.display = "none";
    }
}





//Event Listeners
document.getElementById("catBiggerScreens").addEventListener("mouseenter", toggleBigMenuDiv);
document.getElementById("dashBiggerScreens").addEventListener("mouseenter", hideBigMenuDiv);
document.getElementById("composeBiggerScreens").addEventListener("mouseenter", hideBigMenuDiv);
document.getElementById("profileBiggerScreens").addEventListener("mouseenter", hideBigMenuDiv);
document.getElementById("sentBiggerScreens").addEventListener("mouseenter", hideBigMenuDiv);
document.getElementById("logoutBiggerScreens").addEventListener("mouseenter", hideBigMenuDiv);
document.getElementById("menuLargerScreens").addEventListener("mouseleave", hideBigMenuDiv)
document.getElementById("headerMenuDiv").addEventListener("click", hideBigMenuDiv);
document.getElementById("roott").addEventListener("mouseenter", hideBigMenuDiv);
document.getElementById("menuicon").addEventListener("click", showDivSmallScreen);
document.getElementById("catSmallDiv").addEventListener("mouseenter", showSmallMenuDiv);
document.getElementById("categories2").addEventListener("mouseleave", hideSmallMenuDiv);
document.getElementById("menuList1").addEventListener("click", hideSmallMenuDivs);
document.getElementById("catSmallDivDash").addEventListener("mouseenter", hideSmallMenuDiv);
document.getElementById("catSmallDivProf").addEventListener("mouseenter", hideSmallMenuDiv);
document.getElementById("catSmallDivCart").addEventListener("mouseenter", hideSmallMenuDiv)
document.getElementById("catSmallDivCartSent").addEventListener("mouseenter", hideSmallMenuDiv)
document.getElementById("logoutSmallDiv").addEventListener("mouseenter", hideSmallMenuDiv)


if(electronics){
  electronics.onclick = () => {
    // dialogBackgroundWindow.style.display = 'none';
    window.location.href='./electronics.html';
  };
}





//checkout
// if(modifyButton){
//   modifyButton.onclick = () => {
//     dialogBackgroundWindow.style.display = 'none';
//     window.location.href='./modify-product.html';
//   };
// }

