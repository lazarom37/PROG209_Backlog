let noteArray = [];

// define a constructor to create note objects, data = game name, type = game status
let GameObject = function (pData, pType) {
    this.data = pData;
    this.type = pType;
}


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("buttonAdd").addEventListener("click", function () {

        noteArray.push(new GameObject(document.getElementById("game").value, selectedType));
        document.getElementById("game").value = "";
        console.log(noteArray);
    });

    $(document).bind("change", "#select-type", function (event, ui) {
        selectedType = document.getElementById("select-type").value;
    });

    // page before show code *************************************************************************
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
        //update local array from server
        $.get("/getAllGames", function(data, status){  // AJAX get
            noteArray = data;  // put the returned server json data into our local array

        // clear prior data
        let myul = document.getElementById(whichList);
        myul.innerHTML = '';

        noteArray.forEach(function (element,) {   // use handy array forEach method
            if (element.type == displayStatus) {
                let li = document.createElement('li');
                li.innerHTML = element.data + ":  " + element.type;
                myul.appendChild(li);
            }
        });
    });
};