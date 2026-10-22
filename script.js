const translations = {
  it: {
    study:
      "Sono uno studente magistrale in <i>Intelligenza Artificiale</i> presso l'Università Tecnica di Darmstadt.",
    bachelor:
      "Ho conseguito la laurea triennale in <i>Linguistica Computazionale</i> presso l'Università di Tubinga.",
    interests:
      "Mi interessa la ricerca in I.A. in generale, in particolare il representation learning, l'interpretabilità e gli approcci multimodali. Ho una passione per la linguistica, la filosofia e la cucina.",
    languages:
      "Parlami pure in italiano, inglese, francese, russo, tedesco, siciliano o arbëresh.",
    viewCv: "Visualizza CV",
  },
  de: {
    study:
      "Ich bin Masterstudent im Studiengang <i>Künstliche Intelligenz und Maschinelles Lernen</i> an der Technischen Universität Darmstadt.",
    bachelor:
      "Meinen Bachelor habe ich in <i>Computerlinguistik</i> an der Universität Tübingen gemacht.",
    interests:
      "Ich interessiere mich allgemein für KI-Forschung, insbesondere für Representation Learning, Interpretierbarkeit und multimodale Ansätze. Meine Leidenschaften sind Linguistik, Philosophie, Kochen und das Bauen virtueller Blockstrukturen.",
    languages:
      "Ich kann Deutsch!",
    viewCv: "Lebenslauf ansehen",
  },
  fr: {
    study:
      "Je suis étudiant en master <i>Intelligence Artificielle et Apprentissage Automatique</i> à l'Université technique de Darmstadt.",
    bachelor:
      "J'ai fait ma licence en <i>linguistique informatique</i> à l'Université de Tübingen.",
    interests:
      "Je m'intéresse de manière générale à la recherche en I.A., en particulier à l'apprentissage de représentations, à l'interprétabilité et aux approches multimodales. Je suis passionné de linguistique, de philosophie et de cuisine.",
    languages:
      "Je parle français!",
    viewCv: "Voir le CV",
  },
  ru: {
    study:
      "Я студент магистратуры по программе <i>Искусственный Интеллект и Машинное Обучение</i> в Техническом университете Дармштадта.",
    bachelor:
      "Степень бакалавра по <i>Компьютерной Лингвистике</i> я получил в Тюбингенском университете.",
    interests:
      "Меня интересуют исследования в области ИИ, особенно обучение представлений, интерпретируемость и мультимодальные подходы. Увлекаюсь лингвистикой, философией и кулинарией.",
    languages:
      "Я говорю по-русски!",
    viewCv: "Открыть CV",
  },
};

// English is the source text in index.html
translations.en = {};
document.querySelectorAll("[data-i18n]").forEach((el) => {
  translations.en[el.dataset.i18n] = el.innerHTML.trim();
});

function setLanguage(lang) {
  if (!translations[lang]) lang = "en";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = translations[lang][el.dataset.i18n];
  });
  document.querySelectorAll("#lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  try {
    localStorage.setItem("lang", lang);
  } catch (e) { }
}

document.querySelectorAll("#lang-switch button").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

let saved = null;
try {
  saved = localStorage.getItem("lang");
} catch (e) { }
setLanguage(saved || navigator.language.slice(0, 2));
