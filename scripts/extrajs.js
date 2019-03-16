
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



document.getElementById("menutoggler").addEventListener("click", showDivSmallScreen);
document.getElementById("smallCreateGrp").addEventListener("click", removeDivSmallScreen);
document.getElementById("smallComposeGrp").addEventListener("click", removeDivSmallScreen);