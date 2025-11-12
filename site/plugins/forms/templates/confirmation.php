<?php snippet('layouts/default', slots: true) ?>

<main class="confirmation">
    <?php if($success): ?>
    <h1>Danke für Ihre Nachricht!</h1>
    <div class="alert success">
        <p><?= $success ?></p>
    </div>

    <?php else: ?>
        
    <?php if (isset($alert['error'])): ?>
    <div><?= $alert['error'] ?></div>
    <?php endif ?>

    <?php endif ?>

    <?php if($_POST ?? false): ?>
        <?php if($data): ?>
        <?php foreach($data as $key => $item): ?>
        <p><?= $key.': '.$item ?></p>
        <p>-----------</p>
        <br>
        <?php endforeach ?>
        <?php endif ?>
    <?php endif ?>
</main>