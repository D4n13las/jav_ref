// Kezdeti adatok
const battles = [  // Létrehozunk egy tömböt, amely tartalmazza a harcok adatait
    {
        harc_nev: "Rákóczi szabadságharc",  // Harc neve
        harcolo1: "Kuruc",  // Első harcoló fél
        hadero1: "70.000",  // Első harcoló fél haderő
        harcolo2: "Labanc",  // Második harcoló fél
        hadero2: "60.000"  // Második harcoló fél haderő
    },
    {
        harc_nev: "48-as szabadságharc",  // Harc neve
        harcolo1: "Osztrák császárság (+ Orosz birodalom)",  // Első harcoló fél
        hadero1: "170.000 (+ 200.000)",  // Első harcoló fél haderő
        harcolo2: "Magyar királyság",  // Második harcoló fél
        hadero2: "170.000"  // Második harcoló fél haderő
    },
    {
        harc_nev: "I. világháború",  // Harc neve
        harcolo1: "Antant",  // Első harcoló fél
        hadero1: "43 millió",  // Első harcoló fél haderő
        harcolo2: "Központi hatalmak",  // Második harcoló fél
        hadero2: "25 millió"  // Második harcoló fél haderő
    },
    {
        harc_nev: "Bosworthi csata",  // Harc neve
        harcolo1: "Angolok (York + Lancester)",  // Első harcoló fél
        hadero1: "15.000",  // Első harcoló fél haderő
    }
];

// Funkció a táblázat feltöltésére
function fillTable() {
    const table = document.querySelector("table");  // A táblázat kiválasztása
    const tbody = table.querySelector("tbody");  // A táblázat törzsének (tbody) kiválasztása

    tbody.innerHTML = '';  // A tbody tartalmának törlése, hogy új adatokat adhassunk hozzá

    battles.forEach(battle => {  // Minden egyes harcot végigiterálunk a battles tömbben
        // Harc neve és szembenálló felek, haderő
        const tr1 = document.createElement("tr");  // Új sor létrehozása a táblázathoz

        const td1 = document.createElement("td");  // Új cella a harc nevének
        td1.rowSpan = battle.harcolo2 ? 2 : 1;  // Ha van második harcoló fél, akkor 2 sorra terjed, egyébként 1
        td1.innerText = battle.harc_nev;  // A harc neve beírása a cellába
        
        const td2 = document.createElement("td");  // Cella az első harcoló fél nevéhez
        td2.innerText = battle.harcolo1;  // Az első harcoló fél neve

        const td3 = document.createElement("td");  // Cella az első haderőhöz
        td3.innerText = battle.hadero1;  // Az első haderő száma

        tr1.appendChild(td1);  // A harc nevének celláját hozzáadjuk a sorhoz
        tr1.appendChild(td2);  // Az első harcoló fél celláját hozzáadjuk a sorhoz
        tr1.appendChild(td3);  // Az első haderő celláját hozzáadjuk a sorhoz
        tbody.appendChild(tr1);  // A sort hozzáadjuk a táblázat törzséhez

        // Második sor a második harcoló féllel (csak ha van második fél)
        if (battle.harcolo2 && battle.hadero2) {  // Ha van második harcoló fél és haderő
            const tr2 = document.createElement("tr");  // Új sor létrehozása
            const td4 = document.createElement("td");  // Cella a második harcoló félhez
            td4.innerText = battle.harcolo2;  // A második harcoló fél neve

            const td5 = document.createElement("td");  // Cella a második haderőhöz
            td5.innerText = battle.hadero2;  // A második haderő száma

            tr2.appendChild(td4);  // A második harcoló fél celláját hozzáadjuk a sorhoz
            tr2.appendChild(td5);  // A második haderő celláját hozzáadjuk a sorhoz
            tbody.appendChild(tr2);  // A sort hozzáadjuk a táblázat törzséhez
        }
    });
}

