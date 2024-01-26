<?php 
	function DisplayLoginForm() {
		echo "
			<form id='loginForm' method='post'>
		    <p>Login</p>
		    <input type='text' name='login_name' placeholder='Username' required><br>
		    <input type='password' name='login_password' placeholder='Password'required><br>
		    <input type='submit' name='login_button' value='Login'>
        	</form>
        ";
	}

	function Login() {	
	    $link = mysqli_connect("localhost", "root", "", "itdb");

	    $login_name = $_POST["login_name"];
	    $login_password = $_POST["login_password"];

	    $stmt = $link->prepare("SELECT id, password FROM users WHERE username= ?");
	    $stmt->bind_param("s", $login_name);

	    $stmt->execute();
	    $stmt->bind_result($user_id, $hashed_password);

	    $result = $stmt->fetch();

		if (password_verify($login_password, $hashed_password)) {
			$_SESSION['user_id'] = $user_id;
		}

	    mysqli_close($link);
	}
?>
