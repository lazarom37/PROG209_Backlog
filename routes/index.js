var express = require('express');
var router = express.Router();

// XX BEGINNING of code copied from Backlog project's main.js

let ServerNoteArray = [];

// define a constructor to create note objects
let GameObject = function (pData, pType) {
    this.data = pData;
    this.type = pType;
}

ServerNoteArray.push(new GameObject("[S] Resident Evil (2002)", "Current"));
ServerNoteArray.push(new GameObject("[S] Elden Ring", "Finished"));
ServerNoteArray.push(new GameObject("[S] Live A Live", "Dropped"));

console.log("This is ServerNoteArray");
console.log(ServerNoteArray);

// XX END of code copied from Backlog project's main.js

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile("index.html");
});

/* GET all Game data */
router.get('/getAllGames', function(req, res) {
  res.status(200).json(ServerNoteArray);
});

/* Add one new game */
router.post('/AddGame', function(req, res) {
  const newGame = req.body;  // get the object from the req object sent from browser
  console.log(newGame);
  ServerNotes.push(newGame);  // add it to our "DB"  (array)
  // prepare a reply to the browser
  let response = {
    status  : 200,
    success : 'Updated Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});

module.exports = router;