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

function removeBlankOptions(){
	const options = document.querySelectorAll('.option')

	for (option of options){
		if(option.innerHTML == "nan"){
			option.remove()
		}
	}
}



function selectImage(){
	const selector = document.querySelector('#colour_select')
	const page = document.getElementById('prod_title').innerHTML
	
	selector.addEventListener('change', function(){
		let x = selector.selectedIndex
		const image = document.getElementById('current');
		const thumb0 = "../Images/products/" + page + "/main.jpeg"
		const thumb0Element = document.getElementById('current')
		const thumb1 = "../Images/products/" + page + "/thumb1.jpeg"
		const thumb1Element = document.getElementById('thumb1')
		const thumb2 ="../Images/products/" + page + "/thumb2.jpeg"
		const thumb2Element = document.getElementById('thumb2')
		const thumb3 = "../Images/products/" + page + "/thumb3.jpeg"
		const thumb3Element = document.getElementById('thumb3')
		const thumb4 = "../Images/products/" + page + "/thumb4.jpeg"

		if (page == "N-Dots"){switch(x){
			case 0:
				resetThumbs()
				thumb0Element.src = image.src
				image.src = thumb0;
			break;
			case 1:
				resetThumbs()
				thumb1Element.src = image.src
				image.src = thumb1;
			break;

			case 2:
				resetThumbs()
				thumb2Element.src = image.src
				image.src = thumb2;
			break;

			case 3:
				resetThumbs()
				thumb2Element.src = image.src
				image.src = thumb2;
			break;

			case 4:
				resetThumbs()
				thumb2Element.src = image.src
				image.src = thumb2; 
			break;

		}

		function resetThumbs(){
			thumb0Element.src = thumb0
			thumb1Element.src = thumb1
			thumb2Element.src = thumb2
			thumb3Element.src = thumb3
		}

	} else {


		function resetThumbs(){
			thumb0Element.src = thumb0
			thumb1Element.src = thumb1
			thumb2Element.src = thumb2
			thumb3Element.src = thumb3
		}
			
		switch(x){
			case 0:
				resetThumbs()
				thumb0Element.src = image.src
				image.src = thumb0;
			break;
			case 1:
				resetThumbs()
				thumb1Element.src = image.src
				image.src = thumb1;
			break;

			case 2:
				resetThumbs()
				thumb2Element.src = image.src
				image.src = thumb2;
			break;

			case 3:
				resetThumbs()
				thumb3Element.src = image.src
				image.src = thumb3;
			break;

			case 4:
				resetThumbs()
				image.src = thumb4; 
			break;

		}
	}
		
	})}

	