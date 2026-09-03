(function () {
    "use strict";

    const storageKey = "portfolio-language";
    const buttons = document.querySelectorAll("[data-language-button]");
    const labelledElements = document.querySelectorAll("[data-label-en]");
    const titles = {
        en: "Shin Yamaguchi — Portfolio",
        ja: "山口 真 — ポートフォリオ"
    };

    function setLanguage(language, persist) {
        const nextLanguage = language === "ja" ? "ja" : "en";

        document.documentElement.dataset.language = nextLanguage;
        document.documentElement.lang = nextLanguage;
        document.title = titles[nextLanguage];

        buttons.forEach(function (button) {
            button.setAttribute("aria-pressed", String(button.dataset.languageButton === nextLanguage));
        });

        labelledElements.forEach(function (element) {
            element.setAttribute("aria-label", element.dataset[nextLanguage === "ja" ? "labelJa" : "labelEn"]);
        });

        if (persist) {
            try {
                localStorage.setItem(storageKey, nextLanguage);
            } catch (error) {
                // Language switching still works when storage is unavailable.
            }
        }
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            setLanguage(button.dataset.languageButton, true);
        });
    });

    setLanguage(document.documentElement.dataset.language, false);
}());
