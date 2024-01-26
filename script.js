let mousedown = false;
let isFlipped = false;
let isMoving = false;
let currentTeacher = 0;
let mousedownX;
let mouseupX;
const dragActionDistance = 100;
const body = document.body;
const teacherCard = document.querySelectorAll(".teacherCard");
let teacherCardBack = [];
let ratingP = [];

for (let i = 0; i < teacherCard.length; i++) {
	teacherCard[i].style.visibility = 'hidden';
	teacherCard[i].addEventListener("click", flipteacherCard);
	teacherCard[i].addEventListener("mousemove", moving);
	teacherCard[i].addEventListener("mouseup", released);

	teacherCardBack[i] = teacherCard[i].cloneNode(false);
	teacherCardBack[i].classList.add('teacherCardBack');
	teacherCardBack[i].style.visibility = 'hidden';
	teacherCardBack[i].addEventListener("click", flipteacherCard);
	teacherCardBack[i].addEventListener("mousemove", moving);
	teacherCardBack[i].addEventListener("mouseup", released);
	body.appendChild(teacherCardBack[i]);
}

teacherCard[0].style.visibility = 'visible';
teacherCardBack[0].style.visibility = 'visible';

document.addEventListener("mousedown", (event) => {
	mousedown = true;
	mousedownX = event.clientX;
});

function moving(event) {
	if (mousedown) {
		isMoving = true;
		teacherCard[currentTeacher].style.transition = "transform 0s ease-in-out";
		teacherCard[currentTeacher].style.transform = 
		"translate(" + (event.clientX - mousedownX) + "px, 0) rotate(" + (event.clientX - mousedownX) * 0.05 + "deg)";

		let tempRotation = 180 + (event.clientX - mousedownX) * 0.05;
		ratingP[currentTeacher].style.transform = "scale(-1, -1)";
		teacherCardBack[currentTeacher].style.transition = "transform 0s ease-in-out";
		teacherCardBack[currentTeacher].style.transform = 
		"translate(" + (event.clientX - mousedownX) + "px, 0) rotate(" + tempRotation + "deg)";
	}
}

function released(event) {
	mousedown = false;
	mouseupX = event.clientX;
	setTimeout(() => {
		isMoving = false;
	}, 100);

	if (mouseupX > mousedownX + dragActionDistance) {
		let rating = 1;
		changeTeacher(rating);
	} 

	else if (mouseupX < mousedownX - dragActionDistance) {
		let rating = 0;
		changeTeacher(rating);
	} 

	teacherCard[currentTeacher].style.transition = "transform 0.5s ease-in-out";
	teacherCard[currentTeacher].style.transform = "translate(0px, 0px)";
	teacherCardBack[currentTeacher].style.transition = "transform 0.5s ease-in-out";
	teacherCardBack[currentTeacher].style.transform = "translate(0px, 0px) rotate(180deg)";
}

function changeTeacher(rating) {
	if (!isFlipped) {
		mouseDownX = 0;
		mouseupX = 0;
	} else {
		return;
	}

	teacherCard[currentTeacher].style.visibility = 'hidden';
	teacherCardBack[currentTeacher].style.visibility = 'hidden';
	
	if (currentTeacher + 1 < teacherCard.length) {
		currentTeacher++;
	}

	teacherCard[currentTeacher].style.visibility = 'visible';
	teacherCardBack[currentTeacher].style.visibility = 'visible';

	isFlipped = false;

	phpCallRate(rating);
}

function flipteacherCard() {
	if (isMoving) {
		return;
	}

	if (isFlipped) {
		teacherCard[currentTeacher].style.transform = 'rotateY(0deg)';
		teacherCardBack[currentTeacher].style.transform = 'rotateY(0deg)';
		setTimeout(() => {
			teacherCard[currentTeacher].style.opacity = '1';
			teacherCardBack[currentTeacher].style.opacity = '0';
		}, 250);
	} else {
		getAverageRating();

		teacherCard[currentTeacher].style.transform = 'rotateY(180deg)';
		teacherCardBack[currentTeacher].style.transform = 'rotateY(180deg)';
		setTimeout(() => {
			teacherCard[currentTeacher].style.opacity = '0';
			teacherCardBack[currentTeacher].style.opacity = '1';
		}, 250);
	}

	isFlipped = !isFlipped;
}

function phpCallRate(rating) {
	let xmlhttprequest = new XMLHttpRequest();

	xmlhttprequest.open('POST', 'rate.php', true);
	xmlhttprequest.setRequestHeader('Content-Type', 'application/json');

	let jsonData = JSON.stringify({rating, currentTeacher});

	xmlhttprequest.send(jsonData);
}

function getAverageRating() {
	let xmlhttprequest = new XMLHttpRequest();

	xmlhttprequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let avgRating = xmlhttprequest.response;
			updateBack(avgRating);
		}
	};

	xmlhttprequest.open('POST', 'change.php', true);
	xmlhttprequest.setRequestHeader('Content-Type', 'application/json');

	let teacherId = currentTeacher + 1;

	let jsonData = JSON.stringify({teacherId});

	xmlhttprequest.send(jsonData);
}

function updateBack(avgRating) {
	if (ratingP[currentTeacher] != null) {
		return;
	}

	ratingP[currentTeacher] = document.createElement("p");
	ratingP[currentTeacher].classList.add("ratingText");
	ratingP[currentTeacher].innerHTML = "Average rating: " + avgRating;

	teacherCardBack[currentTeacher].appendChild(ratingP[currentTeacher]);
}