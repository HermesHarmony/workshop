<!-- Dieses Template stellt unsere Homepage dar -->

<!-- Hier binden wir den Anfangs-Teil unserer Seite ein, der z.B. das Menü enthält -->
<?php snippet('layout/header') ?>

<!-- Der Tiel der Seite ist gerade statisch, wie habe ihn also einfach hier reingeschreiben, ohne Kirby zu nutzen -->
<h1 class="page-title">Startseite</h1>

<div class="page-intro">
    <!-- in unserer $page Variable befinden sich alle Inhalte, die in der txt-Datei der Seite hinterlegt sind. Wir müssen sie nur noch über die entsprechende Methode abrufen -->
    <?= $page->intro() ?>
</div>

<!-- Die ist ein Beispiel für eine Aufzählung, die wir mit einem Loop durchlaufen. In diesem Fall haben wir die Skills in einem Array hinterlegt, aber genauso gut könnten wir sie auch über Kirby anlegen  -->
<div class="page-skills">
   <?php $skills = ['HTML', 'CSS', 'PHP', 'Kirby']; ?>
   <h2>Meine Skills:</h2>
   <ul class="page-skills-list">
       <?php foreach($skills as $skill): ?>
           <li class="page-skill"><?= $skill ?></li>
       <?php endforeach; ?>
   </ul>
</div>

<!-- Hier binden wir den End-Teil unserer Seite ein, der z.B. das Footer enthält -->
<?php snippet('layout/footer') ?>