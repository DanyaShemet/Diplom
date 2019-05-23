let game = document.querySelector('#game');
let figure = document.querySelector('.choose');
let way = 0;
let restart = document.querySelector('.restart');
let allblock = document.getElementsByClassName('block');

figure.onclick = function(e){
    let x = e.target.innerHTML =='x';
    let o = e.target.innerHTML =='o';
    if(x){
        document.querySelector('.circle').classList.remove('active');
        way = 0;
        e.target.classList.toggle('active');
    }
    if(o){
        document.querySelector('.krest').classList.remove('active');
        way = 1;
        e.target.classList.toggle('active')
    }
}
window.onload = function(){

    for(let i=0;i<9;i++){
        game.innerHTML+='<div class="block"></div>'
    }
    game.onclick = function(e){
        if(e.target.className == 'block'){
            if(way % 2 == 0){ 
                e.target.innerHTML = 'x';  
            }else{
                e.target.innerHTML = 'o';  
            }
            way++
            checkWinner();
        }
    }
    function checkWinner(){
        let matrix = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ];
        
        
        for (let i=0; i<matrix.length; i++){
            if (allblock[matrix[i][0]].innerHTML == 'x' && allblock[matrix[i][1]].innerHTML == 'x' && allblock[matrix[i][2]].innerHTML == 'x'){
                alert("Победил игрок 1 (X) ");
            }
            if (allblock[matrix[i][0]].innerHTML == 'o' && allblock[matrix[i][1]].innerHTML == 'o' && allblock[matrix[i][2]].innerHTML == 'o'){
                alert("Победил игрок 2 (O)");
            }
        } 
       
    }
    restart.onclick = function(){
        for(let i=0;i<allblock.length;i++){
            allblock[i].innerHTML = '';
        }
    }
}
