<?php if($field ?? false): ?>
<?php
    $name = $field->name();
    $name = preg_replace("/[^0-9a-zA-Z ]/m", "", $name);
    $name = preg_replace("/ /", "-", $name);

    $text = $field->text();
    $type = $field->type();
    $options = $field->options()->split(',');
    $required = $field->required()->toBool();
    $placeholder = $field->placeholder(). strval($required ?? false ? '*' : '');

    if($field->display() == 'checkbox' or $field->display() == 'radio') {
        $styles =  "border-2 border-bv-beige-dark rounded-lg p-4";
    }
?>

<div class="form-field  <?= $classes ?? null ?> [&_+_.form-field]:mt-4 <?= $styles ?? false ?>">

    <?php if($field->title()->isNotEmpty()): ?>
    <label class="block mb-4 font-bold" for="<?= $name ?>">
        <?= $field->title() ?><span class="form-asterisk"><?php e($required ?? false, '*', '') ?></span>
    </label>
    <?php endif ?>

    <div class="relative w-full group/error">

        <?php if($type === 'field_std'): ?>
        <input 
            class="input-field peer" 
            type="text" 
            name="<?= $name ?>" 
            id="<?= $name ?>" 
            placeholder="<?php e($placeholder ?? null, $placeholder ?? null) ?>" 
            <?php e($required ?? null, 'required') ?> >
        <?php endif ?>

        <?php if($type === 'field_email'): ?>
        <input 
            class="input-field peer" 
            type="email" 
            name="<?= $name ?>" 
            id="<?= $name ?>" 
            placeholder="<?php e($placeholder ?? null, $placeholder ?? null) ?>" 
            <?php e($required ?? null, 'required') ?> >
        <?php endif ?>

        <?php if($type === 'field_textarea'): ?>
        <textarea 
            class="input-field peer min-h-[10rem]" 
            type="textarea" 
            name="<?= $name ?>" 
            id="<?= $name ?>" 
            placeholder="<?php e($placeholder ?? null, $placeholder ?? null) ?>" 
            <?php e($required ?? null, 'required') ?> ></textarea>
        <?php endif ?>

        <?php if($type === 'field_select'): ?>

        <?php if($field->display() == 'checkbox'): ?>
        <!-- Checkboxes -->
        <div class="flex flex-col gap-4">
            <?php foreach($options as $option): ?>
            <div class="">
                <input class="hidden peer" type="checkbox" name="<?= $name ?>[]" value="<?= $option ?>" id="<?= $name ?>-<?= $option ?>-check">
                <label for="<?= $name ?>-<?= $option ?>-check" class="group flex gap-2 cursor-pointer"> 
                    <div class="w-8 flex-[0_0_2rem] h-8 p-1 bg-bv-beige group-peer-checked:bg-bv-green rounded-lg">
                        <div class="svg text-bv-green-light hidden group-peer-checked:block"><?= svg('assets/visuals/icons/check.svg') ?></div>
                    </div>
                    <div><?= $option ?></div>
                </label>
            </div>
            <?php endforeach ?>
        </div>

        <?php elseif($field->display() == 'radio'): ?>
        <!-- Radio Buttons -->
        <div class="flex flex-col gap-2">
            <?php foreach($options as $option): ?>
            <div class="">
                <input class="hidden peer" type="radio" name="<?= $name ?>[]" value="<?= $option ?>" id="<?= $name ?>-<?= $option ?>">
                <label for="<?= $name ?>-<?= $option ?>" class="group flex gap-2 cursor-pointer"> 
                    <div class="w-8 flex-[0_0_2rem] h-8 p-2 bg-bv-beige  rounded-full">
                        <div class="hidden w-full h-full rounded-full group-peer-checked:block bg-bv-green"></div>
                    </div>
                    <div><?= $option ?></div>
                </label>
            </div>
            <?php endforeach ?>
        </div>

        <?php else: ?>
        <!-- Simple Select Field -->
        <select 
            class="input-field peer" 
            type="<?= $type ?>" 
            name="<?= $name ?>" 
            id="<?= $name ?>" 
            placeholder="<?php e($placeholder ?? null, $placeholder ?? null) ?>" 
            <?php e($required ?? null, 'required') ?> >
            <?php foreach($options as $option): ?>
            <option value="<?= $option ?>"><?= $option ?></option>
            <?php endforeach ?>
        </select>
        <?php endif ?>
        <?php endif ?>
        
        <?php if($required ?? false): ?>
        <div class="form-error svg icon hidden absolute right-[1.175rem] top-1/2 -translate-y-1/2 border-4 border-[#963a2e] text-[#963a2e] w-8 h-8 rounded-md peer-[:invalid:not(:placeholder-shown)]:block">
            <?= svg('assets/visuals/icons/cross.svg') ?>
        </div>
        <div class="form-error svg icon hidden peer-valid:block absolute right-[1.175rem] top-1/2 -translate-y-1/2 border-4 border-bv-green text-bv-green w-8 h-8 rounded-md">
            <?= svg('assets/visuals/icons/check.svg') ?>
        </div>
        <?php endif ?>
        
        <div class="absolute hidden z-10 left-2 top-full translate-y-1 group-[.error]/error:flex items-center bg-[#f45f4b] drop-shadow-lg text-white text-sm px-2 py-1 pr-4 rounded-b-lg">
            <?= $error_message ?? 'Bitte etwas gültiges eingeben' ?>
        </div>
    </div>

</div>
<?php else: ?>
Keine Felddaten vorhanden
<?php endif ?>    