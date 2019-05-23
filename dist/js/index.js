let mobile = document.querySelectorAll('.game');

let btnPc = document.querySelector('.only-pc');
let btnAll = document.querySelector('.all');

btnPc.onclick = function(){
    mobile.forEach((elem) =>{
        if(elem.getAttribute('data-name') != 'pc'){
            elem.style.display = 'none'
            btnAll.classList.remove('active');
            btnPc.classList.add('active');
        }
        
    })
}
btnAll.onclick = function(){
    mobile.forEach((elem) =>{
        
            elem.style.display = 'block'
            btnPc.classList.remove('active');
            btnAll.classList.add('active');
        
        
    })
}

