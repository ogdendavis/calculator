var time = new Date();
if (time.getHours() <= 4 || time.getHours() >= 17) {
  document.body.style.backgroundImage = 'url("https://user-images.githubusercontent.com/34392374/35192673-994251b2-fe97-11e7-904e-d4921508c6de.png")'
}


let workInProg = '';
let workInProgDisp = '';
let currVal = '';
let result = 'nope';
let alert = false;
const operations = {
  Div: '/',
  Mul: '*',
  Sub: '-',
  Add: '+',
  Point: '.',
  Equal: '='
};

function btnClick (event) {
  if (alert === true) {
    alert = false;
    clearAll();
  }
  const id = event.target.id;
  const elem = id.slice(2);
  if (result !== 'nope') { // hits after running a calculation
    if (elem.length === 1) { // if user enters a number
      clearAll();
    } else { // if user enters an operator
      workInProg = '';
    }
    result = 'nope';
  }
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
    if (currVal[0] === 0 && currVal[1] !== '.') {
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
  if (alert === false) {
    if (currVal.length > 12) {
      currVal = '';
      document.getElementById('jsCurrVal').innerHTML = "Too long!";
    }
    else if (currVal.length === 0) {
      document.getElementById('jsCurrVal').innerHTML = '0';
    }
    else if (typeof(currVal) === 'number') { // rounding results
      if (currVal > 999999999999) {
        currVal = '';
        document.getElementById('jsCurrVal').innerHTML = "Number too big!";
      }
      else if (`${currVal}`.length > 12) { // should only be decimals
        const shortenedCurrVal = `${currVal}`.slice(0,12);
        document.getElementById('jsCurrVal').innerHTML = shortenedCurrVal;
      }
    }
    else {
      document.getElementById('jsCurrVal').innerHTML = currVal;
    }
    if (workInProg.length > 40) {
      let wipEnd = workInProg.substring(workInProg.length - 37);
      workInProgDisp = '...' + wipEnd;
      document.getElementById('jsWorkInProg').innerHTML = workInProgDisp;
    } else if (workInProg.length === 0) {
      document.getElementById('jsWorkInProg').innerHTML = 'Let\'s calculate!'
    } else {
      document.getElementById('jsWorkInProg').innerHTML = workInProg;
    }
  } // end if alert is false
  else if (alert === true) {
    document.getElementById('jsCurrVal').innerHTML = 'ERROR';
  }
} // end display

function keyPressListener(event) {
  // If it's a valid key, just make a fake event to send to btnClick!
  const eventKeyToIdDictionary = {
    0: 'js0',
    1: 'js1',
    2: 'js2',
    3: 'js3',
    4: 'js4',
    5: 'js5',
    6: 'js6',
    7: 'js7',
    8: 'js8',
    9: 'js9',
    Enter: 'jsEqual',
    '=': 'jsEqual',
    '/': 'jsDiv',
    '*': 'jsMul',
    '+': 'jsAdd',
    '-': 'jsSub',
    '.': 'jsPoint',
  };
  const validCodes = Object.keys(eventKeyToIdDictionary);

  if (validCodes.indexOf(event.key) !== -1) {
    btnClick({ target: { id: eventKeyToIdDictionary[event.key] } });
  }
}

window.onload = () => {
  document.addEventListener('keypress', keyPressListener);
}
