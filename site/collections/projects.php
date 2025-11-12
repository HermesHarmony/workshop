<?php 

return function ($site) {
    return page('page://projects')->children()->listed()->sortBy('date', 'desc');
};