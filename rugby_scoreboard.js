let teamA_name = "";
let teamB_name = "";

let teamA_points = 0;
let teamB_points = 0;


function teamA_P1() {
    teamA_points += 1;
    document.getElementById("teamA_points").innerHTML = teamA_points;

    send_data();
}

function teamA_M1() {
    if (teamA_points > 0) {
        teamA_points -= 1;
    }
    else {
        teamA_points = 0;
    }
    document.getElementById("teamA_points").innerHTML = teamA_points;

    send_data();
}


function teamB_P1() {
    teamB_points += 1;
    document.getElementById("teamB_points").innerHTML = teamB_points;

    send_data();
}

function teamB_M1() {
    if (teamB_points > 0) {
        teamB_points -= 1;
    }
    else {
        teamB_points = 0;
    }
    document.getElementById("teamB_points").innerHTML = teamB_points;

    send_data();
}


function update_team_names() {
    teamA_name = document.getElementById("teamA_name_in").value;
    teamB_name = document.getElementById("teamB_name_in").value;

    document.getElementById("teamA_name").innerHTML = teamA_name;
    document.getElementById("teamB_name").innerHTML = teamB_name;

    send_data();
}




// ----------------------------------------


let timerInterval;
var minutes = 0,
    seconds = 0,
    diff = 0;
minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;
function startTimer(duration, display) {
    var ptime = 0;
    var btime = 0;
    var corr = 0;
    let corr_stat = false;
    var start = Date.now();
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        if (start_pause_stat == true) {
            if (corr_stat == true) {
                corr = corr + (ptime - btime);
                corr_stat = false;
            }


            btime = (((Date.now() - start) / 1000) | 0);
            diff = duration - (btime - corr);
            // ptime = 0;
            // console.log("[.t]  btime-" + btime + "  ptime-" + ptime + "  corr-" + corr + "  diff-" + diff);
        }

        if (start_pause_stat == false) {
            ptime = 0;
            ptime = (((Date.now() - start) / 1000) | 0);
            corr_stat = true;
            // corr = 0;
            // console.log("[.p]  btime-" + btime + "  ptime-" + ptime + "  corr-" + corr + "  diff-" + diff);
        }


        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        send_data();

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }

        if (diff == 0) {
            reset();
        }

    };
    // we don't want to wait a full second before the timer starts
    timer();
    timerInterval = setInterval(timer, 1000);
}


let start_pause_stat;
var timer_start_val;

function timer_set_val() {
    reset();
    timer_start_val = document.getElementById("set_timer_val_form").value;
    let timer_start_val_init = timer_start_val < 10 ? "0" + timer_start_val : timer_start_val;
    minutes = timer_start_val_init;
    seconds = 0;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timer").innerHTML = timer_start_val_init + ":00";
    send_data();
}

function start() {
    reset();
    timer_start_val = document.getElementById("set_timer_val_form").value;
    if (timer_start_val > 0) {
        start_pause_stat = true;
        // console.log("start " + start_pause_stat);
        timer_start_val = 60 * timer_start_val,
            display = document.querySelector('#timer');
        // document.getElementById("timer").innerHTML = display;
        minutes = 0;
        seconds = 0;
        startTimer(timer_start_val, display);
    }
}

function resume() {
    start_pause_stat = true;
    // console.log("resume " + start_pause_stat);
}
function pause() {
    start_pause_stat = false;
    // console.log("pause " + start_pause_stat);
}


function reset() {
    clearInterval(timerInterval);
    ptime = 0;
    btime = 0;
    corr = 0;
    corr_stat = false;
    document.getElementById("timer").innerHTML = "00:00";
    minutes = 0;
    seconds = 0;
    diff = 0;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timer_start_val = 0;
    send_data();
}

function send_data() {
    const dataToPost = {
        teamA_name: teamA_name, // Boolean
        teamB_name: teamB_name, // String
        teamA_points: teamA_points, // String
        teamB_points: teamB_points, // Number
        timer_time: minutes + ":" + seconds, // Number
    }

    console.log(dataToPost);
}