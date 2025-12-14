<?php

// Forward Vercel requests to Laravel correctly
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/../public/index.php';

require __DIR__ . '/../public/index.php';