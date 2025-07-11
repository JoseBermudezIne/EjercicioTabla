let hasSavedSub    = false,
    hasSavedVidas  = false;
let vidaSub, damageSub, diviVidas, parteVidas;
let ejercito1 = null, ejercito2 = null;


function checkEnableCrear() {
    document.getElementById("crearEjercitosBtn")
        .disabled = !(hasSavedSub && hasSavedVidas);
}

document.addEventListener("DOMContentLoaded", () => {
    createHistoryTables();
    createStatsTable();
    createLiveView();

    const btnGuardarSub   = document.getElementById("btnGuardarSub");
    const btnGuardarVidas = document.getElementById("btnGuardarVidas");


    const btnCrear    = document.createElement("button");
    const btnIniciar = document.createElement("button");
    btnCrear.id       = "crearEjercitosBtn";
    btnIniciar.id     = "iniciarGuerraBtn";
    btnCrear.textContent    = "Crear ejércitos";
    btnIniciar.textContent  = "Iniciar guerra";
    btnCrear.disabled   = true;
    btnIniciar.disabled = true;

    const controls = document.createElement("div");
    controls.style.margin = "1em 0";
    controls.append(btnCrear, btnIniciar);
    document.body.insertBefore(
        controls,
        document.getElementById("warInformation")
    );


    btnGuardarSub.addEventListener("click", () => {
        const v = parseFloat(document.getElementById("vidaSubma").value);
        const d = parseFloat(document.getElementById("damageSub").value);
        if (isNaN(v) || isNaN(d)) {
            return alert("Ingresa valores numéricos para vida y daño del submarino.");
        }
        vidaSub    = v;
        damageSub  = d;
        hasSavedSub = true;
        checkEnableCrear();
        alert("Submarino guardado");
    });

        btnGuardarVidas.addEventListener("click", () => {
            const fd = new FormData(document.getElementById("vidaForm"));

            const diviVidas = {
                diviVidSub: 1,
                diviVidRegSol: parseInt(document.getElementById("regularDivi").value),
                diviVidProSol: parseInt(document.getElementById("profDivi").value),
                diviVidEliSol: parseInt(document.getElementById("eliteDivi").value),
                diviVidCarroTan: parseInt(document.getElementById("carroDivi").value),
                diviVidHeli: parseInt(document.getElementById("heliDivi").value),
                diviVidAvionCon: parseInt(document.getElementById("avionDivi").value)
            };
            const parteVidas = {
                diviVidSub: 1,
                diviVidRegSol: parseInt(document.getElementById("regularParte").value),
                diviVidProSol: parseInt(document.getElementById("profParte").value),
                diviVidEliSol: parseInt(document.getElementById("eliteParte").value),
                diviVidCarroTan: parseInt(document.getElementById("carroParte").value),
                diviVidHeli: parseInt(document.getElementById("heliParte").value),
                diviVidAvionCon: parseInt(document.getElementById("avionParte").value)
            };

            const anyNaN =
                Object.values(diviVidas).some(x => isNaN(x)) ||
                Object.values(parteVidas).some(x => isNaN(x));
            if (anyNaN) {
                return alert("Completa todos los campos de vida/división.");
            }
            hasSavedVidas = true;
            checkEnableCrear();
            alert("Configuración de vida guardada ");
                btnCrear.addEventListener("click", () => {
                    if (!hasSavedSub || !hasSavedVidas) {
                        return alert("Debes guardar Submarino y Vidas antes.");
                    }
                    ejercito1 = crearEjercitoConParametros(vidaSub, damageSub, diviVidas, parteVidas);
                    ejercito2 = crearEjercitoConParametros(vidaSub, damageSub, diviVidas, parteVidas);

                    document.getElementById("iniciarGuerraBtn").disabled = false;
                    numberOfMenbersByGroup(ejercito1, ejercito2, 0);
                    actualizarTablaDeRonda("leftt1", 0);
                    actualizarTablaDeRonda("leftt2", 0);
                });


            btnIniciar.addEventListener("click", () => {
                    if (!ejercito1 || !ejercito2) {
                        return alert("Primero crea los ejércitos.");
                    }
                    startWar(ejercito1, ejercito2);
                });
        });
});
function createLiveView() {
    let container = document.getElementById("warInformation");
    if (!container) {
        container = document.createElement("div");
        container.id = "warInformation";
        document.body.appendChild(container);
    }

    container.innerHTML = "";

    const title = document.createElement("h4");
    title.id = "tituloRonda";
    container.appendChild(title);
    const table = document.createElement("table");
    table.id = "tablaRonda";
    table.border = "1";

    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Unidad", "Cantidad Viva"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    container.appendChild(table);
}


