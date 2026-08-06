const aboutTexts = [
  "Od 2024 roku działam jako freelancer, stale rozwijając swoje umiejętności. Przez ostatnie 2 lata zrealizowałem kilkanaście projektów dla klientów z różnych branż, od startupów po e-commerce.",
  "Wierzę, że świetny kod to nie tylko działająca funkcjonalność, ale także czytelność, wydajność i wyjątkowe doświadczenie użytkownika. Każdy projekt traktuję jak własny produkt, dbając o każdy detal od architektury po mikrointerakcje.",
  "Poza ekranem jestem pasjonatem motoryzacji i majsterkowania przy niej. Uwielbiam spędzać czas w garażu, naprawiając i ulepszając swoje auto. To hobby nauczyło mnie cierpliwości i kreatywnego rozwiązywania problemów, co bezpośrednio przekłada się na jakość mojego kodu. ☕🔧"
];

const statsData = [
  { n: '2+', l: 'lata doświadczenia' },
  { n: '15+', l: 'zrealizowanych projektów' },
  { n: '10+', l: 'zadowolonych klientów' },
  { n: '100%', l: 'zaangażowania' }
];

const timelineData = [
  { d: '2017 / 2018', r: 'Początki nauki programowania', c: 'Samodzielna nauka', desc: 'Intensywny kurs HTML, CSS i JavaScript. Pierwsze projekty, budowanie fundamentów wiedzy i odkrywanie pasji do frontendu. Ukończenie bootcampu online i setki godzin spędzonych na dokumentacji.' },
  { d: '2019 / 2020', r: 'Staż i praktyki', c: 'Lokalna agencja interaktywna', desc: 'Trzymiesięczny staż, podczas którego pracowałem przy realnych projektach komercyjnych. Poznałem pracę w zespole Scrum, Git, code review i nauczyłem się korzystać z Jiry.' },
  { d: '2024 / Obecnie', r: 'Freelancing', c: 'Własna działalność', desc: 'Równolegle ze stażem zacząłem przyjmować pierwsze zlecenia jako freelancer. Od tego czasu nieprzerwanie realizuję projekty dla klientów z Polski i zagranicy. Specjalizuję się w React, Node.js i TypeScript.' },
  { d: '2025', r: 'Junior IT Helpdesk Specialist', c: 'REDATS Sp. z o.o.', desc: 'Odpowiadałem za bieżące wsparcie użytkowników i rozwiązywanie zgłoszeń, co pozwoliło mi dogłębnie zrozumieć ich oczekiwania oraz codzienne problemy. Dbałem o sprawną komunikację i usprawnianie wewnętrznych procesów IT.' },
  { d: '2026', r: 'Junior Developer', c: 'REDATS Sp. z o.o. (awans)', desc: 'Awansowałem na stanowisko Junior Developera. Projektowałem i wdrażałem nowe funkcjonalności, brałem udział w planowaniu architektury, samodzielnie wdrażałem zmiany na środowisko produkcyjne oraz odpowiadałem za uruchamianie i utrzymanie własnych aplikacji.' },
  { d: 'Przyszłość', r: 'Co dalej?', c: 'Twoja firma? ✨', desc: 'Moja droga w IT dopiero nabiera tempa. Chcę rozwijać się w kierunku Full-Stack Developera, eksplorować świat architektury mikroserwisowej i DevOps. Jeśli szukasz osoby, która kocha to co robi i stale chce się uczyć, porozmawiajmy!', future: true }
];

const skillsData = [
  { n: 'React', c: 'purple', l: 'Ekspert' }, { n: 'TypeScript', c: 'blue', l: 'Ekspert' },
  { n: 'JavaScript', c: 'purple', l: 'Ekspert' }, { n: 'CSS/SCSS', c: 'blue', l: 'Ekspert' },
  { n: 'Tailwind CSS', c: 'pink', l: 'Ekspert' }, { n: 'Git', c: 'green', l: 'Ekspert' },
  { n: 'Node.js', c: 'green', l: 'Zaawansowany' }, { n: 'Next.js', c: 'pink', l: 'Zaawansowany' },
  { n: 'PostgreSQL', c: 'blue', l: 'Zaawansowany' }, { n: 'MongoDB', c: 'purple', l: 'Zaawansowany' },
  { n: 'Redux', c: 'green', l: 'Zaawansowany' }, { n: 'Spring', c: 'green', l: 'Zaawansowany' },
  { n: 'Kotlin', c: 'purple', l: 'Śr. zaaw.' }, { n: 'Java', c: 'blue', l: 'Śr. zaaw.' },
  { n: 'Vue.js', c: 'purple', l: 'Śr. zaaw.' }, { n: 'Docker', c: 'green', l: 'Śr. zaaw.' },
  { n: 'Python', c: 'green', l: 'Śr. zaaw.' }, { n: 'Astro', c: 'pink', l: 'Śr. zaaw.' },
  { n: 'Groovy', c: 'blue', l: 'Podstawy' }, { n: 'PHP', c: 'purple', l: 'Podstawy' },
  { n: 'Laravel', c: 'pink', l: 'Podstawy' }, { n: 'CodeIgniter', c: 'green', l: 'Podstawy' },
  { n: 'AWS', c: 'blue', l: 'Podstawy' }, { n: 'CI/CD', c: 'pink', l: 'Podstawy' },
  { n: 'Figma', c: 'pink', l: 'Podstawy' }
];

const projData = [
  { i: '🛒', t: 'ShopFlow • Platforma e-commerce', d: 'Nowoczesna platforma sprzedażowa z integracją Stripe i panelem administracyjnym.', tags: ['Next.js', 'Stripe', 'PostgreSQL'], bg: 'linear-gradient(135deg,#1a1a3e 0%,#2d1b4e 100%)' },
  { i: '📊', t: 'DataViz • Dashboard Analityczny', d: 'Dashboard do wizualizacji danych w czasie rzeczywistym z D3.js i WebSocket.', tags: ['React', 'D3.js', 'WebSocket'], bg: 'linear-gradient(135deg,#0d1b2a 0%,#1b2838 100%)' },
  { i: '🤖', t: 'AI Writer • Asystent Treści', d: 'Aplikacja SaaS wykorzystująca OpenAI do generowania treści marketingowych.', tags: ['Vue.js', 'OpenAI', 'Node.js'], bg: 'linear-gradient(135deg,#1a2a1a 0%,#0d3320 100%)' },
  { i: '🎯', t: 'Strona wizytówkowa', d: 'Ta strona – nowoczesne, wydajne portfolio zbudowane od podstaw z dbałością o dostępność, SEO i optymalizację.', tags: ['JavaScript', 'CSS', 'PWA', 'Canvas'], bg: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)', gh: 'https://github.com/kvdpxne/portfolio' }
];