buttons.forEach((elem)=>{
    let deg=0;
    let interval=setInterval(()=>{
        elem.style.borderImage=`linear-gradient(${deg}deg, rgb(23, 23, 23) 80%, rgb(64, 64, 64) 20%) 1 / 1 / 0 stretch`;
        deg++ == 360?deg=0:null;
    },10)
    elem.addEventListener('mouseenter',function(){
        clearInterval(interval);
        elem.style.backgroundColor="#e5e7eb";
        elem.style.color="rgb(23, 23, 23)";
        interval=setInterval(()=>{
            elem.style.borderImage=`linear-gradient(${deg}deg, rgb(23, 23, 23) 80%, #e5e7eb 20%) 1 / 1 / 0 stretch`;
            deg++ == 360?deg=0:null;
        },10)
    });
    elem.addEventListener('mouseleave',function(){
        clearInterval(interval);
        elem.style.backgroundColor="rgb(64, 64, 64)";
        elem.style.color="#e5e7eb";
        interval=setInterval(()=>{
            elem.style.borderImage=`linear-gradient(${deg}deg, rgb(23, 23, 23) 80%, rgb(64, 64, 64) 20%) 1 / 1 / 0 stretch`;
            deg++ == 360?deg=0:null;
        },10)
    });
});
let checkFoter=true;
let checkComment=true;
window.onscroll = function() {
	if(document.documentElement.scrollTop>=3800 && checkFoter){
        addFooter();
        checkFoter=false;
    }
    else if(document.documentElement.scrollTop>3000 && checkComment){
        addButtonComment();
        checkComment=false;
    }
}
let mainElem=document.querySelector("#main");
let mainAnimation=[
    {
        margin:"0 -20% 0 0",
        img:"http://localhost:3000/images/загруженное55.png"
    },
    {
        margin:"0 0 0 -50%",
        img:"http://localhost:3000/images/загруженное33.png"
    },
    {
        margin:"0 -20% 0 0",
        img:"http://localhost:3000/images/загруженное22.png"
    },
    {
        margin:"0 0 0 -50%",
        img:"http://localhost:3000/images/загруженное11.png"
    }
];
if(window.matchMedia("(max-width: 768px)").matches){
    mainAnimation=[
        {
            margin:"0 -50% 0 0",
            img:"http://localhost:3000/images/загруженное55.png"
        },
        {
            margin:"0 0 0 -30%",
            img:"http://localhost:3000/images/загруженное33.png"
        },
        {
            margin:"0 -50% 0 0",
            img:"http://localhost:3000/images/загруженное22.png"
        },
        {
            margin:"0 0 0 -30%",
            img:"http://localhost:3000/images/загруженное11.png"
        }
    ];
};
let step=0;
setInterval(function() {
    mainElem.style.margin=mainAnimation[step].margin;
    mainElem.style.backgroundImage=`url(${mainAnimation[step].img})`;
    step<mainAnimation.length-1?step++:step=0;
},900);