function createHistoryTables() {
    const container = document.getElementById("roundHistory");
    container.innerHTML = "";
    const title = document.createElement("h3");
    title.textContent = "Historial de Rondas";
    container.appendChild(title);
    const cols = [
        "Ronda",
        "submarino",
        "regularSoldiers",
        "profesionalSoldiers",
        "eliteSoldiers",
        "carroTanque",
        "helicoptero",
        "avionCombate"
    ];

    function makeArmyHistoryTable(id, label) {
        const wrapper = document.createElement("div");
        const h4 = document.createElement("h4");
        h4.textContent = label;
        wrapper.appendChild(h4);

        const table = document.createElement("table");
        table.id = id;

        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");
        cols.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col;
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);
        table.appendChild(thead);
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        wrapper.appendChild(table);
        return wrapper;
    }
    container.appendChild(makeArmyHistoryTable("hist1", "Ejército 1"));
    container.appendChild(makeArmyHistoryTable("hist2", "Ejército 2"));
}


function createStatsTable() {
    const container = document.getElementById("statistics");
    container.innerHTML = "";
    const title = document.createElement("h3");
    title.textContent = "Estadísticas de la Batalla";
    container.appendChild(title);
    const table = document.createElement("table");
    table.id = "tablaInf";
    table.border = "1";
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Estadística", "Valor"].forEach(lbl => {
        const th = document.createElement("th");
        th.textContent = lbl;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    container.appendChild(table);
}



function crearEjercitoConParametros(vidaSub, damageSub, diviVidas,parteVidas)  {
    let ejercito = {
        submarino: [{isAlive: true, vidaUnidad: vidaSub, damage: damageSub  }],
        regularSoldiers: [],
        profesionalSoldiers: [],
        eliteSoldiers: [],
        carroTanque: [],
        helicoptero: [],
        avionCombate: []
    };
    let vidaSubBase = ejercito.submarino[0].vidaUnidad;
    let damageSubBase = ejercito.submarino[0].damage;
    ejercito.regularSoldiers = generarTripulantes(500, 1000, parteVidas.diviVidRegSol,diviVidas.diviVidRegSol, 1, vidaSubBase, damageSubBase);
    ejercito.profesionalSoldiers = generarTripulantes(500, 1000, parteVidas.diviVidProSol,diviVidas.diviVidProSol, 2, vidaSubBase, damageSubBase);
    ejercito.eliteSoldiers = generarTripulantes(200, 300, parteVidas.diviVidEliSol,diviVidas.diviVidEliSol, 3, vidaSubBase, damageSubBase);
    ejercito.carroTanque = generarTripulantes(50, 100, parteVidas.diviVidCarroTan,diviVidas.diviVidCarroTan, 4, vidaSubBase, damageSubBase);
    ejercito.helicoptero = generarTripulantes(30, 50, parteVidas.diviVidHeli,diviVidas.diviVidHeli, 5, vidaSubBase, damageSubBase);
    ejercito.avionCombate = generarTripulantes(50, 75, parteVidas.diviVidAvionCon,diviVidas.diviVidAvionCon, 6, vidaSubBase, damageSubBase);
    ejercito.submarino = generarTripulantes(0, 2, parteVidas.diviVidSub,diviVidas.diviVidSub, 14, vidaSubBase, damageSubBase)
    resultados.vidaBaseSub = vidaSubBase;
    resultados.vidaBaseRegSole = ejercito.regularSoldiers[0].vidaUnidad;
    resultados.vidaBaseProSol = ejercito.profesionalSoldiers[0].vidaUnidad;
    resultados.vidaBaseEliSol= ejercito.eliteSoldiers[0].vidaUnidad;
    resultados.vidaBaseCarroTan= ejercito.carroTanque[0].vidaUnidad;
    resultados.vidaBaseHeli= ejercito.helicoptero[0].vidaUnidad;
    resultados.vidaBaseAvionCon= ejercito.avionCombate[0].vidaUnidad;

    return ejercito;
}

function generarTripulantes(cantidadMinima, cantidadMaxima, parteVida,diviVida, parteDamage, vidaSubBase, damageSubBase) {
    let soldiers = []
    for (let i = 0; i < generateRandomNumber(cantidadMinima, cantidadMaxima); i++) {
        let soldier = {
            isAlive: true,
            vidaUnidad: calcularVidaYDaño(parteVida, diviVida, vidaSubBase),
            damage: calcularVidaYDaño(parteDamage, 14, damageSubBase)
        }
        soldiers.push(soldier);
    }
    return soldiers
}
let resultados ={
    golpesCtri: 0,
    effectiveAttacks: 0,
    leftt1:{},
    leftt2:{},
    }


function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min
}

