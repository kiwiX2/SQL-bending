<?php
	function RateTeacher() {
		$user_id = $_SESSION['user_id'];
		$teacher_id = $_POST['teacher_id'];
		$rating = $_POST['rating'];
		
		$link = mysqli_connect("localhost", "root", "", "itdb");
		$stmt = $link->prepare("INSERT INTO ratings (user_id, teacher_id, rating) VALUES (?, ?, ?)
			ON DUPLICATE KEY UPDATE rating = ?");
		$stmt->bind_param("ssss", $user_id, $teacher_id, $rating, $rating);
		$stmt->execute();
		$stmt->close();
		
		$sql = "SELECT AVG(rating) as AVG FROM ratings WHERE teacher_id = $teacher_id";
		$res = mysqli_query($link, $sql);
		$row = mysqli_fetch_assoc($res);
		$avg = $row['AVG'];
		
		$sql = "UPDATE teachers SET avg_rating = $avg WHERE id = $teacher_id";
		mysqli_query($link, $sql);
		
		$link->close();
	}
?>