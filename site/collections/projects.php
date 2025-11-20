<?php 

return function ($site) {
    return page('page://projects')->children()->listed()->sortBy('date', 'desc');
    // Collections können genutzt werden, um benutzerdefinierte Sammlungen von Seiten zu erstellen, die einfach im Template oder Controller genutzt werden können.
    // Cecke die Kirby Dokumentation für mehr Infos über Collections: https://getkirby.com/docs/guide/templates/collections
};