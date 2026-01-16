// frontend/.prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
    // Grundlegende Formatierung
    semi: true,              // Semikolons am Ende von Zeilen
    singleQuote: true,       // Einfache Anführungszeichen (' statt ")
    tabWidth: 2,             // Einrückung: 2 Leerzeichen
    useTabs: false,          // Keine Tabulatoren, nur Leerzeichen
    printWidth: 100,         // Zeilenlänge (bricht danach um)
    trailingComma: 'none',   // Keine Kommas am Ende von Listen (sauberer)
  
    // Astro-Spezifisches Plugin laden
    plugins: ['prettier-plugin-astro'],
  
    // Spezielle Regeln für Astro-Dateien
    overrides: [
      {
        files: '*.astro',
        options: {
          parser: 'astro',
        },
      },
    ],
  };