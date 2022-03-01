let noteArray = [];

// define a constructor to create note objects
let GameObject = function (pData, pType) {
    this.data = pData;
    this.type = pType;
}

// Commented out as suggested by HW7's instructions [4]
//noteArray.push(new GameObject("Resident Evil (2002)", "Current"));
//noteArray.push(new GameObject("Elden Ring", "Current"));
//noteArray.push(new GameObject("Live A Live", "Current"));



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
        //At the very least flashes the proper entries labeled as "Finished" meaning that the if condition in createList() is working
    }); 

    $(document).on("pagebeforeshow", "#listDropped", function (event) {   
        createList("Dropped"); //Simply doesn't show anything
    }); 
    
});



function createList(displayStatus) {
        //update local array from server
        $.get("/getAllGames", function(data, status){  // AJAX get
            noteArray = data;  // put the returned server json data into our local array

        // clear prior data
        let myul = document.getElementById("myList");
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