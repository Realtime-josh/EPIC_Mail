
let i = 0;
let images = [];
let time = 4000;

//Image List
images[0] = "img/homepageimage1.jpg";
images[1] = "img/homepageimage2.jpg";
images[2] = "img/homepageimage3.jpg";
images[3] = "img/epicmailcover.jpg";

//time change
function changeImg(){
	document.slide.src= images[i];

	if(i<images.length -1){
		i++;
	}else{
		i=0;
	}

	setTimeout("changeImg()", time);
}


window.onload = changeImg;