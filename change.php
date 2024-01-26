<?php
	session_start();

	$jsonData = json_decode(file_get_contents("php://input"), true);
	$teacher_id = $jsonData['teacherId'];

	$link = mysqli_connect("localhost", "root", "", "itdb");

	$sql = "SELECT avg_rating FROM teachers WHERE id = $teacher_id";
	$res = mysqli_fetch_assoc(mysqli_query($link, $sql))['avg_rating'];

	echo $res;
	mysqli_close($link);
?>