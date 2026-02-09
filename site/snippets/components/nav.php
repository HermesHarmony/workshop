<!-- Unsere Navigation ist ein Snippet, da wir sie auf allen Seiten unserer Seite einbinden wollen. So müssen wir sie nur einmal anlegen und können sie dann überall nutzen. -->
<nav class="wrapper navigation">

    <a class="navigation-item <?= $page->isHomePage() ? ' active' : '' ?>" href="<?= $site->url() ?>">
        <h1><?= $site->title() ?></h1>
    </a>

    <?php foreach($site->children()->listed() as $item): ?>
        <a href="<?= $item->url() ?>" class="navigation-item <?= $item->isOpen() ? ' active' : '' ?>">
            <?= $item->title() ?>
        </a>
    <?php endforeach; ?>

</nav>