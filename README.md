### O Aplikaci:
vytvořím aplikaci, která mi pomůže

- Najít firmy, kterým dlouhodobě rostou zisky nad průměr sektoru.
- Najít firmy s nízkou volatilitou kvůli opční strategii.
- Mít finanční ukazatele, grafy a další relevantní informace na jednom místě.
- časování opcí před vypisováním výsledků

Základem je cyklus (momentálně manuální, do budoucna zautomatizovaný), který pravidelně stahuje data z externích API, ověří je, přefiltruje a uloží do databáze v požadovaném formátu. Frontend aplikace poté bude umožňovat:
Vyhledávání a porovnávání firem 
Pokročilé filtrování na základě číselných ukazatelů
Zobrazení grafů a výkonnosti
Tvorbu vlastního testovacího portfolia s možností sledovat výkonnost v čase Analýzu korelací mezi sektory
Vše, co chci, budu mít na jednom místě
Po registraci si bude moci každý uživatel vytvořit vlastní portfolio, sledovat své investice a analyzovat výkonnost podle času a ceny akcií.

### Současné možnosti:
Yahoo Finance nějaká data poskytuje, ale kvartální výsledky jsou dostupné pouze za 1 rok. Špatně se porovnávají dvě firmy mezi sebou.
SeekingAlpha má lepší srovnání, ale stojí 300 usd/rok v prémiové sekci. Ani jedna z firem nedovoluje simulovat vlastní portfolio. Finviz umožňuje filtrovat a porovnávat firmy i vytvářet vlastní portfolio, nicméně filtr je zbytečně složitý a neobsahuje pro mne důležité finanční výkazy. Ani jedna služba nedokáže zobrazit korelace. Potřebuji tedy vzít z každého to nejlepší a udělat na jedno místo a proto si vytvářím vlastní nástroj.

### Řešení:
#### Financial Modeling Prep API
Poskytuje v bezplatném tieru 250 requestů / den na jeden endpoint. Jelikož data, která potřebuji, se nacházejí na dvou endpointech, limit je rychle vyčerpán. Kvůli tomu nemohu data fetchovat reálně za chodu pro větší dataset, např. pro celý S&P 500. Data se mění jen cca 1x za kvartál, a tedy bude nejjednodušší zautomatizovat cyklus pro fetch dat a uložit si data do databáze nad, kterými postavím FE.

#### Yahoo Finance API
Dovoluje neomezený fetch, ale v rámci free tieru dovoluje fetchnout pouze historické ceny, i tak se mi hodí na tvorbu grafu a pro případné sledování volatility.

#### Apify
Za 5 USD/měsíčně nabízí sadu scraperů na burzovní data, momentálně ale nenaplňuje moje potřeby. Do budoucna zvažují využití pro doplnění nebo validaci dat, případně plné nahrazení za FMP.

#### Tech Stack:
Next.js, MongoDB, Typescript, Tailwind, node cron
