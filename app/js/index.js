let mobile = document.querySelectorAll('.game');

let btnPc = document.querySelector('.only-pc');
let btnAll = document.querySelector('.all');
let bttMb = document.querySelector('.only-mob');

btnPc.onclick = function(){
    mobile.forEach((elem) =>{
        if(elem.getAttribute('data-name') != 'pc'){
            elem.style.display = 'none'
            btnAll.classList.remove('active');
            bttMb.classList.remove('active');
            btnPc.classList.add('active');
        }else{
            elem.style.display = 'block'
        }
        
    })
}
bttMb.onclick = function(){
    mobile.forEach((elem) =>{
        if(elem.getAttribute('data-name') != 'mb'){
            elem.style.display = 'none'
            btnAll.classList.remove('active');
            btnPc.classList.remove('active');
            bttMb.classList.add('active');
        }else{
            elem.style.display = 'block'
        }
        
    })
}
btnAll.onclick = function(){
    mobile.forEach((elem) =>{
        
            elem.style.display = 'block'
            btnPc.classList.remove('active');
            bttMb.classList.remove('active');
            btnAll.classList.add('active');
        
        
    })
}

