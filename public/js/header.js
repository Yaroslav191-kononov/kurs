let Random=(min, max)=> Math.floor(Math.random() * (max - min + 1)) + min;
document.querySelectorAll('header div a').forEach(elem=>{
    elem.addEventListener('mouseenter',OnMoveHeader.bind(elem));
    elem.addEventListener('mouseleave',OnMoveHeader.bind(elem));
});
function OnMoveHeader(){
    this.classList.toggle('hoverHeader');
}