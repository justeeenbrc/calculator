/* let result = document.getElementById('result');
let multiply = document.getElementsByClassName('.multiply');
let divide = document.getElementsByClassName('.divide');
let subtract = document.getElementsByClassName('.subtract');
let add = document.getElementsByClassName('.add');

function appendToResult(value) {
  result.value += value;
}

function clearResult() {
  result.value = '';
}

function calculateResult() {

} */

let total = 0;
let buffer = "0";
let previousOperator;
let previousOperation;
let screen = document.querySelector('.screen');
let calcStore = '';

const screenText = screen.innerText;

function buttonClick(value){
  if(isNaN(value)){
    handleSymbol(value);
  }
  else {
    handleNumber(value);
  }
  screen.innerText = buffer;

}

function handleSymbol(symbol){
  switch(symbol) {
    case'Clear':
      buffer = '0';
      total = 0;
      break;

    case '=':
      if(previousOperator === null){
        return
      }
      flushOperation(parseFloat(buffer));
      previousOperator=null;
      buffer = total;
      total = 0;
      break;
    
    case 'Del':
      if(buffer.length === 1){
        buffer ='0';
      }else{
        buffer = buffer.substring(0,buffer.length-1);
      }
      break;
    case '+':
    case '-':
    case 'x':
    case '/':
      handleMath(symbol);
      break;

  }
}

function handleMath(symbol) {
  if(buffer === '0'){
    return;
  }
  const intBuffer = parseFloat(buffer);

  if(total === 0){
    total = intBuffer;
  }else{
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer ='0';
}

function flushOperation(intBuffer){
  if(previousOperator === '+'){
    total += intBuffer;
  }else if(previousOperator === '-'){
    total -= intBuffer;
  }else if(previousOperator === 'x'){
    total *= intBuffer
  }else if(previousOperator === '/'){
    total /= intBuffer;
  }
}

function handleNumber (numberString){
  if(buffer === '0'){
    buffer = numberString;
  }else{
    buffer += numberString;
  }
  previousOperation = `${buffer} ${previousOperator} ${numberString}`;
}

function init(){
  let buttons = document.querySelectorAll('.calc-button');
    buttons.forEach((item)=>{
      item.addEventListener('click', function(event){
        buttonClick(event.target.innerText);
            appendToHistory(event.target.innerText);
      });
    })
    
  }

  function appendToHistory (calcString){
    const history = document.querySelector('.calc-history');
    const para = document.createElement('p');
    const calcStoreSplit = calcStore.split('');
    //console.log(calcStore);
    if(calcString === 'Clear'){
        calcStore='';
    }else if(calcString === 'Del'){
        calcStoreSplit.pop();
        calcStore = calcStoreSplit.join('');
    }else if(calcString === '='){
        const paraContent = document.createTextNode(`${calcStore} = ${buffer}`);
        para.appendChild(paraContent);
        history.insertBefore(para, history.firstChild);
        calcStore = '';
    }else{
        //console.log(calcStore);
        calcStore = `${calcStore} ${calcString}`;
    }

    
    
    /* if(calcStoreSplit[calcStoreSplit.length-1] === '='){
         const paraContent = document.createTextNode(`${calcStore} ${buffer}`);
        para.appendChild(paraContent);
        history.append(para);
        calcStore = '';
    }else if (calcStoreSplit[calcStoreSplit.length-1] == 'Clear' | calcStoreSplit[calcStoreSplit.length-1] == 'Del') {
        calcStoreSplit.pop();
        calcStore = calcStoreSplit.join('');
        console.log(calcStoreSplit);
        
    }  */  
    }

  function historyStorage(){
    let buttons = document.querySelectorAll(".calc-button oper symb");
      buttons.forEach((item)=>{
        item.addEventListener('click', function(event){
            appendToHistory(event);
        });
      })
      
    }

    function previousOper(){
        let buttons = document.querySelectorAll('.calc-button');
        buttons.forEach((item)=>{
            item.addEventListener('click', function(event){
            if(event.target.innerText === '='){

            }
            buttonClick(event.target.innerText);
          })
        }
    )}

init();
historyStorage();