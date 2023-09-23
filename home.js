function aboutopen() {
    document.querySelector('.about ol').style.display = 'flex'
}
function aboutclose() {
    document.querySelector('.about ol').style.display = 'none'
}
let summary = {
    players: {
        player1: '',
        player2: ''
    },
    toss: {
        tosswon: '',
        decition: ''
    },
    firsthalf: {
        score: '',
        opponent_need: ''
    },
    secondhalf: {
        opponentscore: '',
        result: ''
    }
}

let finger = ['zero', 'one', 'two', 'three', 'four', 'five', 'six']

let playername;

function gototoss(e) {
    playername = document.getElementById('player_name').value;
    if (playername) {
        e.preventDefault();
        document.querySelector('.entiretoss').style.display = 'flex'
        summary.players.player1 = playername;
        summary.players.player2 = 'computer'
        document.querySelector('.player1 p').innerHTML = playername.toUpperCase()
        toss_decition.style.display = 'flex'
        document.querySelector('.landing_page').style.display = 'none'
        player_profile.style.display = 'flex'
    }
}

// toss
let toss_decition = document.querySelector('.toss_decition')
//odd or even button
let sub_o_e = document.getElementById('submit')
let tossstart = document.getElementById('toss')
//toss six buttons
let buttons = document.querySelector('.buttons')


function humanvalue(value) {
    toss_decition.style.display = 'none'
    finalval = value;
    tossstart.style.display = 'flex'
    buttons.style.display = 'flex';
}

// player_profile
let player_profile = document.querySelector('.player_profile')
//computer value for toss(odd or even)
let comv = document.querySelector('#cv');
//human value for toss(odd or even)
let humv = document.querySelector('#hv');
//computer value + human value
let oddoreven = document.querySelector('#ooe');
//toss result who won the toss
let toss_result = document.querySelector('#toss_result');
//batsman decision after toss won
let tosswon = document.getElementById('tosswon')
//computer decision array
let computer_tosswon = ['batting', 'bowling']
//this is the button of retoss
let computer_tosswon_decition = document.querySelector('.computer_tosswon')//computer decision after toss won
var finalval;
let computer_decition;


//toss number button
function toss(e) {
    //here e refers current event for example button
    btn = e.target.innerHTML
    let computervalue = Math.floor((Math.random() * 7))
    buttons.style.display = 'none'
    toss_decition.style.display = 'none'
    humv.setAttribute('src', `./gameImages/fingers/${finger[btn]}.png`);
    comv.setAttribute('src', `./gameImages/fingers/${finger[computervalue]}.png`);
    result_oddoreven = Number(btn) + Number(computervalue)
    let result = ''
    if (result_oddoreven == 0) {
        oddoreven.innerHTML = "here 0 consider as even"
    }
    else if (result_oddoreven % 2 == 0) {
        oddoreven.innerHTML = result_oddoreven + "  It Is Even"
        result = 'even'
    }
    else { oddoreven.innerHTML = result_oddoreven + "  It Is Odd"; result = 'odd' }
    if (finalval == result) {
        toss_result.innerHTML = 'you won the toss'
        summary.toss.tosswon = `${playername} won the toss`
        tosswon.style.display = 'block'
        computer_tosswon_decition.innerHTML = ''

    }
    else {
        toss_result.innerHTML = 'computer won the toss'
        summary.toss.tosswon = `computer won the toss`
        computer_decition = computer_tosswon[Math.floor(Math.random() * 2)]
        computer_tosswon_decition.innerHTML = `computer choose to ${computer_decition}`;
        tosswon.style.display = 'none'
        computer_decition == 'batting' ? setTimeout(bowling, 3000, playername, 'bat first') : setTimeout(batting, 3000, playername, 'bowl first')
    }
}


let human_decision;
let batsman;
let bowler;
function batting(plname, decision) {
    document.querySelector('.entiretoss').style.display = 'none'
    document.getElementById('first_half').style.display = 'flex'
    document.querySelector('.playername_').innerHTML = plname.toUpperCase()
    human_decision = 'batting';
    batsman = playername;
    bowler = 'computer';
    summary.toss.decition = 'choose ' + decision
    tossdetails.innerHTML = `${summary.toss.tosswon} and ${summary.toss.decition}`
    document.querySelector('.who_plays_batting_in_firsthalf').innerHTML = batsman;
}
function bowling(plname, decision) {
    document.querySelector('.entiretoss').style.display = 'none'
    document.getElementById('first_half').style.display = 'flex'
    human_decision = 'bowling';
    document.querySelector('.playername_').innerHTML = plname.toUpperCase()
    batsman = 'computer';
    bowler = playername
    summary.toss.decition = 'choose ' + decision
    tossdetails.innerHTML = `${summary.toss.tosswon} and ${summary.toss.decition}`
    document.querySelector('.who_plays_batting_in_firsthalf').innerHTML = batsman;
}


// first half
let player1 = document.querySelector('#humanScore')
let player2 = document.querySelector('#computerbowl')
let scoreboard = document.getElementById('scoreBoard')
let firstHalfResult = document.getElementById('first_half_result')
let runsneed = document.getElementById('runsneed')
let tossdetails = document.querySelector('.tossdetails')

scoreboard.innerHTML = 0;
//target run to win
let towin

