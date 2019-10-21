/*Copyright Sir Code 2019 on Codepen.io*/
$(document).ready(function () {
    var savesbtn = document.getElementById("saveBtn");

    //FILL TEXT AREAS WITH NOTES
    for (var i = 1; i < 11; i++) {
      $("#pg" + i).val(localStorage.getItem("note" + i));
    }

    function saveNotes() {
      //Change styles of button
      $("#saveBtn").removeClass("nSav").addClass("Sav");
      // Save data to localstorage
      for (var i = 1; i < 11; i++) {
        localStorage.setItem("note" + i, $("#pg" + i).val());
      }
    };
    savesbtn.addEventListener("click", saveNotes);
});