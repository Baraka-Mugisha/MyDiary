
let ham = document.querySelector('.hamburger');
let navlist = document.querySelector('.nav-list');
ham.addEventListener('click', () => {
  if (navlist.style.display == "block") {
    navlist.style.display = ""
  }
  else {
    navlist.style.display = "block"
  }
})
