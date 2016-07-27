<head>
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

		<meta charset="utf-8">

		<title>BlackRockSoul</title>

		<meta name="theme-color" content="black">
		<meta name=viewport content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta name="Description" content="Сайт одного быдлокодера с ником BlackRockSoul">
		<meta name="Keywords" content="сайт, визитка, github, BlackRockSoul, кодер, программирование">
		<meta name="application-name" content="BlackRockSoul" />
		<meta name="msapplication-square70x70logo" content="/images/win_titles/small.jpg" />
		<meta name="msapplication-square150x150logo" content="/images/win_titles/medium.jpg" />
		<meta name="msapplication-wide310x150logo" content="/images/win_titles/wide.jpg" />
		<meta name="msapplication-square310x310logo" content="/images/win_titles/large.jpg" />
		<meta name="msapplication-TileColor" content="#000000" />

		<link href="/css/style.min.css" rel="stylesheet" type="text/css">
		<!--	<link href="/css/style.css" rel="stylesheet" type="text/css">-->
		<link href="images/favicon.ico" rel="icon" type="image/x-icon">
		<link rel="stylesheet" href="fonts/mdfi_communication.css">
		<link rel="stylesheet" href="fonts/css/font-awesome.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js" type="text/javascript"></script>

		<script src="/js/noframework.waypoints.min.js" type="text/javascript"></script>
		<script src="/js/jquery.smoothwheel.min.js" type="text/javascript"></script>

		<link rel="stylesheet" type="text/css" href="slick/slick.css">
		<script src="slick/slick.min.js" type="text/javascript"></script>

		<script src="/js/main.min.js" type="text/javascript"></script>
		<!--	<script src="/js/main.js" type="text/javascript"></script>-->

</head>
