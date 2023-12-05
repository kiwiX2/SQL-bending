<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>PHP login yooo</title>
        <link rel="stylesheet" href="style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
        <body>

        <?php
            session_start();

            include('register.php');
            include('login.php');
            include('logout.php');
            include('rating.php');
            include('rate.php');

            if (isset($_SESSION['user_id'])) {
                $isLoggedIn = true;

                if (isset($_POST['rate_button'])) {
                    RateTeacher();
                }
            } else {
                $isLoggedIn = false;
            }

            if (!$isLoggedIn) {
                echo '<div id="formBox">';
                DisplayLoginForm();
                DisplayRegisterForm();
                echo '</div>';
    
                if (isset($_POST['login_button'])) {
                    Login();

                    if (isset($_SESSION['user_id'])) {
                        header('Refresh:0');
                        echo "Login successful! " . $_POST['login_name'];
                    } else {
                        echo "Login failed...";
                    }
                }

                if (isset($_POST['register_button'])) {
                    Register();
                }
            } else {
                DisplayLogoutForm();
                DisplayRatings();

                if (isset($_POST['logout_button'])) {
                    session_destroy();
                    unset($_SESSION['user_id']);
                    header('Refresh:0');
                }
            }
        ?>
    </body>
</html>