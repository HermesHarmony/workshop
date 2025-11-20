<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">

<title><?= $site->title()->html() ?> | <?= $page->title()->html() ?></title>

<!-- favcion -->
<link rel="shortcut icon" type="image/x-icon" href="<?= asset('assets/icons/favicon.png')->url() ?>">

<?php if(option('vite') == true): ?>
    <!-- Wenn wir mit Vite arbeiten, dann diese Zeile statt der oberen (Guide) -->
    <?= vite()->css('css/main.css') ?>

<?php else: ?>
    <!-- Hier wird die CSS Datei verlinkt, in der unsere Styles liegen -->
    <?= css('./src/css/main.css')  ?>
    
<?php endif; ?>