function score(humanvalue) {
    let hums = humanvalue.target.innerHTML
    let coms = Math.floor((Math.random() * 7))
    player1.setAttribute('src', `./gameImages/fingers/${finger[hums]}.png`);
    player2.setAttribute('src', `./gameImages/fingers/${finger[coms]}.png`);
    if (Number(hums) == coms) {
        document.getElementById('gamebutton').style.display = 'none'
        firstHalfResult.innerHTML = scoreboard.innerHTML == 0 ? `${batsman} duck out` : `${batsman} out`
        towin = Number(scoreboard.innerHTML) + 1;
        summary.firsthalf.score = `${batsman} scored ${towin - 1} ${(towin - 1) <= 1 ? 'run' : 'runs'}`;
        runsneed.innerHTML = `${bowler} need ${towin} ${towin <= 1 ? 'run' : 'runs'} to win`;
        summary.firsthalf.opponent_need = runsneed.innerHTML;
        setTimeout(secondhalf, 2000)
    }
    else {
        if (human_decision == 'batting') {
            scoreboard.innerHTML = Number(scoreboard.innerHTML) + Number(hums)
        }
        else {
            scoreboard.innerHTML = Number(scoreboard.innerHTML) + coms
        }
    }
}

function secondhalf() {
    document.getElementById('first_half').style.display = 'none'
    document.getElementById('second_half').style.display = 'flex'
    firstHalfScore.innerHTML = `${summary.firsthalf.score} and ${summary.firsthalf.opponent_need}`;
    batsman == playername ? batsman = 'computer' : batsman = playername;
    bowler == playername ? bowler = 'computer' : bowler = playername;
    document.querySelector('.player_name').innerHTML = playername.toUpperCase();
    document.querySelector('.who_plays_batting_in_secondhalf').innerHTML = batsman;
    console.log(batsman)
}


// secondhalf
let firstHalfScore = document.getElementById('first_half_score')
let playerone = document.querySelector('#humanbowl')
let playertwo = document.querySelector('#computerScore')
let secondHalfResult = document.getElementById('second_half_result')
let secondscoreboard = document.getElementById('secondscoreBoard')
secondscoreboard.innerHTML = 0;
let need = document.getElementById('need')

function ball(event) {
    let humscore = event.target.innerHTML
    let comscore = Math.floor((Math.random() * 7))
    playerone.setAttribute('src', `./gameImages/fingers/${finger[humscore]}.png`);
    playertwo.setAttribute('src', `./gameImages/fingers/${finger[comscore]}.png`);

    if (Number(humscore) == comscore) {
        need.innerHTML = ''
        firstHalfScore.innerHTML = ''
        document.querySelector('.match_summary_button').style.display = 'flex'
        summary.secondhalf.opponentscore = `${batsman} scored ${secondscoreboard.innerHTML} ${(secondscoreboard.innerHTML) <= 1 ? 'run' : 'runs'} `;
        document.getElementById('bowlbutton').style.display = 'none'
        if (secondscoreboard.innerHTML == towin - 1) {
            secondHalfResult.innerHTML = 'match draw'
            summary.secondhalf.result = secondHalfResult.innerHTML
        }
        else
            secondHalfResult.innerHTML = `${bowler} won by ${towin - secondscoreboard.innerHTML} ${(towin - secondscoreboard.innerHTML) <= 1 ? 'run' : 'runs'}`;
            summary.secondhalf.result = secondHalfResult.innerHTML
    }
    else {
        let needs;
        if (human_decision == 'batting') {
            secondscoreboard.innerHTML = Number(secondscoreboard.innerHTML) + Number(comscore);
            needs = towin - Number(secondscoreboard.innerHTML);
            need.innerHTML = `${batsman} need ${needs} ${needs <= 1 ? 'run' : 'runs'} to win`;
        }
        else {
            secondscoreboard.innerHTML = Number(secondscoreboard.innerHTML) + Number(humscore);
            needs = towin - Number(secondscoreboard.innerHTML);
            need.innerHTML = `${batsman} need ${needs} ${needs <= 1 ? 'run' : 'runs'} to win`;
        }
        if (secondscoreboard.innerHTML >= towin) {
            document.querySelector('.match_summary_button').style.display = 'flex'
            secondHalfResult.innerHTML = `${batsman} won the match`;
            summary.secondhalf.opponentscore = `${batsman} scored ${secondscoreboard.innerHTML} ${(secondscoreboard.innerHTML) <= 1 ? 'run' : 'runs'}`
            summary.secondhalf.result = secondHalfResult.innerHTML
            document.getElementById('bowlbutton').style.display = 'none'
            need.innerHTML = ''
            firstHalfScore.innerHTML = ''
        }

    }
}


// match summary
function matchSummary() {
    document.getElementById('second_half').style.display = 'none'
    document.querySelector('.match_summary').style.display = 'flex'
    document.getElementById('toss_summary').innerHTML = summary.toss.tosswon
    document.getElementById('tossDecition_summary').innerHTML = summary.toss.decition
    document.getElementById('first_half_summary').innerHTML = summary.firsthalf.score
    document.getElementById("first_half_opponentneed_summary").innerHTML = summary.firsthalf.opponent_need
    document.getElementById("second_half_summary").innerHTML = summary.secondhalf.opponentscore
    document.getElementById("result_summary").innerHTML = summary.secondhalf.result

}
// home button
function home() {
    location.reload()
}

