<!-- Hier wird unser Javascript eingebunden -->
<?php if(option('vite') == true): ?>

    <!-- Wenn du Vite nutzt, wird das JS über Vites verwaltung eingebunden -->
    <?php 
    if (vite()->js('js/templates/' . $page->template() . '.js', try: true)) {
        echo vite()->js('js/templates/' . $page->template() . '.js');
    } else {
        echo vite()->js('js/templates/default.js');
    }
    ?>

<?php else: ?>
    <!-- zum üben nutzen wir hier eine einfache JS Datei -->
    <?=  js('./src/js/default.js') ?>

<?php endif; ?>
