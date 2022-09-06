import './App.css';
import Row from "./Components/Row.js";
import axios from 'axios';

let anwserIndex = 0;
let timesAnwsered = 0;
let writtenAnwser = "";
let word = "";
let gameEnded = false;

window.addEventListener('keydown', keyPressListener);

window.addEventListener('load', (event) => {
  axios.get('http://localhost:4000/getword').then(res =>{
    word = res.data;
}).catch(err => console.log(err))
});

function getChildren(index){
  let main = document.getElementById('main');
  let children = main.childNodes;
  return children.item(index);
}

function processAnwser(index){
  let rows = document.getElementById("Rows");
  let children = rows.childNodes;
  let row = children.item(index);
  let letterBoxes = row.childNodes;

  for (let i = 0; i < writtenAnwser.length; i++) {
    let box = letterBoxes.item(i);
    if(writtenAnwser[i] === word[i]){
      box.setAttribute('id','Correct');
    }else{
      box.setAttribute('id','Incorrect');
    }
    box.innerHTML = writtenAnwser[i];
  }
  if(writtenAnwser.toLowerCase() === word.toLowerCase()){
    gameEnded = true;
  }
}

function keyPressListener(e) {

  if(gameEnded){
    return;
  }

  var key = e.keyCode || e.charCode;
  if(key === 8){
    if(anwserIndex > 0){
        anwserIndex--;
        writtenAnwser = writtenAnwser.slice(0, -1);
        getChildren(anwserIndex).innerHTML = "";
        getChildren(anwserIndex).setAttribute('id', 'SelectedLetterBox');
        if(anwserIndex < 4){
          getChildren(anwserIndex + 1).removeAttribute('id');
        }
    }
  }else if(key === 13){
    if(anwserIndex >= 5){

      if(timesAnwsered >= 4) return;
      
      processAnwser(timesAnwsered);

      writtenAnwser = "";
      anwserIndex = 0;
      timesAnwsered++;
      for(let i = 0; i < 5; i++){
        getChildren(i).innerHTML = "";
      }
      getChildren(anwserIndex).setAttribute('id', 'SelectedLetterBox');
    }
  }else{
    if(anwserIndex >= 5) return;
    writtenAnwser += e.key;
    getChildren(anwserIndex).innerHTML = e.key;
    anwserIndex++;
    if(anwserIndex < 5){
      getChildren(anwserIndex).setAttribute('id', 'SelectedLetterBox');
    }
    if(anwserIndex >= 1){
      getChildren(anwserIndex - 1).removeAttribute('id');
    }
  }
}

function App() {
  return (
    <header id="Body">
      <h1 id="Title">The Ultimate Wordle</h1>
      <div className="Wrapper" id="main">
        <div className="LetterBox" id='SelectedLetterBox'></div>
        <div className="LetterBox"></div>
        <div className="LetterBox"></div>
        <div className="LetterBox"></div>
        <div className="LetterBox"></div>
      </div>

      <div id="CorrectLetterWrapper">
        <div id="Rows">
          <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
        </div>
      </div>
    </header>
  );
}

export default App;