function generateRandomAttack(ejercitoAtacante, ejercitoRecibiendo) {
    for (let unitType in ejercitoAtacante) {
        for (let i = 0; i < ejercitoAtacante[unitType].length; i++) {
            let allTargets = getAllAliveTargetsAndDeath(ejercitoRecibiendo,true);
            if (allTargets.length !== 0) {
                let randomTarget = allTargets[Math.floor(generateRandomNumber(0, allTargets.length))];
                let targetUnit = ejercitoRecibiendo[randomTarget.group][randomTarget.index];
                if (targetUnit && ejercitoAtacante[unitType].at(i).isAlive === true) {
                    generateAttack(ejercitoAtacante[unitType].at(i), targetUnit);
                }
            } else {
                break;
            }
        }
    }
    return ejercitoRecibiendo;
}

function generateAttack(unidadAtgacante, unidadRecibe) {
    const damage = generateRandomNumber(1, unidadAtgacante.damage)
    let realDamage=damage - (damage * generateRandomNumber(0.0, 0.30))
    if(realDamage === unidadAtgacante.damage){
        resultados.golpesCtri++;
    }
    unidadRecibe.vidaUnidad -= realDamage;
    resultados.effectiveAttacks += 1;
    if (unidadRecibe.vidaUnidad <= 0) {
        unidadRecibe.isAlive = false
    }
    return unidadRecibe
} /* function generateRandomUnitToAttack(ejercitoRecibiendo,propertie){ let available = [] for (let i = 0; i < ejercitoRecibiendo[propertie].length; i++) { if (ejercitoRecibiendo[propertie].at(i).isAlive === true){ available.push(i) } } return available; }*/
function getAllAliveTargetsAndDeath(ejercito,alive) {
    let targets = [];
    for (let group in ejercito) {
        let units = ejercito[group];
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive === alive) {
                targets.push({group: group, index: i});
            }
        }
    }
    return targets;
}


function startWar(ejercito1, ejercito2) {
    let attacker = Math.random() < 0.5 ? ejercito1 : ejercito2;
    let defender = (attacker === ejercito1) ? ejercito2 : ejercito1;
    let round = 0;
    let attackerName = (attacker === ejercito1) ? "Ejército 1" : "Ejército 2";

    function nextRound() {
        if (isArmyDefeated(defender)) {
            console.log(`¡${attackerName} ha ganado en el turno ${round}!`);
            actualizarTablaDeRonda(attacker === ejercito1 ? ejercito1 : ejercito2, round);
            console.log(attacker)
            mostrarResultadosEnTabla(attacker, round);
            return;
        }

        round++;
        console.log(`Turno ${round}: ${attackerName} ataca`);
        generateRandomAttack(attacker, defender);
        numberOfMenbersByGroup(ejercito1, ejercito2, round);

        const sideKey = attacker === ejercito1 ? "leftt1" : "leftt2";
        actualizarTablaDeRonda(sideKey, round);
        mostrarResultadosEnTablaDeCadaRonda("leftt1", round);
        mostrarResultadosEnTablaDeCadaRonda("leftt2", round);
        // Intercambiar roles
        let temp = attacker;
        attacker = defender;
        defender = temp;
        attackerName = (attacker === ejercito1) ? "Ejército 1" : "Ejército 2";

        setTimeout(nextRound, 1000);

    }

    nextRound();
}
const unitImages = {
    submarino: "Imágenes/Subarino.avif",
    regularSoldiers: "pngtree-serious-soldier-standing-at-attention-png-image_2634690.jpg",
    profesionalSoldiers: "personaje-dibujos-animados-arma-arma_1013341-105540.avif",
    eliteSoldiers: "soldado-ejercito-uniforme-combate-camuflaje-arma-mascara-cara-estilo-dibujos-animados-vector-aislado_743577-925.avif",
    carroTanque: "tanque-guerra-dibujos-animados_119631-256.avif",
    helicoptero: "pngtree-blackhawk-helicopter-vector-png-image_12161464.png",
    avionCombate: "caza-reaccion-o-avion-militar-aislado-sobre-fondo-blanco_1308-65735.avif"
};


