window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function

    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY <= 100) {
            navbarCollapsible.classList.remove('navbar-shrink');
            navbarCollapsible.classList.remove('fixed-top');
            navbarCollapsible.classList.add('position-relative');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
            navbarCollapsible.classList.add('fixed-top');
            navbarCollapsible.classList.remove('position-relative');
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);



    const gifImage = document.getElementById("masthead_img");

    gifImage.src = "./assets/masthead.gif";
    setTimeout(function () {
        gifImage.classList.add('animate-fadeIn');
        gifImage.src = "./assets/last_frame.png";
    }, 6280);

});


