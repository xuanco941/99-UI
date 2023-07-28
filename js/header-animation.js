// DOMContentLoaded cây Dom sẵn sàng

window.addEventListener('load', event => {

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

    let btnShowMenu = document.querySelector('#btnShowMenu');
    btnShowMenu.addEventListener('click', () => {
        if (btnShowMenu.classList.contains('collapsed') == false) {
            btnShowMenu.innerHTML = '<i class="bi bi-x bi-xxl"></i>';
        }
        else {
            btnShowMenu.innerHTML = '<i class="bi bi-list bi-xl"></i>';
        }
    });



});


