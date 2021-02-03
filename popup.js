//import * as FileSaver from '../node_modules/file-saver/src/FileSaver.js'; //Uncaught (in promise) TypeError: FileSaver.saveAs is not a functionat popup.js:14
//import { saveAs } from 'file-saver'; //Uncaught TypeError: Failed to resolve module specifier "file-saver". Relative references must start with either "/", "./", or "../".
//import * as FileSaver from "file-saver"; //Uncaught TypeError: Failed to resolve module specifier "file-saver". Relative references must start with either "/", "./", or "../".
//import * as saveAs from '../node_modules/file-saver/dist/FileSaver.js';
//var FileSaver = require('file-saver');

function saveFile(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(new Blob([blob]));
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0)
  }
};

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    
    checkPageButton.addEventListener('click', function() {
      var matchIdText = document.getElementById('matchId').value;
      var matchRegex = new RegExp(/[0-9]{10}/);
      var goodMatchId = matchRegex.test(matchIdText);
      console.log(matchIdText);
      console.log(goodMatchId);
      if (matchIdText != null && goodMatchId){
        fetch('https://api.opendota.com/api/matches/' + matchIdText)
        .then(response => response.json())
        .then(
          // data => console.log(data.replay_url),
          data => fetch(data.replay_url).then(
            data => saveFile(data, "5814444972.dem.bz2") //F:/SteamLibrary/steamapps/common/dota 2 beta/game/dota/replays/
          )//, "D:\Users\Skewb\Downloads\THIS_IS_A_TEST.jpg")
        );
      }
    }, false);
  }, false);
