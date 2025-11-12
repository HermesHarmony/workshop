<section class="contact">

    <div class="contact__container">

        <div class="contact__text">
            <?php if(isset($claim)): ?>
            <span class="contact__claim"><?= $claim ?></span>
            <?php endif ?>    
            Lassen sie uns gemeinsam neue, spannende Welten für sie und ihr Unternehmen inszenieren. 
            <a class="contact__button" href="mailto:<?= $site->email() ?>">Melden Sie sich <span>→</span></a>
        </div>

    </div>
    
</section>