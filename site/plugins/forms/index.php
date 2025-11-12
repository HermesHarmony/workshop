<?php

Kirby::plugin('jonasrebmann/forms', [
  'blueprints' => [
    'blocks/forms'          => __DIR__ . '/blueprints/blocks/forms.yml',
    'blocks/field_std'      => __DIR__ . '/blueprints/blocks/field_std.yml',
    'blocks/field_email'    => __DIR__ . '/blueprints/blocks/field_email.yml',
    'blocks/field_select'   => __DIR__ . '/blueprints/blocks/field_select.yml',
    'blocks/field_textarea' => __DIR__ . '/blueprints/blocks/field_textarea.yml',
    'blocks/field_privacy'  => __DIR__ . '/blueprints/blocks/field_privacy.yml',
    'pages/form'            => __DIR__ . '/blueprints/pages/form.yml',
  ],
  'snippets' => [
    'blocks/forms'          => __DIR__ . '/snippets/blocks/forms.php',
    'blocks/field_std'      => __DIR__ . '/snippets/blocks/field_std.php',
    'blocks/field_email'    => __DIR__ . '/snippets/blocks/field_email.php',
    'blocks/field_select'   => __DIR__ . '/snippets/blocks/field_select.php',
    'blocks/field_textarea' => __DIR__ . '/snippets/blocks/field_textarea.php',
    'blocks/field_privacy'  => __DIR__ . '/snippets/blocks/field_privacy.php',
    'field'                 => __DIR__ . '/snippets/field.php',
    'form'                  => __DIR__ . '/snippets/form.php',
  ],
  'templates' => [
    'emails/toadmin'        => __DIR__ . '/templates/emails/toadmin.html.php',
    'emails/toclient'       => __DIR__ . '/templates/emails/toclient.html.php',
    'form'                  => __DIR__ . '/templates/form.php',
    'confirmation'          => __DIR__ . '/templates/confirmation.php',
  ],
  'controllers' => [
    'confirmation' => require __DIR__ . '/controllers/confirmation.php',
  ],
]);