<?php snippet('layout/header') ?>

<!-- in unserer $page Variable befinden sich alle Inhalte, die in der txt-Datei der Seite hinterlegt sind. Wir müssen sie nur noch über die entsprechende Methode abrufen -->
<h1 class="page-title"><?= $page->title() ?></h1>

<!-- wir übereprüfen, ob ein Coverbild hinterlegt ist und geben es aus -->
<?php if($cover = $page->cover()->toFile()): ?>
    <div class="page-cover">
        <!-- damit das Bild nicht zu groß geladen wird, nutzen wir die resize() Methode, um es auf eine Breite von 960px zu skalieren -->
        <img src="<?= $cover->resize(960)->url() ?>" alt="<?= $cover->alt() ?>">
    </div>
<?php endif; ?>

<div class="page-infos">
    <div class="page-price">Preis: <?= $page->price() ?>$</div>
    <div class="page-brand">Marke: <?= $page->brand() ?></div>
</div>

<div class="page-intro">
    <?= $page->description() ?>
</div>


<?php snippet('layout/footer') ?>