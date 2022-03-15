let noteArray = [];

// define a constructor to create note objects, data = game name, type = game status
let GameObject = function (pData, pType) {
    this.data = pData;
    this.type = pType;
}


document.addEventListener("DOMContentLoaded", function (event) {
    
    // button add
    document.getElementById("buttonAdd").addEventListener("click", function () {

        let newGame = new GameObject(document.getElementById("game").value, selectedType)
        
        //sends object saved in newGame to ServerNoteArray
        $.ajax({
            url : "/AddGame",
            type: "POST",
            data: JSON.stringify(newGame),
            contentType: "application/json; charset=utf-8",
             success: function (result) {
                console.log(result);
            }
        });
    });

    $(document).bind("change", "#select-type", function (event, ui) {
        selectedType = document.getElementById("select-type").value;
    });

    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#add", function (event) {   
        createList("All", "contentAll");
    }); 
    $(document).on("pagebeforeshow", "#listCurrent", function (event) {   
        createList("Current", "contentCurrent");
    });     
    $(document).on("pagebeforeshow", "#listFinished", function (event) {   
        createList("Finished", "contentFinished");
    }); 

    $(document).on("pagebeforeshow", "#listDropped", function (event) {   
        createList("Dropped", "contentDropped");
    });  
});

function createList(displayStatus, whichList) {
        //updates local notesArray of server's data
        $.get("/getAllGames", function(data, status){  // AJAX get
            noteArray = data;  // GETS ServerNoteArray and adds it to local noteArray


        // clear prior data
        let myul = document.getElementById(whichList);
        myul.innerHTML = '';

        noteArray.forEach(function (element,) {   // use handy array forEach method
            if (element.type == displayStatus) {
                let li = document.createElement('li');
                li.innerHTML = element.data + ":  " + element.type;
                myul.appendChild(li);
            } else if (displayStatus == "All") {
                let li = document.createElement('li');
                li.innerHTML = element.data + ":  " + element.type;
                myul.appendChild(li);
                addDelButton(li, element.data);
            }
        });
    });
}

function addDelButton(parent, gameName) {
    let buttonElem = parent.appendChild(document.createElement("button"));
    buttonElem.setAttribute("id", + "deleteItem");
    buttonElem.innerHTML = "Delete";
    buttonElem.onclick = function() {
        let answer = confirm("Are you sure you want to delete this entry?");
        if (answer) {
            this.parentElement.remove();
            //Delete entry from server DB
            let which = gameName;
            $.ajax({
                type: "DELETE",
                url: "/DelGame/" +which,
                success: function(result){
                    alert(result);
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert("Server could not delete Note with title " + which)
                }
                });
        }
    }
}