function crearEjercito() {
    let ejercito = {
        submarino: [{isAlive: true, vidaUnidad: 2500, damage: 500}],
        regularSoldiers: [],
        profesionalSoldiers: [],
        eliteSoldiers: [],
        carroTanque: [],
        helicoptero: [],
        avionCombate: []
    };
    let vidaSubBase = ejercito.submarino[0].vidaUnidad;
    let damageSubBase = ejercito.submarino[0].damage;
    ejercito.regularSoldiers = generarTripulantes(500, 1000, 2, 1, vidaSubBase, damageSubBase);
    ejercito.profesionalSoldiers = generarTripulantes(500, 1000, 3, 2, vidaSubBase, damageSubBase);
    ejercito.eliteSoldiers = generarTripulantes(200, 300, 4, 3, vidaSubBase, damageSubBase);
    ejercito.carroTanque = generarTripulantes(50, 100, 7, 4, vidaSubBase, damageSubBase);
    ejercito.helicoptero = generarTripulantes(30, 50, 8, 5, vidaSubBase, damageSubBase);
    ejercito.avionCombate = generarTripulantes(50, 75, 10, 6, vidaSubBase, damageSubBase);
    ejercito.submarino = generarTripulantes(0, 2, 12, 14, vidaSubBase, damageSubBase)
    const vidaReguSoldie= ejercito.regularSoldiers[0].vidaUnidad;
    const vidaProfeSold= ejercito.profesionalSoldiers[0].vidaUnidad;
    const vidaEliSoldi= ejercito.eliteSoldiers[0].vidaUnidad;
    const vidaCarroTanque= ejercito.carroTanque[0].vidaUnidad;
    const vidaHelicoptero= ejercito.helicoptero[0].vidaUnidad;
    const vidaAvionComb= ejercito.avionCombate[0].vidaUnidad;
    return ejercito;
}

function generarTripulantes(cantidadMinima, cantidadMaxima, parteVida, parteDamage, vidaSubBase, damageSubBase) {
    let soldiers = []
    for (let i = 0; i < generateRandomNumber(cantidadMinima, cantidadMaxima); i++) {
        let soldier = {
            isAlive: true,
            vidaUnidad: calcularVidaYDaño(parteVida, 12, vidaSubBase),
            damage: calcularVidaYDaño(parteDamage, 14, damageSubBase)
        }
        soldiers.push(soldier);
    }
    return soldiers
}
let golpesCtri=0
let ejercitoGuerra1 = crearEjercito();
let ejercitoGuerra2 = crearEjercito();
startWar(ejercitoGuerra1, ejercitoGuerra2);

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
        golpesCtri++;
    }
    unidadRecibe.vidaUnidad -= realDamage;
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
    let attackerName = (attacker === ejercito1) ? "Ejército 1" : "Ejército 2";
    let defenderName = (defender === ejercito1) ? "Ejército 1" : "Ejército 2";
    console.log(`La batalla empieza. ${attackerName} ataca primero.`);
    let round = 0
    do {
        round++;
        console.log(`Turno ${round}: ${attackerName} ataca`);
        generateRandomAttack(attacker, defender);
        let chang = attacker;
        attacker = defender;
        defender = chang;
        attackerName = (attacker === ejercito1) ? "Ejército 1" : "Ejército 2";
        defenderName = (defender === ejercito1) ? "Ejército 1" : "Ejército 2";
        console.log(numberAliveLeft(ejercito1, ejercito2));
    } while (isArmyDefeated(defender) !== true)
    console.log(`¡${attackerName} ha ganado en el turno ${round}!`);
    console.log(`number of critical attacks ` + golpesCtri);
    console.log(`number of army integrantes death ` + getAllAliveTargetsAndDeath(attacker,false).length);
    console.log(attacker);
}

function isArmyDefeated(ejercito) {
    for (let unitGroup in ejercito) {
        let units = ejercito[unitGroup];
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive === true) {
                return false;
            }
        }
    }
    return true;
}
function numberOfArmyNotDamaged(ejercito){
    let targets = [];
    for (let group in ejercito) {
        let units = ejercito[group];
        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive === true) {
                units[i].vidaUnidad === ejercito.vidaR
                targets.push({group: group, index: i});
            }
        }
    }
    return targets;
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