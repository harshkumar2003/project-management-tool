<?php
	$name = $_POST['name'];
	$email = $_POST['email'];

	// Database connection
	$conn = new mysqli('localhost','root','','data1');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : " .$conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into  once(name , email)values(? , ?)");
        $stmt->bind_param("ss",$name,$email);
		//echo $execval;
		echo "Registration successfully...";
		$stmt->execute();
		$conn->close();
	}
?>