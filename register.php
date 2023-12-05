<?php 
    function DisplayRegisterForm() {
        echo '<form id="registerForm" action="" method="post">';
        echo '<p>Register</p>';
        echo '<input type="text" name="name" placeholder="Username" required><br>';
        echo '<input type="password" name="password" placeholder="Password" required><br>';
        echo '<input type="submit" name="register_button" value="Register">';
        echo '</form>';
    }

    function Register() {    
        $link = mysqli_connect("localhost", "root", "", "itdb");
        
        $username = $_POST['name'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

        $stmt = $link->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $password);

        $stmt->execute();
        $stmt->close();

        mysqli_close($link);
    }
?>
