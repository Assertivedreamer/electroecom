const body = document.querySelector('body');
const hamburgerBtn = document.querySelector('.header__hamburger-toggle');
const hamburgerImg = document.querySelector('.header__hamburger')
const mobileNav = document.querySelector('.categories--nav')



function handleHam(){
    body.classList.toggle('nav-is-open')
    mobileNav.classList.toggle('nav-is-open')
    hamburgerImg.classList.toggle('nav-is-open')

}


//EVENT LISTENERS
hamburgerBtn.addEventListener('click', handleHam)





// document.addEventListener('DOMContentLoaded', () => {
//     console.log('loaded')
// })