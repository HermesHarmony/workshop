<!-- Hier wird unser Javascript eingebunden -->
 
<?php if(option('vite') == false): ?>
    <!-- zum üben nutzen wir hier eine einfache JS Datei -->
    <?=  js('/src/js/templates/default.js') ?>

<?php else: ?>
    <!-- Wenn du Vite nutzt, wird das JS über Vites verwaltung eingebunden (Guide: 4.3) -->
    <?php 
    if (vite()->js('js/templates/' . $page->template() . '.js', try: true)) {
        echo vite()->js('js/templates/' . $page->template() . '.js');
    } else {
        echo vite()->js('js/templates/default.js');
    }
    ?>

<?php endif; ?>
