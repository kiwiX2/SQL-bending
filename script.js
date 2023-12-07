const teacherCard = document.querySelectorAll(".teacherCard");
const teacherCardBack = teacherCard[0].cloneNode(false);

teacherCardBack.style.opacity = '0';
teacherCardBack.style.zIndex = '-1';

document.body.appendChild(teacherCardBack);

teacherCard[0].addEventListener("click", flipteacherCard);
teacherCardBack.addEventListener("click", flipteacherCard);

let isFlipped = false;

function flipteacherCard() {
	if (isFlipped) {
		teacherCard[0].style.transform = 'rotateY(0deg)';
		teacherCardBack.style.transform = 'rotateY(0deg)';
		setTimeout(function() {
			teacherCard[0].style.opacity = '1';
			teacherCardBack.style.opacity = '0';
		}, 250);
	} else {
		teacherCard[0].style.transform = 'rotateY(180deg)';
		teacherCardBack.style.transform = 'rotateY(180deg)';
		setTimeout(function() {
			teacherCard[0].style.opacity = '0';
			teacherCardBack.style.opacity = '1';
		}, 250);
	}

	isFlipped = !isFlipped;
}