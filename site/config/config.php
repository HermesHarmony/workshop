<?php

return [
    'debug' => true,

    'thumbs' => [
        'presets' => [
            'avatar' => ['width' => 120, 'height' => 120, 'crop' => true, 'quality' => 80, 'format' => 'webp'],
            'thumbnail' => ['width' => 160, 'quality' => 80, 'format' => 'webp'],
            'pixel' => ['width' => 140, 'quality' => 80, 'format' => 'webp'],
            'small' => ['width' => 680, 'quality' => 80, 'format' => 'webp'],
            'default' => ['width' => 1024, 'quality' => 80, 'format' => 'webp'],
            'large' => ['width' => 1900, 'quality' => 80, 'format' => 'webp'],
            'fullscreen' => ['width' => 2600, 'quality' => 90, 'format' => 'webp'],
        ],

        'srcsets' => [
            'avatar' => [
                '40w' => ['width' => 120, 'height' => 120, 'crop' => true, 'quality' => 80, 'format' => 'webp'],
            ],

            'pixel' => [
                '40w' => ['width' => 40, 'quality' => 80, 'format' => 'webp'],
                '80w' => ['width' => 80, 'quality' => 80, 'format' => 'webp'],
                '120w' => ['width' => 140, 'quality' => 80, 'format' => 'webp']
            ],

            'thumbnail' => [
                '40w' => ['width' => 40, 'quality' => 80, 'format' => 'webp'],
                '80w' => ['width' => 80, 'quality' => 80, 'format' => 'webp'],
                '120w' => ['width' => 160, 'quality' => 80, 'format' => 'webp']
            ],

            'small' => [
                '180w' => ['width' => 180, 'quality' => 80, 'format' => 'webp'],
                '300w' => ['width' => 300, 'quality' => 80, 'format' => 'webp'],
                '800w' => ['width' => 680, 'quality' => 80, 'format' => 'webp']
            ],

            'default' => [
                '300w' => ['width' => 300, 'quality' => 80, 'format' => 'webp'],
                '800w' => ['width' => 300, 'quality' => 80, 'format' => 'webp'],
                '1024w' => ['width' => 1024, 'quality' => 80, 'format' => 'webp']
            ],

            'large' => [
                '800w' => ['width' => 800, 'quality' => 80, 'format' => 'webp'],
                '1024w' => ['width' => 1024, 'quality' => 80, 'format' => 'webp'],
                '1800w' => ['width' => 1900, 'quality' => 80, 'format' => 'webp']
            ],

            'fullscreen' => [
                '800w' => ['width' => 800, 'quality' => 90, 'format' => 'webp'],
                '1024w' => ['width' => 1024, 'quality' => 90, 'format' => 'webp'],
                '1800w' => ['width' => 2600, 'quality' => 90, 'format' => 'webp']
            ]
        ]
    ],

    // site SEO settings
    'tobimori.seo.canonicalBase' => 'https://www.example.com',
    'tobimori.seo.lang' => 'de_DE',
];
