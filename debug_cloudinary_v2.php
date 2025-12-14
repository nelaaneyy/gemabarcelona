<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$config = config('cloudinary');
echo "Config dump:\n";
var_dump($config);

if (isset($config['cloud_url'])) {
    echo "\nTrying to parse URL: " . $config['cloud_url'] . "\n";
    try {
        // Simulate what CloudinaryServiceProvider might be doing
        // It seems it uses Cloudinary\Configuration\Configuration
        $parsed = \Cloudinary\Configuration\Configuration::instance($config['cloud_url']);
        echo "Parsed successfully (object).\n";
        var_dump($parsed);
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage() . "\n";
    }
} else {
    echo "cloud_url is missing from config.\n";
}
