//Sticky Nav
	function stickynav() {
		var navbar = document.getElementById("nav");
		var offset = navbar.offsetTop;
		if (window.pageYOffset >= offset) {
    		navbar.classList.add("sticky")
  		} else {
    		navbar.classList.remove("sticky");
  		} 
	}

	window.onload = stickynav();


//Date
function addDates(){
	let d = new Date();
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	document.getElementById("date").innerHTML = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() ;
	document.getElementById("delivery_date").innerHTML = d.getDate()+ 7 + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() ;
}

//Thumbnail

let thumbs = document.getElementsByClassName('thumb');
for (thumb of thumbs){
	thumb.addEventListener('click', swapImage)
}


function swapImage(event){
let current = document.getElementById('current');
let currentSrc = document.getElementById('current').src;

let thumb = event.target
let thumbSrc = event.target.src


current.src = thumbSrc
thumb.src = currentSrc
}