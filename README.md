# Dit is een school project!

# BT-minorWeb


Wat heb ik vandaag gedaan?
Hoeveel tijd heeft me dat gekost?
Wat heb ik geleerd?
Wat ga ik morgen doen?

# Week 1
## Checkout dag 1
Vandaag ben ik bezig geweest met de opzet van het bestand en vervolgens een start gemaakt met de HTML. Ik ben van plan stap voor stap op te bouwen, dus eerst html - css - js om zo ook progressive enhancement toe te kunnen passen. Ik duik dan ook gelijk diep in html en welke attributen er allemaal zijn voor forms. Ik heb dan ook een aantal geleerd: fieldsets, legend, inputmode, title en pattern. Morgen ga ik dan ook verder met de html. 

## Checkout dag 2 + voortgang
Vandaag ben ik voor het grootste gedeelte bezig geweest met het maken van progressive disclosure met html en css. Vervolgens heb ik het formulier wat uitgebreid in de HTML en basic styling toegepast in stijl van NS. Ik heb geleerd over: simpele regex patterns toepassen, hoe progressive disclosure toepassen en welke selectoren je daarbij kan gebruiken; :has() en +. 
```css 
.optionalChoice + div {
  display: none;
}
.optionalChoice:has([value="ja"]:checked) + div {
  display: block;
}
```
Volgende les ga ik de workshop validatie volgen en kijken of ik dat gelijk kan toepassen, daarnaast in het algemeen verder met de HTML en CSS.
Todo's:
- Akte uploaden input
- Ns font pakken van network
- Let op kleur: witte achtergrond form, ns geel op pagina, tekst wel variaties blauw. (verdere styling)
- Let op dat volgende pagina andere inputs moet hebben voor variatie
- Focus styling (later)

https://github.com/user-attachments/assets/1134d2f0-fbbb-460e-881d-6d39f27830e2

# Voortgang week 1 gesprek
- Commit often push once (best practice)
- Kijk naar andere manier van progressive disclosure doen, zonder divs, of duidelijkere namen voor overdraagbaarheid - fieldset namen geven, div naam geven?
- Ik gebruik nee, ga verder met 1c maar zet 1c zelf niet in de tekst

# Week 2
## Checkout dag 1
Bezig geweest met styling en form validation ontdekken, wat is er mogelijk, hoe werkt de default constraints?

```css
const bsn = document.getElementById("bsnNumber");

bsn.addEventListener("input", (event) => {
  if (bsn.validity.valueMissing) {
    bsn.setCustomValidity("Dit veld is verplicht!");
  } else if (bsn.validity.patternMismatch) {
    bsn.setCustomValidity("Dit veld moet 8 of 9 cijfers bevatten.");
  } else {
    bsn.setCustomValidity("");
  }
});
```
<img width="477" height="138" alt="Screenshot 2026-03-02 at 12 57 36" src="https://github.com/user-attachments/assets/ae802225-fc1d-4594-9a43-3eb57e74d488" />
<img width="211" height="62" alt="Screenshot 2026-03-02 at 12 57 56" src="https://github.com/user-attachments/assets/5cabacbd-d1da-40c2-8ebe-f8589ebcd7a8" />
<img width="213" height="61" alt="Screenshot 2026-03-02 at 12 58 02" src="https://github.com/user-attachments/assets/83d3c090-ca81-48de-b221-33522e781260" />

Zodra required er ook op staat zal de eerste submit de html default error message weergeven ipv de custom. Bij tweede submit werkt het wel. Pattern mismatch werkt wel gelijk zodra er wat is ingevuld. Als de error er eenmaal is springt hij bij elke keystroke opnieuw op. 



Hiermee geëxperimenteerd, blur of niet? Blijkt redelijk goed te werken maar niet mijn gewenste manier voor form validation, dus ga ik met een andere manier aan de slag.

Ook over user:valid en invalid geleerd.

