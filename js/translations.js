
document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    // Toggle menu when burger is clicked
    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickInsideBurger = burgerMenu.contains(event.target);

        if (!isClickInsideNav && !isClickInsideBurger && navLinks.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Language selector functionality
    const langSelector = document.querySelector('.lang-selector');
    const langCurrent = document.querySelector('.lang-current span');
    const langOptions = document.querySelectorAll('.lang-dropdown li');

    // Toggle language dropdown on mobile
    if (langSelector) {
        langSelector.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                langSelector.classList.toggle('active');
            }
        });
    }

    // Language switching functionality
    if (langOptions.length) {
        langOptions.forEach(option => {
            option.addEventListener('click', function (e) {
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');

                // Update active class
                langOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                // Update current language display
                langCurrent.textContent = lang.toUpperCase();

                // Store selected language in localStorage
                localStorage.setItem('selectedLanguage', lang);

                // Call function to update page content based on selected language
                updatePageLanguage(lang);

                // Close dropdown on mobile
                if (window.innerWidth <= 768) {
                    langSelector.classList.remove('active');
                }
            });
        });
    }

    // Function to update page content based on language
    async function updatePageLanguage(lang) {
        // Load translations from JSON files
        let translations = {};

        try {
            const response = await fetch(`assets/i18n/${lang}.json`);

            if (!response.ok) {
                throw new Error(`Failed to load translations for ${lang}`);
            }
            translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            return; // Exit if translations can't be loaded
        }

        console.log(translations);

        // Update all elements with data-lang attributes
        const elementsWithDataLang = document.querySelectorAll('[data-lang]');

        elementsWithDataLang.forEach(element => {
            const langKey = element.getAttribute('data-lang');

            // Split the key by dots to navigate nested objects
            const keyParts = langKey.split('.');

            // Navigate through the translations object
            let translationValue = translations;
            for (const part of keyParts) {
                if (translationValue && translationValue[part] !== undefined) {
                    translationValue = translationValue[part];
                } else {
                    console.warn(`Translation key not found: ${langKey}`);
                    return; // Skip this element if key not found
                }
            }

            // Apply the translation
            if (typeof translationValue === 'string') {
                // Use innerHTML for content with HTML tags like <strong>
                element.innerHTML = translationValue;
            }
        });

        // Special case for elements that need href attributes updated
        const downloadCV = document.querySelector('.download-cv');
        if (downloadCV && translations.presentation && translations.presentation.cv_path) {
            downloadCV.setAttribute('href', translations.presentation.cv_path);
        }

        // Special case for elements with icons that need to be preserved
        const sectionTitles = {
            'experience': 'fas fa-briefcase',
            'skills': 'fas fa-tools',
            'about': 'fas fa-user'
        };

        for (const [section, iconClass] of Object.entries(sectionTitles)) {
            const titleElement = document.querySelector(`#${section} .title h2`);
            if (titleElement && translations[section] && translations[section].title) {
                titleElement.innerHTML = `<i class="${iconClass}"></i> ${translations[section].title}`;
            }
        }


        // Special case for presentation title - preserve "Damian }" exactly
        const titleElement = document.querySelector('.title h1');
        if (titleElement && translations.presentation && translations.presentation.title) {
            titleElement.innerHTML = `<span class="orange">{</span> ${translations.presentation.title}<span class="orange">Damian }</span>`;
        }

        // Translate timeline dates
        translateDates(lang);
    }

    // Function to translate timeline dates
    function translateDates(lang) {
        const monthTranslations = {
            es: {
                'Enero': 'Enero',
                'Febrero': 'Febrero',
                'Marzo': 'Marzo',
                'Abril': 'Abril',
                'Mayo': 'Mayo',
                'Junio': 'Junio',
                'Julio': 'Julio',
                'Agosto': 'Agosto',
                'Septiembre': 'Septiembre',
                'Octubre': 'Octubre',
                'Noviembre': 'Noviembre',
                'Diciembre': 'Diciembre'
            },
            en: {
                'Enero': 'January',
                'Febrero': 'February',
                'Marzo': 'March',
                'Abril': 'April',
                'Mayo': 'May',
                'Junio': 'June',
                'Julio': 'July',
                'Agosto': 'August',
                'Septiembre': 'September',
                'Octubre': 'October',
                'Noviembre': 'November',
                'Diciembre': 'December'
            }
        };

        const dateElements = document.querySelectorAll('.timeline-date');
        
        dateElements.forEach(dateElement => {
            const originalText = dateElement.textContent.trim();
            const translatedDate = translateDate(originalText, lang, monthTranslations);
            dateElement.textContent = translatedDate;
        });
    }

    // Function to translate individual date
    function translateDate(dateString, lang, monthTranslations) {
        // Extract month and year from date string (e.g., "Septiembre 2025")
        const parts = dateString.split(' ');
        if (parts.length === 2) {
            const month = parts[0];
            const year = parts[1];
            
            // Find the Spanish month and translate it
            const targetMonths = monthTranslations[lang];
            
            for (const [spanishMonth, translatedMonth] of Object.entries(targetMonths)) {
                if (month === spanishMonth) {
                    return `${translatedMonth} ${year}`;
                }
            }
        }
        
        // If no translation found, return original
        return dateString;
    }


    // Load saved language preference on page load
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es'; // Default to Spanish if no preference
    // Find the option with the saved language
    const savedOption = document.querySelector(`.lang-dropdown li[data-lang="${savedLanguage}"]`);
    if (savedOption) {
        // Update current language display without clicking (to avoid double loading)
        const langCurrent = document.querySelector('.lang-current span');
        if (langCurrent) {
            langCurrent.textContent = savedLanguage.toUpperCase();
        }

        // Update active class
        const langOptions = document.querySelectorAll('.lang-dropdown li');
        langOptions.forEach(opt => opt.classList.remove('active'));
        savedOption.classList.add('active');

        // Load translations directly
        updatePageLanguage(savedLanguage);
    }
});