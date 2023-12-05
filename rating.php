<?php
    function DisplayRatings() {
        $link = mysqli_connect("localhost", "root", "", "itdb");
        $sql = "SELECT * FROM teachers";
        $res = mysqli_query($link, $sql);
        while($row = mysqli_fetch_assoc($res)){ 
        echo "
            <div class='teacher'>
            <form action='' method='post'>
            <select name='rating'>
                <option value=1>1</option>
                <option value=2>2</option>
                <option value=3>3</option>
                <option value=4>4</option>
                <option value=5>5</option>
                <option value=6>6</option>
                <option value=7>7</option>
                <option value=8>8</option>
                <option value=9>9</option>
                <option value=10>10</option>
            </select>
            <input type='hidden' value='" . $row['id'] . "' name='teacher_id'>
            <input type='submit' name='rate_button' value='Rate'>
            </form>

            <img src='". $row['picture'] ."' alt='No image'>
            <p>Name: " . $row['name'] ."</p>
            <p>Subject: " . $row['subject'] ."</p>
            </div>
        ";
        }
    }
?>