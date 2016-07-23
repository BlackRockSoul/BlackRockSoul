<head id="head">
	<?php

	function debug( $data ) {

		if ( is_array( $data ) )
			$output = "<script>console.log( 'Debug: " . implode( ',', $data) . "' );</script>";
		else
			$output = "<script>console.log( 'Debug: " . $data . "' );</script>";
		echo $output;
	}

	$iterator = new DirectoryIterator('inc');
	$mtime = -1;
	foreach ($iterator as $fileinfo) {
		if ($fileinfo->isFile()) {
			if ($fileinfo->getMTime() > $mtime) {
				$mtime = $fileinfo->getMTime();
				$dir_time = gmdate("D, d M Y H:i:s \G\M\T", $mtime);
			}
		}
	}

	$LastModified_unix = strtotime(date("D, d M Y H:i:s", filectime($_SERVER['SCRIPT_FILENAME'])));
	$LastModified = gmdate("D, d M Y H:i:s \G\M\T", $LastModified_unix);
	$IfModifiedSince = false;
	if (isset($_ENV['HTTP_IF_MODIFIED_SINCE']))
		$IfModifiedSince = strtotime(substr($_ENV['HTTP_IF_MODIFIED_SINCE'], 5));
	if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']))
		$IfModifiedSince = strtotime(substr($_SERVER['HTTP_IF_MODIFIED_SINCE'], 5));
	if ($IfModifiedSince && $IfModifiedSince >= $LastModified_unix) {
		header($_SERVER['SERVER_PROTOCOL'] . ' 304 Not Modified');
		exit;}

	if($dir_time > $LastModified) {
		$LastModified=$dir_time;
	}

	header('Last-Modified: '. $LastModified);
	header("Expires: " . gmdate("D, d M Y H:i:s", time() + 60*60*24) . " GMT");
	?>

	<title>BlackRockSoul</title>
	<meta http-equiv="Cache-Control" content="max-age=604800, must-revalidate" />
	<meta http-equiv="Content-language" content="ru-RU">
	<meta name="theme-color" content="black">
	<meta name=viewport content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="Description" content="Сайт одного быдлокодера с ником BlackRockSoul">
	<meta name="Keywords" content="сайт, визитка, github, BlackRockSoul, кодер, программирование">

	<link href="/css/style.min.css" rel="stylesheet" type="text/css">
	<!--		<link href="/css/style.css" rel="stylesheet" type="text/css">-->
	<link href="images/favicon.ico" rel="icon" type="image/x-icon" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script src="/js/main.min.js" async></script>
	<!--		<script src="/js/main.js" async></script>-->
	<meta charset="utf-8">	
				
</head>
