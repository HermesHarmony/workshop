<?php 

return function ($kirby, $page) {
    return [
        'hello' => 'Hallo Welt, das hier ist eine eigene Methode!',
        // Models können genutzt werden, um eigene Methoden und Eigenschaften für Seiten zu definieren.
        // Cecke die Kirby Dokumentation für mehr Infos über Models: https://getkirby.com/docs/guide/templates/page-models
        // Diese Beispielmethode kann im Template wie folgt genutzt werden: $page->hello()
        // Sie gibt den String "Hallo Welt, das hier ist eine eigene Methode!" zurück.
    ];
};