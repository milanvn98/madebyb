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
