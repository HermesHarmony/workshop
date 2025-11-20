<a href="<?= $bike->url() ?>" class="card">
    <div class="card-image">
        <?php if($image = $bike->cover()->toFile()): ?>
            <img src="<?= $image->crop(700,500)->url() ?>" alt="<?= $bike->title()->html() ?>">
        <?php endif ?>
    </div>
    <div class="card-content">
        <h2 class="card-title"><?= $bike->title()->html() ?></h2>
        <p class="card-description"><?= $bike->description()->excerpt(100) ?></p>
    </div>
</a>