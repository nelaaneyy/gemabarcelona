<?php
// Usage: php scripts/replace-rt-route-params.php
// This script creates .bak backups before writing changes; review changes after run.

$root = __DIR__ . '/../';
$exts = ['php','blade.php','js','jsx','ts','tsx'];

function findFiles($root, $exts) {
    $rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root));
    $files = [];
    foreach ($rii as $file) {
        if ($file->isDir()) continue;
        $name = $file->getFilename();
        foreach ($exts as $ext) {
            if (substr($name, -strlen($ext)) === $ext) {
                $files[] = $file->getPathname();
                break;
            }
        }
    }
    return $files;
}

$patternPhp = '/route\(\s*([\'"])rt\.laporan\.([A-Za-z0-9_]+)\1\s*,\s*\$([A-Za-z_][A-Za-z0-9_]*)->id\s*\)/m';
$patternPhpArr = '/route\(\s*([\'"])rt\.laporan\.([A-Za-z0-9_]+)\1\s*,\s*\[\s*\$([A-Za-z_][A-Za-z0-9_]*)->id\s*\]\s*\)/m';
$patternJs = '/route\(\s*([\'"`])rt\.laporan\.([A-Za-z0-9_]+)\1\s*,\s*([A-Za-z_][A-Za-z0-9_-]*)\.id\s*\)/m';
$patternJsArr = '/route\(\s*([\'"`])rt\.laporan\.([A-Za-z0-9_]+)\1\s*,\s*\[\s*([A-Za-z_][A-Za-z0-9_-]*)\.id\s*\]\s*\)/m';

$files = findFiles($root, $exts);
$changed = [];

foreach ($files as $file) {
    $content = file_get_contents($file);
    $new = $content;

    // PHP/Blade: route('rt.laporan.xxx', $pengaduan) -> route('rt.laporan.xxx', $pengaduan)
    $new = preg_replace_callback($patternPhp, function($m){ return "route('rt.laporan.{$m[2]}', \${$m[3]})"; }, $new);
    $new = preg_replace_callback($patternPhpArr, function($m){ return "route('rt.laporan.{$m[2]}', \${$m[3]})"; }, $new);

    // JS/JSX: route('rt.laporan.xxx', { laporan: pengaduan.id }) -> route('rt.laporan.xxx', { laporan: pengaduan.id })
    $new = preg_replace_callback($patternJs, function($m){ return "route('rt.laporan.{$m[2]}', { laporan: {$m[3]}.id })"; }, $new);
    $new = preg_replace_callback($patternJsArr, function($m){ return "route('rt.laporan.{$m[2]}', { laporan: {$m[3]}.id })"; }, $new);

    if ($new !== $content) {
        copy($file, $file . '.bak');
        file_put_contents($file, $new);
        $changed[] = $file;
    }
}

echo "Processed files: " . count($files) . PHP_EOL;
echo "Changed files: " . count($changed) . PHP_EOL;
foreach ($changed as $c) echo " - $c\n";
