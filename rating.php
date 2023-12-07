<?php
    function DisplayRatings() {
        $link = mysqli_connect("localhost", "root", "", "itdb");
        $sql = "SELECT * FROM teachers";
        $res = mysqli_query($link, $sql);
        while($row = mysqli_fetch_assoc($res)){ 
        echo "
            <div class='teacherCard'>
                <img src='". $row['picture'] ."' draggable='false' alt='Teacher portrait'>
                <p id='teacherName'>". $row['name'] ."</p>
                <p id='teacherSubjects'>Subject(s): " . $row['subject'] ."</p>
            </div>
        ";
        }
    }
?>