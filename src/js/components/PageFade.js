//Der Übergangsfade
export function fadeInPage() {
    if (!window.AnimationEvent) { return; }

    var fader = document.getElementById('fader'),
        main = document.querySelector('main');

    fader.classList.add('fade-out');
    main.classList.add('fade-in');

}

export function fadeInHelper() {

    document.addEventListener('DOMContentLoaded', function() {
        if (!window.AnimationEvent) { return; }

        var anchors = document.getElementsByTagName('a'),
            main = document.querySelector('main');

        for (var idx = 0; idx < anchors.length; idx += 1 ) {
            if (anchors[idx].hostname !== window.location.hostname ||
                anchors[idx].pathname === window.location.pathname) {
                continue;
            }

            anchors[idx].addEventListener('click', function(event){
                var fader = document.getElementById('fader'),

                    anchor = event.currentTarget;

                var listener = function() {
                    window.location = anchor.href;
                    fader.removeEventListener('animationend', listener);
                    main.removeEventListener('animationend', listener);

                };

                fader.addEventListener('animationend', listener);
                main.addEventListener('animationend', listener);

                event.preventDefault();

                fader.classList.add('fade-in');
                main.classList.add('fade-out');

            });
        }
    });

    window.addEventListener('pageshow', function (event) {
        if (!event.persisted) {
        return;
        }

        var fader = document.getElementById('fader'),
            main = document.querySelector('main');

        fader.classList.remove('fade-in');
        main.classList.remove('fade-out');

        
    });
}