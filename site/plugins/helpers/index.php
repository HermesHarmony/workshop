<?php 

# create icon embed
function icon($name, $class = false, $style = false, $set = 'solid', $size = false) {
    return '
        <span class="icon '.($class ?? null).'" style="'.($style ?? null).'">
            <i class="fa-'.$set.' fa-'.$name.' '.($size ? 'fa-'.$size : null).' "></i>
        </span>
        ';
}

# toggle debug functions
function debug() {
    if(site()->debug()->toBool()) {
        return true;
    } else {
        return false;
    }
}

# global versionnumber
function getSiteVersion() {
    $version = '0.0';

    return '?'.$version;
}

# text modifications
Kirby::plugin('hermy/helpers', [

    'functions' => [
        'icon' => function ($name, $class = false, $style = false, $set = 'solid', $size = false) {
            return icon($name, $class, $style, $set, $size);
        },
        'debug' => function () {
            return debug();
        },
    ],

    'fieldMethods' => [
        'toLabel' => function ($field) {
            if($field->value) {
                $field->value = '<p>'.str_replace('&/', '</p><p>', $field->value).'</p>';
            }
            return $field;
        }
    ],

    'siteMethods' => [
        'getVersion' => function () {
            return getSiteVersion();
        }
    ],

    'hooks' => [
        'kirbytext:after' => function (string $text) {

            // Genderstar
            if($text) {
            $text = preg_replace(
                '/(\*in)/', 
                '<span class="genderstar" aria-hidden="true">*</span><span aria-hidden="true">in</span><span hidden class="hidden">In</span>',
                $text
            );};

            // SoftHyphens
            $text = str_replace('(-)', '&shy;', $text);

            return $text;
        }
    ]
]);