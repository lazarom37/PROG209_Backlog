let noteArray = [];
let tempArray = [];
let selectedType = "";

// define a constructor to create note objects
let GameObject = function (pData, pType) {
    this.data = pData;
    this.type = pType;
}



document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("buttonAdd").addEventListener("click", function () {

        noteArray.push(new GameObject(document.getElementById("game").value, selectedType));
        console.log(noteArray);
        document.getElementById("game").value = "";
    });

    $(document).bind("change", "#select-type", function (event, ui) {
        selectedType = document.getElementById("select-type").value;
    });

    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#listCurrent", function (event) {   
        createList("Current"); //Properly shows "Currently playing" titles as intended
    }); 

    
    $(document).on("pagebeforeshow", "#listFinished", function (event) {   
        createList("Finished"); //Flashes on screen the entries for "Finished games" titles, disappears quickly
        //At the very least flashes the proper entries labeled as "Finished"
    }); 

    $(document).on("pagebeforeshow", "#listDropped", function (event) {   
        createList("Dropped"); //Simply doesn't show anything
    }); 
    
});



function createList(displayStatus) {
    
    // clear prior data

    let myul = document.getElementById("myList");
    myul.innerHTML = '';

    noteArray.forEach(function (element,) {   // use handy array forEach method
        if (element.type == displayStatus){
            let li = document.createElement('li');
            li.innerHTML = element.data + ":  " + element.type;
            myul.appendChild(li);
        }
    });

    displayStatus = "";
};

//Future notes
        //Need to find out how to let user change status of a specific item.
        //Add a drop down menu and select?
        //Have a dedicated "save changes" button that updates array and creates list again

//Trashed ideas/code that I will keep here just in caseyhyu
        //Push all items from tempArray into noteArray
        //foreach item in noteArray
        //  if item element.type (the game status) != displayStatus
        //      push item to tempArray

        /* THIS IS BEGINNING OF CODE
        noteArray.forEach(function (element, ) {
            if (element.type !== displayStatus) {
                tempArray.push(element);
            }
        });
        THIS IS END OF CODE */