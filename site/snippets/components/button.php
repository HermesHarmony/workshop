<?php # Logic 

# Icon for the button
$icon = isset($icon)    ? asset('assets/icons/'.$icon.'.svg') : false;

# Custom Class for Button
$class = isset($class)  ? $class : null;

# Type
$type =  isset($type)   ? 'type="'.$type.'"'    : ''; 

# Name
$name =  isset($name)   ? 'name="'.$name.'"'    : '';

# Value
$value = isset($value)  ? 'value="'.$value.'"'  : '';

# New Window?
$target = isset($newWindow) && $newWindow ? ' target="_blank"' : '';

# Opening with button or link tag
$tag_opening = sprintf('<%s%s href="%s" class="btn group %s" %s %s %s >',
    isset($url) ? 'a' : 'button',
    $target,
    $url ?? '#',
    $class,
    $type,
    $name,
    $value
);

# Closing Tag
$tag_closing = isset($url) ? '</a>' : '</button>';
?>

<?= $tag_opening ?>

    <?php if($icon ?? false): ?>
    <span class="button__icon p-4">
        <?= $icon->read() ?>
    </span>
    <?php endif ?>

    <div class="p-1 w-full sm:w-fit min-w-[12rem] text-left"><?= $text ?? 'Text definieren' ?></div>

    <?php if($arrow ?? false): ?>
    <div class="block p-8 button__arrow border-l-[1px] border-gray-300 icon w-24 ">
        <div class="group-hover:translate-x-1 transition-transform duration-300">
            <?= asset('assets/icons/arrow-right.svg')->read() ?>
        </div>
    </div>
    <?php endif ?>

<?= $tag_closing ?>