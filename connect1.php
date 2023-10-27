<?php

	$fname = $_POST['fname'];
	$uname = $_POST['uname'];
	$psw = $_POST['psw'];
	$psw1 = $_POST['psw1'];

	// Database connection
	$conn = new mysqli('localhost','root','','login-data');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : " .$conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into  log1(fname,uname , psw , psw1)values(? , ? ,? ,?)");
        $stmt->bind_param("ssss",$fname,$uname,$psw,$psw1);
		//echo $execval;
        //
		$stmt->execute();
		$conn->close();
	}
?>