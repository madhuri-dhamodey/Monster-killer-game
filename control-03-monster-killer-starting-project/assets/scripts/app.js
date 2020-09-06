const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_GAME_OVER = "GAME_OVER";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";

function getMaxLifeValues() {
    const enteredValue = prompt("maximum life for you and monster", "100");
    let parsedVlaue = parseInt(enteredValue);

    if(isNaN(parsedVlaue) || parsedVlaue <= 0) {
        throw { message: "invalid input, not a number!"}
    }
    return parsedVlaue;
}

let chosenMaxLife;

try{
    chosenMaxLife = getMaxLifeValues();
} catch(error) {
    console.log(error);
    chosenMaxLife = 100;
    alert("assign by 100")
}

let battleLog = [];

let currentMonsterHealth = chosenMaxLife;
let currentPlayerhealth = chosenMaxLife;
let hasBonusLife = true;


adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterhealth, playerhealth) {
    let logEntry;
    if(ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            monsterhealth: monsterhealth,
            playerhealth: playerhealth,
            target: "MONSTER"
        }
    } else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            monsterhealth: monsterhealth,
            playerhealth: playerhealth,
            target: "MONSTER"
        }
    } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            monsterhealth: monsterhealth,
            playerhealth: playerhealth,
            target: "PLAYER"
        }
    } else if(ev === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: ev,
            value: val,
            monsterhealth: monsterhealth,
            playerhealth: playerhealth,
            target: "PLAYER"
        }
    } else if(ev === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: ev,
            value: val,
            monsterhealth: monsterhealth,
            playerhealth: playerhealth,
        }
    }
    battleLog.push(logEntry);
}

function printLogEvent() {
    console.log(battleLog);
}

function endRound(){
    const initialPlayerHealth = currentPlayerhealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerhealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerhealth)

    if(currentPlayerhealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerhealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("you would be died but bonus life saved you!");
    }
    if(currentMonsterHealth <=0 && currentPlayerhealth > 0){
        alert("you won!");
        writeToLog(LOG_EVENT_GAME_OVER, "PLAYER WON", currentMonsterHealth, currentPlayerhealth)  
    } else if( currentPlayerhealth <=0 && currentMonsterHealth > 0){
        alert("you lost!");
        writeToLog(LOG_EVENT_GAME_OVER, "MONSTER WON", currentMonsterHealth, currentPlayerhealth)
    }else if(currentMonsterHealth <=0 && currentPlayerhealth <=0){
        alert("you have a draw!");
        writeToLog(LOG_EVENT_GAME_OVER, "A DARW", currentMonsterHealth, currentPlayerhealth)
    } 
    if(currentMonsterHealth <=0 || currentPlayerhealth <= 0) {
        reset();
    }
}
function attackMonster(mode){
    let maxDamage;
    let attackValue;
    if(mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
        attackValue = LOG_EVENT_PLAYER_ATTACK;
    }else if(mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE;
        attackValue = LOG_EVENT_PLAYER_STRONG_ATTACK
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(attackValue, damage, currentMonsterHealth, currentPlayerhealth)
    endRound();
}
function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if(currentPlayerhealth >= chosenMaxLife - HEAL_VALUE) {
        alert("you can't to more than your max intial health!")
        healValue = chosenMaxLife - currentPlayerhealth;
    } else {
        healValue = HEAL_VALUE; 
    }
    increasePlayerHealth(healValue);
    currentPlayerhealth += healValue; 
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerhealth)  
    endRound();
}

function reset() {
    currentPlayerhealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogEvent)


// const ATTACK_VALUE = 10;
// const STRONG_ATTACK_VALUE = 17;
// const MONSTER_ATTACK_VALUE = 14;

// adjustHealthBars(100);

// function attackMonster(mode) {
//     let whichattack;
//     if(mode === "attack"){
//         whichattack = ATTACK_VALUE;
//     } else if(mode === "strong_attack"){
//         whichattack = STRONG_ATTACK_VALUE;
//     }
//     dealMonsterDamage(whichattack);
//     dealPlayerDamage(MONSTER_ATTACK_VALUE);

//     if(monsterHealthBar.value <= 0 && playerHealthBar.value > 0 ) {
//         alert("you won!");
//     } else if(playerHealthBar.value <= 0 && monsterHealthBar.value > 0) {
//         alert("you lost!");
//     }else if(playerHealthBar.value <= 0 && monsterHealthBar.value <= 0){
//         alert("you have a draw!");
//     }
// }

// function attackHandler() {
//     attackMonster("attack");
// }

// function strongAttackHandler() {
//     attackMonster("strong_attack");
// }

// attackBtn.addEventListener("click", attackHandler);
// strongAttackBtn.addEventListener("click", strongAttackHandler)