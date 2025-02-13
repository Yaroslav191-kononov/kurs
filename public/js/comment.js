function CommentSee(){
    fetch('/comm',{
        method:'POST',
    }).then(res=>res.json()).then(data=>{
        let comm=document.querySelector('#comm');
        let div=document.createElement('div');
        div.classList.add('flex','flex-wrap','justify-evenly','w-full');
        data.forEach(elem => {
                let str;
                console.log(Object.values(elem)[2]);
                let img=Object.values(elem)[2]?'http://localhost:3000/uploads/'+Object.values(elem)[2]:'http://localhost:3000/images/user.png';
                if((window.matchMedia("(max-width: 768px)").matches)){
                    str=`
                        <div class="bg-neutral-700 w-Pfone p-6 h-adp m-4">
                            <div class=" flex justify-between">
                                <h2 class="bg-neutral-900 text-4xl p-2 text-wrap">${Object.values(elem)[1]}<h2>
                            </div>
                            <img src="${img}" class="img float-left p-4">
                            <p class='bg-neutral-900 p-2 text-xl text-wrap h-comm'>${Object.values(elem)[0]}<p>
                        </div>`;
                        comm.style.padding='5px';
                }
                else{
                    str=`
                        <div class="bg-neutral-700 w-100 p-10 h-adp m-4">
                            <div class="flex flex-col items-center w-max">
                                <h2 class="bg-neutral-900 text-6xl p-4 text-wrap w-max">${Object.values(elem)[1]}<h2>
                            </div>
                            <img src="${img}" class="img float-left p-4">
                            <p class='bg-neutral-900 p-6 text-wrap h-comm'>${Object.values(elem)[0]}<p>
                        </div>`;
                }
                div.insertAdjacentHTML("beforeEnd",str);
        });
        comm.append(div);
    });
}
CommentSee();
let add=document.querySelector('#add');
let hide=document.querySelector('#hide');
hide.children[0].addEventListener('click',()=>{
    hide.classList.add('hidden');
});
add.addEventListener('click',()=>{
    hide.classList.remove('hidden');
});
document.querySelector('#formComm').addEventListener('submit',(e)=>{
    e.preventDefault();
    var form = document.getElementById("formComm");
    var formData = new FormData(form);
    fetch('/commAdd',{
        method:'POST',
        body:formData
    }).then(res=>res.text()).then(data=>data).then((data)=>{
        let h2=document.createElement('h2');
        h2.classList.add();
        h2.textContent=data;
        h2.classList.add('absolute','text-7xl','mx-auto','bottom-3/4','bg-neutral-900');
        hide.append(h2);
        h2.addEventListener('click',()=>{
            h2.remove();
        });
        document.querySelectorAll('#comm div').forEach((elem)=>elem.remove());
        CommentSee();
    });
});
function addButtonComment(){
    document.querySelector('#add').style.right='-145px';
};