function Game(context, cellSize){
	let arr = [
			[1,2,3,4],
			[5,6,7,8],
			[9,10,11,12],
			[13,14,15,0]
		];
	let clicks = 0;
	let color = document.querySelector('#color');
	color.onchange = numView;

	// Перевірка на 0
	this.getNullCell = function(){
		for (let i = 0; i<4; i++){
			for (let j=0; j<4; j++){
				if(arr[j][i] === 0){
					return {'x': i, 'y': j}	// Асоц массив 1-3
				}
				
			}
		}
	}
	// Функції створення і малювання
	function cellView(x, y){
		context.fillStyle = "#f9f9f9";
	    context.fillRect(x+1, y+1, cellSize-2, cellSize-2);
	}
	function numView(){
		context.font = "bold "+(cellSize/2)+"px Sans";
    	context.textAlign = "center";
    	context.textBaseline = "middle";
    	context.fillStyle = color.value;
	}
	this.draw = function() {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (arr[i][j] > 0) {
					cellView(j * cellSize, i * cellSize);
					numView();
					context.fillText(arr[i][j], j * cellSize + cellSize / 2, 
									i * cellSize + cellSize / 2);
				}
			}
		}
	};
	//  Функції переміщення
	this.move = function(x, y) {
		let nullX = this.getNullCell().x;
		let nullY = this.getNullCell().y;
		if (((x - 1 == nullX || x + 1 == nullX) && y == nullY) || ((y - 1 == nullY || y + 1 == nullY) && x == nullX)) {
			arr[nullY][nullX] = arr[y][x];
			arr[y][x] = 0;
			clicks++;
		}
	};
	//  Функції перевірки на перемогу
	this.victory = function() {
		let e = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]];
		let res = true;
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (e[i][j] != arr[i][j]) {
					res = false;
				}
			}
		}
		return res;
	}
	
	// Рандомне значення для порівняння
	function getRandomBool() {
		if (Math.floor(Math.random() * 2) === 0) {
			return true;
		}
	}
	// Функція перемішування елементів
	this.mix = function(stepCount) {
		console.log(stepCount);
		let x,y;
		for (let i = 0; i < stepCount; i++) {
			let nullX = this.getNullCell().x;
			let nullY = this.getNullCell().y;
			let hMove = getRandomBool();
			let upLeft = getRandomBool();
			if (!hMove && !upLeft) { y = nullY; x = nullX - 1;}
			if (hMove && !upLeft)  { x = nullX; y = nullY + 1;}
			if (!hMove && upLeft)  { y = nullY; x = nullX + 1;}
			if (hMove && upLeft)   { x = nullX; y = nullY - 1;}
			if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
				this.move(x, y);
			}
		}
		// console.log(x, y)
		clicks = 0;
	};
	// Кількість кліків
	this.getClicks = function() {
		return clicks;
	};
}


window.onload = function(){
	let canvas = document.getElementById("canvas");
	// Проверка на ширину экрана
	if(window.innerWidth < 600){
		canvas.width  = 300;
	    canvas.height = 300;
	}else{
		canvas.width  = 540;
	    canvas.height = 540;
	}
	   
	let cellSize = canvas.width / 4;
	let context = canvas.getContext("2d");
	context.fillRect(0, 0, canvas.width, canvas.height);
 
	let game = new Game(context, cellSize);
	game.mix(300);
	game.draw();


	canvas.onclick = function(e) {
	let x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
	let y = (e.pageY - canvas.offsetTop)  / cellSize | 0;
	event(x, y); 
};
 
canvas.ontouchend = function(e) {
	let x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
	let y = (e.touches[0].pageY - canvas.offsetTop)  / cellSize | 0;
	event(x, y);
};  
 
function event(x, y) { 
	game.move(x, y);
	context.fillRect(0, 0, canvas.width, canvas.height);
	game.draw();
		if (game.victory()) {
			alert("Зібрано за "+game.getClicks()+" дотик!");
			location.reload()
			game.mix(300);
			context.fillRect(0, 0, canvas.width, canvas.height);
				game.draw(context, cellSize);
		}
	}
}