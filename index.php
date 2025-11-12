<?php

include __DIR__ . '/vendor/autoload.php';

$kirby = new Kirby\Cms\App([
    'roots' => [
        'storage'  => $storage = './storage',
        'accounts' => $storage . '/accounts',
        'cache'    => $storage . '/cache',
        'sessions' => $storage . '/sessions',
    ]
]);

echo $kirby->render();
