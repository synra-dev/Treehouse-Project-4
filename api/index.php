<?php
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://www.thegamegal.com/wordgenerator/generator.php?game=7&category=69');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	$res = curl_exec($ch);
    curl_close($ch);
    
    echo $res;
?>