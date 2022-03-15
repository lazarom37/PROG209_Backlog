var express = require('express');
var router = express.Router();

let ServerNoteArray = [];

// define a constructor to create note objects
let GameObject = function (pData, pType) {
    this.data = pData;
    this.type = pType;
}

ServerNoteArray.push(new GameObject("[Server] Resident Evil (2002)", "Current"));
ServerNoteArray.push(new GameObject("[Server] Dragon Quest V", "Current"));
ServerNoteArray.push(new GameObject("[Server] Elden Ring", "Finished"));
ServerNoteArray.push(new GameObject("[Server] Pikmin 2", "Finished"));
ServerNoteArray.push(new GameObject("[Server] Absolver", "Dropped"));
ServerNoteArray.push(new GameObject("[Server] Dark Souls 3", "Dropped"));

console.log(ServerNoteArray);

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
  ServerNoteArray.push(newGame);  // add it to our "DB"  (array)
  // prepare a reply to the browser
  let response = {
    status  : 200,
    success : 'Updated Successfully (added)'
  }
  res.end(JSON.stringify(response)); // send reply
});

/* Delete one game */
router.delete('/DelGame/:title', (req, res) => {
  const title = req.params.title;
  let found = false;
  console.log(title);
  for(let i = 0; i < ServerNoteArray.length; i++) // find the match
  {
    if(ServerNoteArray[i].data === title){
      ServerNoteArray.splice(i,1);  // remove object from array
    found = true;
    break;
    }
  }
  if (!found) {
    console.log("not found");
    return res.status(500).json({
    status: "error"
    });
  } else {
    res.send('Note ' + title + ' deleted!');
  }
});

module.exports = router;