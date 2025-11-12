<?php if ($block): ?>
<div class="flex gap-2">
    <input class="hidden peer" type="checkbox" name="privacy" value="privacy" id="privacy" required>
    
    <label for="privacy" class="group form-privacy flex gap-2 cursor-pointer"> 
        <div class="flex-[0_0_2rem] h-8 p-1 bg-bv-beige group-peer-checked:bg-bv-green-light rounded-lg">
            <div class="svg hidden group-peer-checked:block "><?= svg('assets/visuals/icons/check.svg') ?></div>
        </div>
        <div class="max-w-lg leading-normal"><?= $block->text()->kt() ?></div>
    </label>

</div>
<?php endif ?>
    