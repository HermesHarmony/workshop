<footer id="footer" class="footer">
    <div class="footer__head">
        <span class="footer__logo">Seekamp</span>
        <span class="footer__slogan">Wir inszenieren Welten die verkaufen</span>
    </div>
    <div class="footer__container">

        <div class="footer__column">
            <h3 class="footer__label">Info</h3>
            <div class="footer__content"><?= $site->address()->kirbytextinline() ?></div>
        </div>

        <div class="footer__column">
            <h3 class="footer__label">Kontakt</h3>
            <div class="footer__content">

                <span class="footer__row"><?= $site->email() ?></span>
                <span class="footer__row"><?= $site->tel() ?></span>

            </div>
        </div>

        <div class="footer__column">
            <h3 class="footer__label">Seiten</h3>

            <?php foreach($site->footerNav()->toPages() as $item): ?>
                <a href="<?= $item->url() ?>" class="footer__row"><?= $item->title() ?></a>
            <?php endforeach ?>
        </div>

    </div>
</footer>