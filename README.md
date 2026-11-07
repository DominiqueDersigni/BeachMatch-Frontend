# BeachMatch – Frontend - Installatiehandleiding

## Inhoudsopgave
1. [Inleiding](#1-inleiding)
2. [Benodigdheden](#2-benodigdheden)
3. [Projectstructuur en technieken](#3-projectstructuur-en-technieken)
4. [Applicatie draaien](#4-applicatie-draaien)
5. [Overige commando's](#5-overige-commandos)
6. [Testgebruikers en rollen](#6-testgebruikers-en-rollen)

## 1. Inleiding
## 1. Inleiding
Dit is de frontend van BeachMatch, een webapplicatie voor het vinden van het beste strand op basis van de meest actuele weer- en verkeersinformatie. Gebruikers kunnen zoeken naar stranden in heel Nederland. Door middel van het aanduiden van favoriete stranden, kan de gebruiker een persoonlijke aanbeveling zien. De aanbeveling laat zien welk strand op dat moment het prettigst is om te bezoeken. Tevens kunnen er reviews van andere strandgangers gelezen worden en kan de gebruiker zelf ook reviews plaatsen.

De frontend is gebouwd met React en Vite. Alle gegevens worden opgehaald bij de BeachMatch-backend via een REST API. Inloggen en registreren verlopen via Keycloak. De live weer- en verkeersinformatie wordt rechtstreeks opgehaald bij Open-Meteo en TomTom.

De belangrijkste functionaliteiten:
- Inloggen, uitloggen en een account aanmaken
- Stranden bekijken en zoeken op naam of provincie
- De detailpagina van een strand bekijken, met kenmerken, reviews en een downloadbare foto
- Reviews lezen en zelf een review plaatsen
- Favoriete stranden opslaan en verwijderen
- Today's Match: het beste strand van vandaag uit je favorieten, op basis van temperatuur, wind en verkeersdrukte
- Het eigen profiel bekijken en aanpassen
- Beheerpaneel (alleen voor beheerders): stranden toevoegen en verwijderen, en een strandfoto uploaden

GitHub-repository: [BeachMatch-Frontend](https://github.com/DominiqueDersigni/BeachMatch-Frontend)
De bijbehorende backend: [BeachMatch-Backend](https://github.com/DominiqueDersigni/BeachMatch-Backend)

## 2. Benodigdheden

Om de frontend lokaal te kunnen draaien, heb je het volgende nodig:

- **Node.js en npm** – getest met Node.js versie 22. npm wordt automatisch meegeïnstalleerd met Node.js. Te downloaden via [nodejs.org](https://nodejs.org).
- **De BeachMatch-backend** – de frontend haalt alle gegevens (stranden, reviews, favorieten en profielen) op via de backend. Deze moet draaien op `http://localhost:8080`. Zie de README van de [backend-repository](https://github.com/DominiqueDersigni/BeachMatch-Backend) voor de installatie.
- **Keycloak** – voor het inloggen en registreren. Keycloak moet draaien op `http://localhost:9090`, met de realm `BeachMatch`. Ook dit staat beschreven in de README van de backend.
- **Een TomTom API-key** – nodig om de verkeersdrukte bij de stranden op te halen. Een gratis key kun je aanmaken op [developer.tomtom.com](https://developer.tomtom.com).
- **Een internetverbinding** – voor het ophalen van live weerdata (Open-Meteo) en verkeersdata (TomTom).
- **Een moderne webbrowser**, zoals Chrome, Safari of Firefox.


## 3. Projectstructuur en technieken 
```
beachmatch/
├── public/
├── src/
│   ├── assets/                 → logo, iconen en afbeeldingen (SVG)
│   ├── components/             → herbruikbare componenten
│   │   ├── BeachCard/          → kaart met naam, provincie, kenmerken, rating en favorietenhartje
│   │   ├── Button/             → knop met twee varianten (primary en secondary, voor verschillende styling)
│   │   ├── InfoCard/           → kaart met icoon, titel en tekst (weer, verkeer, kenmerken)
│   │   ├── ReviewCard/         → kaart met één review
│   │   └── SearchBar/          → zoekveld op de stranden-pagina
│   ├── context/
│   │   └── AuthContext.jsx     → inloggen, uitloggen en de ingelogde gebruiker
│   ├── helpers/
│   │   ├── fetchTraffic.js     → verkeersdrukte ophalen bij TomTom
│   │   ├── fetchWeather.js     → temperatuur en wind ophalen bij Open-Meteo
│   │   └── formatDate.js       → datum leesbaar maken
│   ├── hooks/
│   │   ├── useBeach/           → één strand ophalen
│   │   ├── useBeaches/         → alle stranden ophalen
│   │   ├── useFavorites/       → favorieten van de gebruiker ophalen
│   │   ├── useTodaysMatch/     → beste strand berekenen op basis van weer en verkeer
│   │   └── useUser/            → profielgegevens ophalen
│   ├── pages/
│   │   ├── AdminPage/          → beheerpaneel: stranden toevoegen, verwijderen en foto uploaden
│   │   ├── BeachDetailPage/    → detailpagina van een strand, met reviews
│   │   ├── BeachesPage/        → overzicht van alle stranden met zoekfunctie
│   │   ├── ErrorPage/          → pagina bij een onbekende URL
│   │   ├── HomePage/           → startpagina
│   │   ├── LogInPage/          → inloggen
│   │   ├── ProfilePage/        → profiel, favorieten en profiel wijzigen
│   │   └── TodaysMatchPage/    → het beste strand van vandaag
│   ├── App.jsx                 → routes
│   ├── Navigation.jsx          → navigatiebalk
│   ├── Footer.jsx              → footer
│   ├── index.css               → kleuren, lettertype en typografie
│   └── main.jsx                → startpunt van de app
├── .env.example                → voorbeeld van de benodigde omgevingsvariabele
├── package.json
└── README.md
```
### Gebruikte technieken

- **React 19** – JavaScript-library voor het bouwen van de gebruikersinterface met componenten.
- **Vite** – ontwikkelserver en build-tool, zorgt voor snel opstarten en direct zien van wijzigingen.
- **React Router** – voor het navigeren tussen pagina's zonder de pagina te herladen.
- **React Context API** – voor het beheren van de inlogstatus en de ingelogde gebruiker in de hele applicatie.
- **axios** – voor het versturen van verzoeken naar de backend en externe API's.
- **jwt-decode** – voor het uitlezen van het JWT-token, zoals de naam en rol van de ingelogde gebruiker.
- **Keycloak** – voor authenticatie en autorisatie (inloggen, registreren en rollen).
- **Open-Meteo API** – voor live weerdata (temperatuur en windsnelheid).
- **TomTom Traffic API** – voor live verkeersdata rondom de stranden.
- **CSS met Flexbox en Grid** – zelfgeschreven CSS per component, zonder CSS-framework.
- **ESLint** – voor het controleren van de code op fouten en consistentie.

 
## 4. Applicatie draaien

Volg deze stappen om de frontend lokaal op te starten.

### Stap 1 – Start de backend en Keycloak
Zorg ervoor dat Keycloak (`http://localhost:9090`) en de backend (`http://localhost:8080`) draaien. Hoe je deze opstart, staat in de README van de [backend-repository](https://github.com/DominiqueDersigni/BeachMatch-Backend).

### Stap 2 – Open het project
Pak het ZIP-bestand uit en open de map `beachmatch` in je code-editor (bijvoorbeeld WebStorm of VS Code).

Werk je liever via GitHub? Dan kun je het project ook clonen:
```
git clone https://github.com/DominiqueDersigni/BeachMatch-Frontend.git
```

### Stap 3 – Installeer de dependencies
Open de terminal in je code-editor (in WebStorm: tabblad **Terminal** onderaan) en voer uit:
```
npm install
```
Dit installeert alle packages die in `package.json` staan, zoals React, React Router, axios en jwt-decode.

### Stap 4 – TomTom API-key aanmaken en instellen
De verkeersinformatie op de pagina *Today's Match* wordt opgehaald via de TomTom Traffic API. Hiervoor is een (gratis) API-key nodig.

**4a. Maak een TomTom-account aan**
1. Ga naar [developer.tomtom.com](https://developer.tomtom.com).
2. Klik rechtsboven op **Register** en maak een gratis account aan.
3. Bevestig je e-mailadres via de mail die je ontvangt.

**4b. Kopieer je API-key**
1. Log in op [developer.tomtom.com](https://developer.tomtom.com) en ga naar je **Dashboard**.
2. Onder **Keys** staat automatisch een key klaar (meestal *"My first API key"*).
3. Controleer of bij deze key de **Traffic API** aan staat.
4. Kopieer de key.

**4c. Zet de key in een `.env`-bestand**
1. In de **hoofdmap** van het project (de map waar ook `package.json` staat) vind je het bestand `.env.example`.
2. Klik er met de rechtermuisknop op, kies **Copy** en daarna **Paste** in dezelfde map. Noem de kopie `.env`.
3. Open `.env` en vervang de voorbeeldtekst door jouw key:
   ```
   VITE_TOMTOM_API_KEY=plak-hier-je-tomtom-api-key
   ```
4. Sla het bestand op.
> **Belangrijk:** de key moet in het bestand `.env` staan, niet in `.env.example`. De applicatie leest alleen `.env`.

Het `.env`-bestand staat in `.gitignore` en wordt daardoor niet naar GitHub gestuurd. Zo blijft de API-key privé.

### Stap 5 – Start de applicatie
Voer in de terminal uit:
```
npm run dev
```
In WebStorm kan dit ook door `package.json` te openen en op het groene pijltje naast `"dev"` te klikken.

Open daarna in je browser: `http://localhost:5173`

Vite leest het `.env`-bestand alleen bij het opstarten. Heb je `.env` aangepast terwijl de applicatie al draaide? Stop dan de server (`Ctrl + C`) en start hem opnieuw met `npm run dev`.

> **Let op:** de frontend moet draaien op poort **5173**. Keycloak accepteert alleen inlogverzoeken vanaf dit adres. Draait er al een ander project op poort 5173? Stop dat project dan eerst.

### Stap 6 – Inloggen
Log in met een van de testgebruikers uit hoofdstuk 6. Met het account `admin` heb je ook toegang tot het beheerpaneel.


## 5. Overige commando's

Naast `npm run dev` zijn er nog een aantal handige commando's. Deze voer je uit in de terminal, in de hoofdmap van het project.

| Commando | Omschrijving |
|---|---|
| `npm run build` | Maakt een geoptimaliseerde productieversie van de applicatie in de map `dist`. |
| `npm run preview` | Start de gebouwde productieversie lokaal, om te controleren of deze goed werkt. Voer eerst `npm run build` uit. |
| `npm run lint` | Controleert de code met ESLint op fouten en inconsistenties. |

In WebStorm kun je deze commando's ook uitvoeren door `package.json` te openen en op het groene pijltje naast het betreffende script te klikken.

## 6. Testgebruikers en rollen

De applicatie kent twee rollen. De gebruikers en rollen worden beheerd in Keycloak (realm `BeachMatch`) en worden automatisch geïmporteerd via het bestand `keycloak-realm-export.json` in de backend.

| Rol | Wat kan deze rol? |
|---|---|
| `ROLE_USER` | Stranden bekijken en zoeken, favorieten opslaan, reviews schrijven, Today's Match bekijken en het eigen profiel aanpassen. |
| `ROLE_ADMIN` | Alles wat een gebruiker kan, plus stranden toevoegen, verwijderen en een foto uploaden via het beheerpaneel. |

### Testgebruikers

| Gebruikersnaam | Wachtwoord | Rol |
|----------------|------------|---|
| `admin`        | `beach123` | `ROLE_ADMIN` |
| `daniel`       | `daan123`  | `ROLE_USER` |
| `juliette`     | `juul123`  | `ROLE_USER` |
| `valerie`      | `val123`   | `ROLE_USER` |
| `gittha`       | `git123`   | `ROLE_USER` |

Een nieuw account aanmaken kan via de knop **Create account** op de inlogpagina. Nieuwe gebruikers krijgen automatisch de rol `ROLE_USER`.