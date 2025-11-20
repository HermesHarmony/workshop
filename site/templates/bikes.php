<!-- Dies Template ist ein Beispiel für eine Überseite. Sie stellt alle ihre Unterseiten dar und verlinkt zu ihnen. Bitte beachte auch die Logik im zugehörigen Controller -->

<?php snippet('header') ?>

<!-- in unserer $page Variable befinden sich alle Inhalte, die in der txt-Datei der Seite hinterlegt sind. Wir müssen sie nur noch über die entsprechende Methode abrufen -->
<h1 class="page-title"><?= $page->title() ?></h1>
<div class="page-intro">
    <?= $page->description()->kt() ?>
</div>

<div class="bike-cards">
    <!-- Im Controller haben wir die Variable $bikes definiert, die alle Unterseiten dieser Seite enthält. Hier rufen wir sie nun ab und geben für jedes Bike eine entsprechende Karte aus -->
    <?php foreach($bikes as $bike): ?>
        <?php snippet('bike-card', ['bike' => $bike]) ?>
    <?php endforeach; ?>
</div>

<?php snippet('footer') ?>