function actualizarTablaDeRonda(sideName, round) {
    nameEj= sideName === ejercito1 ? "leftt1" : "leftt2"
    const data = resultados[nameEj][round];
    if (!data) return;
    const titulo = document.getElementById("tituloRonda");
    titulo.textContent = `Ejército ${sideName === "leftt1" ? "1" : "2"} – Ronda ${round}`;
    const tbody = document.querySelector("#tablaRonda tbody");
    tbody.innerHTML = "";

    for (let grupo in data) {
        const tr = document.createElement("tr");

        const tdGrupo = document.createElement("td");
        const img = document.createElement("img");
        img.src = unitImages[grupo] || "images/default.png";
        img.alt = grupo;
        img.width = 24;
        img.style.verticalAlign = "middle";
        img.style.marginRight = "8px";

        tdGrupo.appendChild(img);
        tdGrupo.appendChild(document.createTextNode(grupo));
        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = data[grupo];

        tr.appendChild(tdGrupo);
        tr.appendChild(tdCantidad);
        tbody.appendChild(tr);
    }
}
function mostrarResultadosEnTabla(ejercitoGanador, round) {
    const tbody = document.querySelector("#tablaInf tbody");
    tbody.innerHTML = "";
    const resultadosFinales = [
        ["Turno de victoria", round],
        ["Golpes críticos", resultados.golpesCtri],
        ["Ataques efectivos", resultados.effectiveAttacks],
        ["Soldados no dañados", numberOfArmyNotDamaged(ejercitoGanador)],
        ["Soldados heridos (<30%)", numberOfArmyInjured(ejercitoGanador)],
        ["Soldados eliminados", getAllAliveTargetsAndDeath(ejercitoGanador, false).length]
    ];

    resultadosFinales.forEach(([label, value]) => {
        const fila = document.createElement("tr");
        const celdaNombre = document.createElement("td");
        const celdaValor = document.createElement("td");

        celdaNombre.textContent = label;
        celdaValor.textContent = value;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaValor);
        tbody.appendChild(fila);
    });
}
function mostrarResultadosEnTablaDeCadaRonda(sideName, round) {
    const data = resultados[sideName][round];
    if (!data) return;
    const tableId = sideName === "leftt1" ? "hist1" : "hist2";
    const tbody = document.querySelector(`#${tableId} tbody`);
    const tr = document.createElement("tr");

    const tdRound = document.createElement("td");
    tdRound.textContent = round;
    tr.appendChild(tdRound);
    const unitOrder = [
        "submarino",
        "regularSoldiers",
        "profesionalSoldiers",
        "eliteSoldiers",
        "carroTanque",
        "helicoptero",
        "avionCombate"
    ];
    unitOrder.forEach(unit => {
        const td = document.createElement("td");
        td.textContent = data[unit] != null ? data[unit] : 0;
        tr.appendChild(td);
    });

    tbody.appendChild(tr);
}


function isArmyDefeated(ejercito) {
    for (let unitGroup in ejercito) {
        let units = ejercito[unitGroup];
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive === true) {
                return false;
                break;
            }
        }
    }
    return true;
}
function numberOfArmyNotDamaged(ejercito){
    let counter = 0;
    for (let group in ejercito) {
        let units = ejercito[group];
        let baseVida = getBaseVida(group);
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive && units[i].vidaUnidad === baseVida) {
                counter++;
            }
        }
    }
    return counter;
}

function getBaseVida(groupName) {
    switch (groupName) {
        case "submarino": return resultados.vidaBaseSub;
        case "regularSoldiers": return resultados.vidaBaseRegSol;
        case "profesionalSoldiers": return resultados.vidaBaseProSol;
        case "eliteSoldiers": return resultados.vidaBaseEliSol;
        case "carroTanque": return resultados.vidaBaseCarroTan;
        case "helicoptero": return resultados.vidaBaseHeli;
        case "avionCombate": return resultados.vidaBaseAvionCon;
        default: return 0;
    }
}

function numberOfArmyInjured(ejercito){
    let counter = 0;
    for (let group in ejercito) {
        let units = ejercito[group];
        let baseVida = getBaseVida(group);
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive && units[i].vidaUnidad < baseVida * 0.3) {
                counter++;
            }
        }
    }
    return counter;
}
function numberOfMenbersByGroup(ejercito1, ejercito2, round) {
    let ejer1 = {};
    let ejer2 = {};
    for (let group in ejercito1) {
        let units = ejercito1[group];
        let contador = 0;
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive === true) {
                contador++;
            }
        }
        ejer1[group] = contador;
    }
    for (let group in ejercito2) {
        let units = ejercito2[group];
        let contador = 0;
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive === true) {
                contador++;
            }
        }
        ejer2[group] = contador;
    }

    resultados.leftt1[round] = ejer1;
    resultados.leftt2[round] = ejer2;
}



function numberAliveLeft(ejercito1, ejercito2) {
    let counterAlive1 = 0
    for (let unitGroup in ejercito1) {
        let units = ejercito1[unitGroup];
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive === true) {
                counterAlive1 = counterAlive1 + 1;
            }
        }
    }
    let counterAlive = 0
    for (let unitGroup in ejercito2) {
        let units = ejercito2[unitGroup];
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive === true) {
                counterAlive = counterAlive + 1;
            }
        }
    }
    return "Del ejercito 1 quedan " + counterAlive1 + " vivos y del ejercito dos " + counterAlive;
}

function calcularVidaYDaño(partes, totalPartes, vidaSub) {
    return (partes / totalPartes) * vidaSub;
}