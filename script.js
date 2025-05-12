function switchLanguage(lang) {
    // Update HTML lang and dir attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === `${lang}-btn`) {
            btn.classList.add('active');
        }
    });
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
        if (element.dataset[lang]) {
            // Special handling for Venus to ensure it's displayed as the planet name
            if (element.dataset.en === 'Venus' && lang === 'ar') {
                element.textContent = 'كوكب الزهرة'; // "Planet Venus" in Arabic
            } else {
                element.textContent = element.dataset[lang];
            }
        }
    });
    
    // Special handling for input placeholders
    document.querySelectorAll('[data-placeholder-en], [data-placeholder-ar]').forEach(input => {
        if (input.dataset[`placeholder-${lang}`]) {
            input.placeholder = input.dataset[`placeholder-${lang}`];
        }
    });
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize with saved language or default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLang);
});
