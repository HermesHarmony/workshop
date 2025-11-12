<nav id="nav" class="flex gap-4">

    <?php foreach($site->mainmenu()->toPages() as $item): ?>
        <a href="<?= $item->url() ?>"><?= $item->title() ?></a>
    <?php endforeach ?>

</nav>