// Funkció az űrlap létrehozásához
function createForm() {
    const form = document.createElement("form");  // Űrlap létrehozása
    form.id = "form";  // Az űrlap azonosítója
    // Az űrlap HTML tartalmának megadása
    form.innerHTML = `  
        <label for="harc_nev">Harc megnevezése:</label><br>
        <input type="text" id="harc_nev" name="harc_nev"><br><br>
        <div id="harc_nev_error" class="error-message"></div>

        <label for="harcolo1">1. Harcoló fél:</label><br>
        <input type="text" id="harcolo1" name="harcolo1"><br><br>
        <div id="harcolo1_error" class="error-message"></div>

        <label for="hadero1">1. Haderő:</label><br>
        <input type="text" id="hadero1" name="hadero1"><br><br>
        <div id="hadero1_error" class="error-message"></div>

        <label for="harcolo2">2. Harcoló fél:</label><br>
        <input type="text" id="harcolo2" name="harcolo2"><br><br>
        <div id="harcolo2_error" class="error-message"></div>

        <label for="hadero2">2. Haderő:</label><br>
        <input type="text" id="hadero2" name="hadero2"><br><br>
        <div id="hadero2_error" class="error-message"></div>

        <button type="submit">Hozzáadás</button>
    `; // Az űrlap tartalmának beállítása HTML-ként

    form.addEventListener("submit", function (e) {  // Az űrlap elküldésének eseménykezelője
        e.preventDefault();  // Az oldal újratöltésének megakadályozása

        let isValid = true;  // Alapértelmezett állapot, hogy az űrlap érvényes

        // Adatok kinyerése
        const harcNev = form.querySelector("#harc_nev").value;  // Harc neve
        const harcolo1 = form.querySelector("#harcolo1").value;  // Első harcoló fél neve
        const hadero1 = form.querySelector("#hadero1").value;  // Első haderő
        const harcolo2 = form.querySelector("#harcolo2").value;  // Második harcoló fél neve
        const hadero2 = form.querySelector("#hadero2").value;  // Második haderő

        // Validáció: ha bármelyik mező üres, akkor hibaüzenetet jelenítünk meg
        if (!harcNev) {  // Ha nincs megadva harc neve
            document.querySelector("#harc_nev_error").innerText = "Harc neve kötelező!";  // Hibaüzenet
            isValid = false;  // Az űrlap nem érvényes
        } else {
            document.querySelector("#harc_nev_error").innerText = "";  // Hibaüzenet törlése
        }

        if (!harcolo1) {  // Ha nincs megadva az első harcoló fél
            document.querySelector("#harcolo1_error").innerText = "Első harcoló fél kötelező!";  // Hibaüzenet
            isValid = false;  // Az űrlap nem érvényes
        } else {
            document.querySelector("#harcolo1_error").innerText = "";  // Hibaüzenet törlése
        }

        if (!hadero1) {  // Ha nincs megadva az első haderő
            document.querySelector("#hadero1_error").innerText = "Első haderő kötelező!";  // Hibaüzenet
            isValid = false;  // Az űrlap nem érvényes
        } else {
            document.querySelector("#hadero1_error").innerText = "";  // Hibaüzenet törlése
        }

        // Ha minden adat érvényes, hozzáadjuk az új harcot
        if (isValid) {
            const newBattle = {  // Az új harc adatainak objektumba mentése
                harc_nev: harcNev,
                harcolo1: harcolo1,
                hadero1: hadero1,
                harcolo2: harcolo2,
                hadero2: hadero2
            };

            battles.push(newBattle);  // Az új harcot hozzáadjuk a battles tömbhöz

            // Az új adatot hozzáadjuk az aktuális táblázathoz
            const table = document.querySelector("table");  // A táblázat kiválasztása
            const tbody = table.querySelector("tbody");  // A tbody kiválasztása

            // Harc neve és szembenálló felek, haderő (új sor hozzáadása)
            const tr1 = document.createElement("tr");  // Új sor létrehozása

            const td1 = document.createElement("td");  // Cella a harc nevének
            td1.rowSpan = newBattle.harcolo2 ? 2 : 1;  // Ha van második harcoló fél, akkor 2 sorra terjed, egyébként 1
            td1.innerText = newBattle.harc_nev;  // Az új harc neve

            const td2 = document.createElement("td");  // Cella az első harcoló fél nevéhez
            td2.innerText = newBattle.harcolo1;  // Az első harcoló fél neve

            const td3 = document.createElement("td");  // Cella az első haderőhöz
            td3.innerText = newBattle.hadero1;  // Az első haderő száma

            tr1.appendChild(td1);  // Az új harc nevének celláját hozzáadjuk a sorhoz
            tr1.appendChild(td2);  // Az első harcoló fél celláját hozzáadjuk a sorhoz
            tr1.appendChild(td3);  // Az első haderő celláját hozzáadjuk a sorhoz
            tbody.appendChild(tr1);  // A sort hozzáadjuk a táblázathoz

            // Második sor a második harcoló féllel (csak ha van második fél)
            if (newBattle.harcolo2 && newBattle.hadero2) {  // Ha van második harcoló fél és haderő
                const tr2 = document.createElement("tr");  // Új sor létrehozása
                const td4 = document.createElement("td");  // Cella a második harcoló félhez
                td4.innerText = newBattle.harcolo2;  // A második harcoló fél neve

                const td5 = document.createElement("td");  // Cella a második haderőhöz
                td5.innerText = newBattle.hadero2;  // A második haderő száma

                tr2.appendChild(td4);  // A második harcoló fél celláját hozzáadjuk a sorhoz
                tr2.appendChild(td5);  // A második haderő celláját hozzáadjuk a sorhoz
                tbody.appendChild(tr2);  // A sort hozzáadjuk a táblázathoz
            }

            // A form mezők törlése
            form.reset();  // Az űrlap mezőinek visszaállítása alapértelmezett értékekre
        }
    });

    document.body.appendChild(form);  // Az űrlapot hozzáadjuk a dokumentum törzséhez
}

// Az oldal generálása
function generatePage() {
    const table = document.createElement("table");  // Új táblázat létrehozása
    // A táblázat HTML tartalmának beállítása
    table.innerHTML = `  
        <thead>
            <tr>
                <th>Harc megnevezése</th>
                <th>Szembenálló felek</th>
                <th>Haderő</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    document.body.appendChild(table);  // A táblázat hozzáadása a dokumentumhoz

    fillTable();  // A táblázat adatainak feltöltése

    createForm();  // Az űrlap generálása
}

// Az oldal generálásának elindítása
generatePage();
