<!doctype html>
<html lang="DE">

<head>
    <?php snippet('system/head') ?>
</head>

<body class="px-4 md:px-24 xl:px-64 <?= $page->template() . '__body' ?>">

    <?php snippet('system/fonts') ?>
    <?php snippet('essentials/header') ?>
    <?php snippet('system/noscript') ?>

    <main class="<?= $page->intendedTemplate() ?>">
        <?= $slot ?>
    </main>

    <?php snippet('essentials/footer') ?>
    <?php snippet('system/scripts') ?>
    <?php snippet('seo/schemas'); ?>

</body>

</html>