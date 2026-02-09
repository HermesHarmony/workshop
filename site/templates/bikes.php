<!-- Dies Template ist ein Beispiel für eine Überseite. Sie stellt alle ihre Unterseiten dar und verlinkt zu ihnen. -->

<!-- Hier binden wir den Anfangs-Teil unserer Seite ein, der z.B. das Menü enthält -->
<?php snippet('layout/header') ?>

<!-- in unserer $page Variable befinden sich alle Inhalte, die in der txt-Datei der Seite hinterlegt sind. Wir müssen sie nur noch über die entsprechende Methode abrufen -->
<h1 class="page-title"><?= $page->title() ?></h1>
<div class="page-intro">
    <?= $page->description() ?>
</div>

<div class="bike-cards">
    <!-- Wir loopen durch alle Unterseiten und geben für jedes Bike eine entsprechende Karte aus -->
    <?php foreach($page->children()->listed() as $bike): ?>
        <a href="<?= $bike->url() ?>" class="card">
            <div class="card-image">
                <?php if($image = $bike->cover()->toFile()): ?>
                    <img src="<?= $image->crop(700,500)->url() ?>" alt="<?= $bike->title()->html() ?>">
                <?php endif ?>
            </div>
            <div class="card-content">
                <h2 class="card-title"><?= $bike->title()->html() ?></h2>
                <p class="card-description"><?= $bike->description()->excerpt(100) ?></p>
            </div>
        </a>
    <?php endforeach; ?>
</div>

<!-- Hier binden wir den End-Teil unserer Seite ein, der z.B. das Footer enthält -->
<?php snippet('layout/footer') ?>