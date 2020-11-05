const body = document.body;
const menu = document.getElementById('menu');
menu.addEventListener('click', openMenu);
function openMenu(){
    body.classList.toggle('show');
}