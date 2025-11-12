<?php if($formbuilder = $form->formbuilder()->toLayouts()): ?>

<form class="form-body mb-16 " method="post" action="<?= page('page://fGpg1lp3eIqCX6ad')->url() ?>">

    <header class="form-header mb-8">
        <h1 class="h2 form-title"><?= $form->headline()->or('Formular')->toLabel() ?></h1>

        <?php if($form->intro()->isNotEmpty()): ?>
        <p class="form-intro mt-4"><?= $form->intro() ?></p>
        <?php endif ?>
    </header>

    <input type="hidden" name="form" value="<?= $form->uuid() ?>">

    <div>
        <?php foreach($formbuilder as $row): ?>
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4" data-rows="<?= $row->columns()->count() ?>">
            <?php foreach($row->columns() as $column): ?>
            
            <div class="col-[span_var(--span)]" style="--span: <?= $column->span(2) ?> ">
                <?= $column->blocks() ?>
            </div>

            <?php endforeach ?>
        </div>
        <?php endforeach ?>
    </div>

    <input type="text" name="website" id="website" class="absolute -left-[999999px]">

    <div class="form-footer">
        <button class="button mx-auto" type="submit" name="submit" value="Submit">
            <span><?= $form->button()->or('Absenden') ?></span>
        </button>
    </div>
</form>

<script type="module">
    import { formchecker } from '/assets/js/components/_formchecker.js';
    const form = document.querySelector('.form-body');
    const formChecker = new formchecker(form); 
</script>

<?php endif ?>