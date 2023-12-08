let mousedown = false;
let isFlipped = false;
let currentTeacher = 0;
let mousedownX;
let mouseupX;
const dragActionDistance = 100;
const body = document.body;
const teacherCard = document.querySelectorAll(".teacherCard");
const teacherCardBack = teacherCard[0].cloneNode(false);

teacherCard[currentTeacher].style.transition = "transform 0s ease-in-out";

teacherCardBack.addEventListener("click", flipteacherCard);
for (let i = 0; i < teacherCard.length; i++) {
	teacherCard[i].style.visibility = 'hidden';
	teacherCard[i].addEventListener("click", flipteacherCard);
	teacherCard[i].addEventListener("mousemove", moving);
}

teacherCard[0].style.visibility = 'visible';
teacherCardBack.style.opacity = '0';
teacherCardBack.style.zIndex = '-1';

body.appendChild(teacherCardBack);

document.addEventListener("mousedown", function(event) {
	mousedown = true;
	mousedownX = event.clientX;
});
document.addEventListener("mouseup", function(event) {
	mousedown = false;
	mouseupX = event.clientX;
});

function moving(event) {
	if (mousedown) {
		teacherCard[currentTeacher].style.transition = "transform 0s ease-in-out";
		console.log(event.clientX);
		teacherCard[currentTeacher].style.transform = "translate(" + (event.clientX - mousedownX) + "px, 0)";
		if (mouseupX > mousedownX + dragActionDistance) {
			changeTeacher();
		} else {

		}
	}
}

function changeTeacher() {
	teacherCard[currentTeacher].style.visibility = 'hidden';
	
	if (currentTeacher + 1 < teacherCard.length) {
		currentTeacher++;
	}

	teacherCard[currentTeacher].style.visibility = 'visible';
}

function flipteacherCard() {
	teacherCard[currentTeacher].style.transition = "all 0.5s ease-in-out, opacity 0s";

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