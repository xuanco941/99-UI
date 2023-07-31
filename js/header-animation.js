// DOMContentLoaded cây Dom sẵn sàng

window.addEventListener('DOMContentLoaded', event => {
    //scroll qua 100 y thì gắn fixed và thay css màu, . . .
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
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);


    //click showmenu mobile thì chuyển icon
    let btnShowMenu = document.querySelector('#btnShowMenu');
    btnShowMenu.addEventListener('click', () => {
        if (btnShowMenu.classList.contains('collapsed') == false) {
            btnShowMenu.innerHTML = '<i class="bi bi-x bi-xxl"></i>';
        }
        else {
            btnShowMenu.innerHTML = '<i class="bi bi-list bi-xl"></i>';
        }
    });


    //khi resize màn hình thay đổi size header bằng masthead, không phải trang home thì ẩn masthead
    const ChangeMasthead = () => {
        let masthead = document.querySelector('#masthead');
        let header = document.querySelector('#header');
        let nav_mobile = document.querySelector('#nav-mobile');
        let main = document.querySelector('#main');

        mastheadStyle = window.getComputedStyle(masthead).style;
        if(masthead.classList.contains('.show')){
            masthead.style.display = 'block';
        }
        else{
            masthead.style.display = 'none';
        }



        navMobileDisplay = window.getComputedStyle(nav_mobile).display;
        let headerHeight = masthead.clientHeight;
        if(navMobileDisplay == 'none'){
            header.style.height = headerHeight + "px";
        }
        else{
            header.style.height = (headerHeight + 55.5) + "px";
        }

    }



    ChangeMasthead();
    window.addEventListener('resize', () => {
        ChangeMasthead();
    });
})



window.addEventListener('load', event => {

});


