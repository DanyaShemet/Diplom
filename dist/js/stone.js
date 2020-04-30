//  Створення функції
function race(elid, width, height, speed, strength){
    let canvas = document.querySelector(elid),
            ctx = canvas.getContext("2d"),
            pos = 0, 
            blocks = [];
    canvas.width = width; 
    canvas.height = height;
    ctx.fillStyle = "#242424";

//    Запуск інтервальної функіїї по кліку
    window.onclick = function(){
        let game = setInterval(function(){
            if( Math.random() < strength) blocks.push([Math.random()*(width-10),-10]);
            ctx.clearRect(0,0,width,height);
            ctx.fillRect(pos,height-50,10,100);//Малюємо основний прямокутник
            for(let i = 0; i < blocks.length; i++){
                ctx.fillRect(blocks[i][0],blocks[i][1],10,10);
                // Якщо квадратики врізались в прямокутник
                if( blocks[i][1] > height - 60 && blocks[i][1] < height - 10 && Math.abs( pos - blocks[i][0]) < 10 ){
                    alert("Гру закінчено, в тебе " + Math.floor(1000 * strength) + " points.");
                    location.reload()
                    clearInterval(game);
                }
                // Перевірка на великі квадратики
                if( blocks[i][1] > height - 5 ){
                    blocks.splice( i, 1);
                    i--;
                } 
                // Додавання квадратів
                else {
                    blocks[i][1] += 5;
                }
            }
            // Бали
            strength += 0.001;
        },speed);
    }
   
    document.addEventListener('mousemove', function (e) {
        pos = (e.pageX > 0) ? ((e.pageX < width) ? e.pageX : width-10) : 0;
    }, false);
}

// Викоик функціїї
race("#canvas",1200,600,20,0.05);