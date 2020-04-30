const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let img = document.querySelectorAll('.img');

for(let i = 0;i<img.length;i++){
	img[0].onchange = function () {
		if (this.files && this.files[0]) {
				let reader = new FileReader();
				reader.onload = function (e) {
						$('.front-face1').attr('src', e.target.result);
				}
				reader.readAsDataURL(this.files[0]);
		}
	}
	img[1].onchange = function () {
		if (this.files && this.files[0]) {
				let reader = new FileReader();
				reader.onload = function (e) {
						$('.front-face2').attr('src', e.target.result);
				}
				
				reader.readAsDataURL(this.files[0]);
		}
	}
	img[2].onchange = function () {
		if (this.files && this.files[0]) {
				let reader = new FileReader();
				reader.onload = function (e) {
						$('.front-face3').attr('src', e.target.result);
				}
				
				reader.readAsDataURL(this.files[0]);
		}
	}
	img[3].onchange = function () {
		if (this.files && this.files[0]) {
				let reader = new FileReader();
				reader.onload = function (e) {
						$('.front-face4').attr('src', e.target.result);
				}
				
				reader.readAsDataURL(this.files[0]);
		}
	}
	img[4].onchange = function () {
		if (this.files && this.files[0]) {
				let reader = new FileReader();
				reader.onload = function (e) {
						$('.front-face5').attr('src', e.target.result);
				}
				
				reader.readAsDataURL(this.files[0]);
		}
	}
	img[5].onchange = function () {
		if (this.files && this.files[0]) {
				let reader = new FileReader();
				reader.onload = function (e) {
						$('.front-face6').attr('src', e.target.result);
				}
				
				reader.readAsDataURL(this.files[0]);
		}
	}

}

// Функція дії карток
function flipCard() {
	let count = 0;
	if (lockBoard) return;
	 if (this === firstCard) return;
	 
	this.classList.add('flip');
	cards.forEach(function(elem){
		if(elem.classList.contains('flip')){
			count++;
		}
		if(count == 12){
			alert('Молодець! В тебе вийшло!');
			location.reload()
		}
	})
	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;
	hasFlippedCard = false;

	checkForMatch();
}
// Функція порівняння двух карт
function checkForMatch (){
	if (firstCard.dataset.name === secondCard.dataset.name) {
		disableCards();
		return true;
	}

	unFlipCards();
}
// Функція яка блокує клік на знайденні карти
function disableCards(){
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
}
// Функція перегортання карток в перше положення
function unFlipCards(){
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		lockBoard = false;
	}, 1000);
}
// Функція перемішування
(function shuffle() {
	cards.forEach(card => {
		let ramdomPos = Math.floor(Math.random() * 12);
		card.style.order = ramdomPos;
	});
})();

// function resetBoard() {
//     [hasFlippedCard, lockBoard] = [false, false];
//     [firstCard, secondCard] = [null, null];
//   }



cards.forEach(card => card.addEventListener('click', flipCard));