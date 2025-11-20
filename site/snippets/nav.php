<nav class="wrapper navigation">

    <a href="<?= $site->url() ?>">
        <h1><?= $site->title() ?></h1>
    </a>

    <?php foreach($site->children()->listed() as $item): ?>
        <a href="<?= $item->url() ?>" class="<?= $item->isOpen() ? 'text-blue-500 font-bold' : '' ?>">
            <?= $item->title() ?>
        </a>
    <?php endforeach; ?>

</nav>