# Portfolio - Damian Tacconi

Personal portfolio website showcasing professional experience, skills, and background.

## Features

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Multi-language Support**: Spanish and English translations using i18n
- **Animated Background**: Interactive starfield canvas animation
- **Timeline Experience**: Professional work history displayed in a timeline format
- **Skills Showcase**: Visual representation of frontend and backend technologies

## Technologies Used

### Frontend
- HTML5
- CSS3 (modular CSS files)
- Vanilla JavaScript
- Font Awesome icons

### Architecture
- Modular CSS organization
- Component-based structure
- Translation system with JSON files
- LocalStorage for language preference

## Project Structure

```
Portfolio/
├── assets/
│   ├── docs/cv/          # CV files (Spanish & English)
│   ├── i18n/             # Translation files
│   │   ├── en.json
│   │   └── es.json
│   └── images/           # Images and photos
├── css/
│   ├── about.css
│   ├── base.css
│   ├── experience.css
│   ├── nav.css
│   ├── presentation.css
│   ├── skills.css
│   ├── stars.css
│   └── style.css
├── js/
│   ├── stars.js          # Canvas animation
│   └── translations.js   # i18n handler
└── index.html
```

## Sections

1. **Navigation**: Sticky header with language selector and menu
2. **Presentation**: Introduction with download CV option
3. **Experience**: Work history timeline with detailed descriptions
4. **Skills**: Technical skills categorized by frontend/backend
5. **About**: Personal background and professional summary

## i18n System

The translation system uses:
- JSON files for each language (`en.json`, `es.json`)
- Data attributes (`data-lang`) on HTML elements
- JavaScript loader that fetches and applies translations
- LocalStorage to persist language preference

### Adding Translations

1. Add translation keys to both `en.json` and `es.json`
2. Add `data-lang="key.name"` attribute to HTML elements
3. The system automatically updates content on language switch

## Running Locally

Simply open `index.html` in a web browser. No build process or server required.

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contact

- **LinkedIn**: [damian-tacconi](https://www.linkedin.com/in/damian-tacconi/)
- **Email**: damian.tacconi.95@gmail.com

---

© 2025 Damian Tacconi
