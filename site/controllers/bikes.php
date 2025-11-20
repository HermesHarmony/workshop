<?php 

return function ($kirby, $page) {
    // Lade alle gelisteten Unterseiten der aktuellen Seite (Bikes)
    $bikes = $page->children()->listed();

    return [
        'bikes' => $bikes
        // Controller können genutzt werden, um komplexere Logik für eine Seite zu beinhalten, die man nicht direkt im Template unterbringen möchte.
        // Cecke die Kirby Dokumentation für mehr Infos über Controller: https://getkirby.com/docs/guide/templates/controllers
    ];
};