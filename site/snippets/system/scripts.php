<?php
if (vite()->js('js/templates/' . $page->template() . '.js', try: true)) {
    echo vite()->js('js/templates/' . $page->template() . '.js');
} else {
    echo vite()->js('js/templates/default.js');
}
