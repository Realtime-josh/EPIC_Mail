
const smallerScreenDiv = document.getElementById("sectionFloatDiv");

smallerScreenDiv.style.display = "none";


// const menuButton = document.getElementById("menutoggler");


showDivSmallScreen = () => {
    if(smallerScreenDiv.style.display === "none"){
        document.getElementById("sectionFloatDiv").style.display = "block";
    }else{
        document.getElementById("sectionFloatDiv").style.display = "none";
    };
};






document.getElementById("menutoggler").addEventListener("click", showDivSmallScreen);