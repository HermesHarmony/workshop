<?php 

return function ($kirby, $page) {
    return [
        'projects' => $kirby->collection('projects'),
    ];
};