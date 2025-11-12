<?php if ($form = $block->select()->toPage()): ?>
<?php snippet('forms/form', ['form' => $form]) ?>
<?php endif ?>
    