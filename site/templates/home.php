<?php snippet('header') ?>

<!-- in unserer $page Variable befinden sich alle Inhalte, die in der txt-Datei der Seite hinterlegt sind. Wir müssen sie nur noch über die entsprechende Methode abrufen -->
<h1 class="title"><?= $page->title() ?></h1>
<div class="page-description">
    <?= $page->intro()->kt() ?>
</div>


<?php snippet('footer') ?>