# Individuell examination: Interval App - for all you timing needs

## Funktionella krav

|Vy|Beskrivning|
|---|---|
|loading|en loading screen där endast logotyp samt slogan finns med. Du kommer vidare till *Set Timer* genom att klicka på logotypen.|
|set timer|Här ställer du in hur många minuter timern skall gå. **OBS! VG krav** Du anger också om timern ska gå i intervaller, d.v.s. starta om efter den nått 0. Valet att även lägga in en 5 minuters pause mellan varje intervall finns. Detta är väldigt användbart i ex. studiesyfte med [pomondoro metoden](https://www.metodbanken.se/post/pomodorometoden) alt. när man [parprogrammerar](https://sv.wikipedia.org/wiki/Parprogrammering). |
|analog timer|Här visas tiden med en analog urtavla där minut samt sekundvisaren rör sig. En knapp för att avbryta nuvarande timer och återgå till *set timer* skall finnas.|
|digital timer|Här visas tiden med en digital klocka som uppdateras varje sekund. En knapp för att avbryta nuvarande timer och återgå till *set timer* skall finnas.|
|alarmvy|Denna vy visas när tiden är ute. En knapp för att gå till *set timer* skall finnas.|
|text timer **VG**|Visa tiden med hjälp av skriven text.|

På samtliga timervyer skall en *meny-ikon* i hörnet visa en meny där användaren ska kunna växla mellan olika timer-vyer. Notera att dessa byten inte skall avbryta eller nollställa timern.

## Tekniska krav
* Att jobba med tid i programmering kan snabbt bli väldigt komplext. Därför är det högst rekomenderat att använda ett bibliotek som underlättar just detta. Ex. [EasyTimer.js av Albert Gonzalez](https://albert-gonzalez.github.io/easytimer.js/).
* Gjord i antingen React med framer motion **eller** html, css och vanilla JS med anime.js.
* Använder sig av någon CSS animering (transitions eller keyframes).
