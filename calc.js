//Just playing with backgrounds
var time = new Date();
if (time.getHours() <= 4 || time.getHours() >= 17) {
  document.body.style.backgroundImage = 'url("https://user-images.githubusercontent.com/34392374/35192673-994251b2-fe97-11e7-904e-d4921508c6de.png")'
}

//Now to make a working calculator...
var workInProg = ''; //variable to hold all button pushes before Equal
var workInProgDisp = ''; //in case WIP gets too long to display
var currVal = ''; //variable to hold most recent button push
var result = 'nope'; //to hold the result of a first Equal, so can use it in next one!
var alert = false; //to override normal display if there's an error
var operations = {
  Div: '/',
  Mul: '*',
  Sub: '-',
  Add: '+',
  Point: '.',
  Equal: '='
};

function btnClick (event) {
  if (alert == true) {
    alert = false;
    clearAll();
  }
  let id = event.target.id;
  let elem = id.slice(2);
  if (result != 'nope') {
    if (elem.length == 1) { //if they hit a new number
      clearAll();
      currVal = '';
    } else { //if they hit an operator
      workInProg = '';
    }
    result = 'nope';
  } // end if result
  if (elem.length > 1) {
    if (elem === 'AC') {
      clearAll();
    } else if (elem === 'CE') {
      clearElement();
    } else if (elem === 'Equal') {
      execute();
    } else if (elem === 'PosNeg') {
      posNeg();
    } else if (elem === "Point") {
      currVal += operations[elem];
    }
    else { // for math operators
      if (/\D$/.test(workInProg) && currVal.length === 0) { //if user hits 2 operators in a row
        workInProg = workInProg.slice(0, -1);
        workInProg += operations[elem];
      } else {
        workInProg += currVal + operations[elem];
        currVal = '';
      }
    }
  } //end special cases! Now just digits
  else {
    if (currVal[0] == 0 && currVal[1] != '.') {
      currVal = elem;
    } else {
      currVal += elem;
    }
  }
  display();
} //end btnClick

function clearAll() {
  workInProg = '';
  currVal = '';
}

function clearElement() {
  currVal = '';
}

function posNeg() {
  currVal = currVal * -1;
  document.getElementById('jsCurrVal').innerHTML = currVal;
}

function execute() {
  workInProg += currVal + '=';
  if (/^\D/.test(workInProg) && !/^-\d/.test(workInProg)) {
    alert = true;
    document.getElementById('jsWorkInProg').innerHTML = 'Invalid expression. Try again!';
  }
  let toCalc = workInProg.slice(0,-1);
  result = eval(toCalc);
  currVal = result;
}

function display() {
  if (alert == false) {
    if (currVal.length > 12) {
      currVal = '';
      document.getElementById('jsCurrVal').innerHTML = "Too long!";
    } else if (currVal.length == 0) {
      document.getElementById('jsCurrVal').innerHTML = '0';
    } else {
      document.getElementById('jsCurrVal').innerHTML = currVal;
    }
    if (workInProg.length > 40) {
      let wipEnd = workInProg.substring(workInProg.length - 37);
      workInProgDisp = '...' + wipEnd;
      document.getElementById('jsWorkInProg').innerHTML = workInProgDisp;
    } else if (workInProg.length == 0) {
      document.getElementById('jsWorkInProg').innerHTML = 'Let\'s calculate!'
    } else {
      document.getElementById('jsWorkInProg').innerHTML = workInProg;
    }
  } // end if alert is false
  else if (alert == true) {
    document.getElementById('jsCurrVal').innerHTML = 'ERROR';
  }
} // end display
