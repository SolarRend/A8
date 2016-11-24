/*
 * Author: Joshua Rodriguez
 * Contact: joshua_rodriguez@student.uml.edu
 * UMass Lowell student in GUI Programming 1 
 * Date Created: 11.02.2016
 * used to to display a multiplication table on index.html
 * given the input in the text fields and sliders
 * 
 * ** UPDATE** added jquery validation plugin functionality
 * ** UPDATE ** added jquery sliders and tab functionality
 */

$(document).ready(function () {

   // setting tab layout
   $(".tableContent").tabs();


   // disabling pop up windows for right clicking 
   // because the program uses right click to delete individual tabs
   // code source: http://stackoverflow.com/questions/29963828/how-to-forbid-opening-jquery-ui-tab-content-in-a-new-window
   $(".tableContent").bind("contextmenu", function () {
      return false;
   });

   /**
    * takes input from a form and generates a multipliction table
    */
   function generateTable() {


      // clearing previous table everytime generate button is clicked
      $("#currentTable").empty();

      // gathering all input
      var multiplierOne = document.getElementsByName("multiplierFrom")[0];
      var multiplierTwo = document.getElementsByName("multiplierTo")[0];
      var multiplicandOne = document.getElementsByName("multiplicandFrom")[0];
      var multiplicandTwo = document.getElementsByName("multiplicandTo")[0];

      /*
       // **Bad input checking**
       
       // Checking for missing inputs
       if (multiplierOne.value === "" || multiplierTwo.value === "" ||
       multiplicandOne.value === "" || multiplicandTwo.value === "") {
       console.log("Missing input");
       alert("Please fill in all fields.");
       return;
       }
       
       // Checking if multiplier interval is reversed
       if (Number(multiplierOne.value) > Number(multiplierTwo.value)) {
       alert("Please make sure 'Multipliers From' is not greater than 'Multipliers To'");
       return;
       }
       
       // Checking if multiplicand interval is reversed
       if (Number(multiplicandOne.value) > Number(multiplicandTwo.value)) {
       alert("Please make sure 'Multiplicands From' is not greater than 'Multiplicands To'");
       return;
       }
       
       // checking if there are any strings
       if (isNaN(Number(multiplicandOne.value)) || isNaN(Number(multiplicandTwo.value))
       || isNaN(Number(multiplierOne.value)) || isNaN(Number(multiplierTwo.value))) {
       alert("Please make sure there are only integers entered.");
       return;
       }
       
       // checking for whole integers
       if (Number(multiplicandOne.value) % 1 !== 0 || Number(multiplicandTwo.value) % 1 !== 0
       || Number(multiplierOne.value) % 1 !== 0 || Number(multiplierTwo.value) % 1 !== 0) {
       alert("Please make sure there are no decimals.");
       return;
       } 
       // ** End bad input checking **
       */


      //creating two arrays for the intervals
      var multipliers = [];
      var multiplicands = [];


      /* 
       * loops to gather all numbers and in the interval and populate
       * the respective arrays 
       */

      //multipliers population
      for (var i = Number(multiplierOne.value); i <= multiplierTwo.value; i++) {
         multipliers.push(i);
      }

      //multiplicands population
      for (var i = Number(multiplicandOne.value); i <= multiplicandTwo.value; i++) {
         multiplicands.push(i);
      }

      //console.log(multipliers);
      //console.log(multiplicands);

      // creating table element and table body element
      var tableElem = document.createElement("table");
      var tbodyElem = document.createElement("tbody");

      // looping through arrays to create each row of a table at a time
      for (var j = 0; j < multiplicands.length + 1; j++) {

         // current row element
         var trElem = document.createElement("tr");

         for (var i = 0; i < multipliers.length + 1; i++) {

            if (j === 0 && i === 0) {

               // multiplication symbol cell at coordinate (0,0)
               var tdElem = document.createElement("td");
               tdElem.appendChild(document.createTextNode("x"));
               tdElem.className = "tableHeaders";
               trElem.appendChild(tdElem);

            } else if (j === 0 & i !== 0) {

               // multipliers row special case
               var tdElem = document.createElement("td");
               tdElem.appendChild(document.createTextNode(multipliers[i - 1]));
               tdElem.className = "tableHeaders";
               trElem.appendChild(tdElem);

            } else if (j !== 0 & i === 0) {

               // multiplicands column special case
               var tdElem = document.createElement("td");
               tdElem.className = "tableHeaders";
               tdElem.appendChild(document.createTextNode(multiplicands[j - 1]));
               trElem.appendChild(tdElem);

            } else {

               // regular cell in row
               var tdElem = document.createElement("td");
               tdElem.appendChild(document.createTextNode((multiplicands[j - 1] * multipliers[i - 1])));
               trElem.appendChild(tdElem);
               //console.log(multiplicands[j]*multipliers[i]);
            }

         }

         //adding row to body element
         tbodyElem.appendChild(trElem);
      }

      //adding body to table
      tableElem.appendChild(tbodyElem);

      // setting table className
      tableElem.className = "multTable";

      // giving id to current table;
      tableElem.id = "currentTableID";

      // displaying table by appending it to structure skeleton in html
      var table = document.getElementById("currentTable");
      table.appendChild(tableElem);


      /*
       console.log(multiplierOne.value);
       console.log(multiplierTwo.value);
       console.log(multiplicandOne.value);
       console.log(multiplicandTwo.value);
       */

   }


// ** Validation - added in A7 **


   // custom validation rules

   // Checking if interval is reversed
   function isMultiplierOneGreater(value, element) {

      if (value > Number($("#two").val())) {
         return false;
      }
      return true;

   }

   // Checking if interval is reversed
   function isMultiplicandOneGreater(value, element) {

      if (value > Number($("#four").val())) {
         return false;
      }
      return true;

   }

   // adding rules
   jQuery.validator.addMethod("isMultiplierOneGreater", isMultiplierOneGreater);
   jQuery.validator.addMethod("isMultiplicandOneGreater", isMultiplicandOneGreater);

   // Validation method
   $("#tableForm").validate({
      // Placing Error messages next to form input label
      errorPlacement: function (error, element) {

         var nameOfInput = element.attr("name");

         if (nameOfInput === "multiplierFrom") {
            error.insertBefore(element);
         }
         if (nameOfInput === "multiplierTo") {
            error.insertBefore(element);
         }
         if (nameOfInput === "multiplicandFrom") {
            error.insertBefore(element);
         }
         if (nameOfInput === "multiplicandTo") {
            error.insertBefore(element);
         }

      },
      // rules of each form
      rules: {
         // multiplierFrom input rules
         multiplierFrom: {
            required: true,
            isMultiplierOneGreater: true,
            digits: true
         },
         // multiplierTo input rules
         multiplierTo: {
            required: true,
            digits: true
         },
         // multiplicandFrom input rules
         multiplicandFrom: {
            required: true,
            isMultiplicandOneGreater: true,
            digits: true
         },
         // multiplicandTo input rules
         multiplicandTo: {
            required: true,
            digits: true
         }
      },
      // error messages to be displayed 
      messages: {
         // multiplierFrom input messages
         multiplierFrom: {
            required: "Please fill.",
            isMultiplierOneGreater: "Can't be larger than Multipliers To",
            digits: "Must be a whole non-negative number"
         },
         // multiplierTo input messages
         multiplierTo: {
            required: "Please fill.",
            digits: "Must be a whole non-negative number"
         },
         // multiplicandFrom input messages
         multiplicandFrom: {
            required: "Please fill.",
            isMultiplicandOneGreater: "Can't be larger than Multiplicands To",
            digits: "Must be a whole non-negative number"
         },
         // multiplicandTo input messages
         multiplicandTo: {
            required: "Please fill.",
            digits: "Must be a whole non-negative number"
         }
      }
   });


   // ** Added in A8 - Sliders & Tabs **
   // 
   // Making four sliders for each endpoint on the intervals
   $("#sliderFromFact1").slider({
      max: 20,
      min: 0,
      slide: function (event, ui) {
         //setting input to slider value
         $("#one").val(ui.value);

         // testing validity to see if a new table should be generated
         dispatch();
      }
   });

   $("#sliderToFact1").slider({
      max: 20,
      min: 0,
      slide: function (event, ui) {
         //setting input to slider value
         $("#two").val(ui.value);

         // testing validity to see if a new table should be generated
         dispatch();
      }
   });

   $("#sliderFromFact2").slider({
      max: 12,
      min: 0,
      slide: function (event, ui) {
         //setting input to slider value
         $("#three").val(ui.value);

         // testing validity to see if a new table should be generated
         dispatch();
      }
   });

   $("#sliderToFact2").slider({
      max: 12,
      min: 0,
      slide: function (event, ui) {
         //setting input to slider value
         $("#four").val(ui.value);

         // testing validity to see if a new table should be generated
         dispatch();
      }
   });


   // binding inputs to corresponding sliders by using the on method
   // original source: http://stackoverflow.com/questions/19152452/jquery-ui-slider-change-automatically-on-manual-input

   $("#one").on("keyup", function (e) {

      // value is not entered or value is less than 0, 
      // so set slider to 0
      if (this.value === "" || this.value < 0) {

         $("#sliderFromFact1").slider("value", 0);

      } else if (this.value > 20) {

         // value is too high so set slider to max
         $("#sliderFromFact1").slider("value", 20);

      } else {

         // change slider value to corresponding input value
         $("#sliderFromFact1").slider("value", this.value);
      }
      // check to see if table should be generated on each key press
      dispatch();
   });

   $("#two").on("keyup", function (e) {

      // value is not entered or value is less than 0, 
      // so set slider to 0
      if (this.value === "" || this.value < 0) {

         $("#sliderToFact1").slider("value", 0);

      } else if (this.value > 20) {

         // value is too high so set slider to max
         $("#sliderToFact1").slider("value", 20);

      } else {

         // change slider value to corresponding input value
         $("#sliderToFact1").slider("value", this.value);
      }
      // check to see if table should be generated on each key press
      dispatch();
   });

   $("#three").on("keyup", function (e) {

      // value is not entered or value is less than 0, 
      // so set slider to 0
      if (this.value === "" || this.value < 0) {

         $("#sliderFromFact2").slider("value", 0);

      } else if (this.value > 12) {

         // value is too high so set slider to max
         $("#sliderFromFact2").slider("value", 12);

      } else {

         // change slider value to corresponding input value
         $("#sliderFromFact2").slider("value", this.value);
      }
      // check to see if table should be generated on each key press
      dispatch();
   });

   $("#four").on("keyup", function (e) {

      // value is not entered or value is less than 0, 
      // so set slider to 0
      if (this.value === "" || this.value < 0) {

         $("#sliderToFact2").slider("value", 0);

      } else if (this.value > 12) {

         // value is too high so set slider to max
         $("#sliderToFact2").slider("value", 12);

      } else {

         // change slider value to corresponding input value
         $("#sliderToFact2").slider("value", this.value);
      }
      // check to see if table should be generated on each key press
      dispatch();
   });


   /**
    * function for determining if form is valid to generate a new table
    */
   function dispatch() {

      // disabling button submitting if form is not valid
      // code source: http://stackoverflow.com/questions/21953694/enabling-disabled-button-after-successful-jquery-validation
      if ($('#tableForm').valid()) {
         generateTable();
         $('#save').prop('disabled', false);
      } else {
         $('#save').prop('disabled', 'disabled');
      }
   }

   /**
    * 
    * sets table inputs and sliders to zero
    */
   function defaultValues() {
      $("#sliderToFact2").slider("value", 0);
      $("#sliderFromFact2").slider("value", 0);
      $("#sliderToFact1").slider("value", 0);
      $("#sliderFromFact1").slider("value", 0);
      $("#one").val(0);
      $("#two").val(0);
      $("#three").val(0);
      $("#four").val(0);
      generateTable();
   }

   // gives unique IDs to tables
   var idOfTable = 0;

   // list of "delete-highlighted tabs"
   var deleteList = [];

   /**
    * saves current generated table into a tab
    */
   function saveTable() {

      //getting parameter title for new tab
      var tabTitle = ("X-axis: " + $("#one").val() + " - " + $("#two").val()
              + ", Y-axis " + $("#three").val() + " - " + $("#four").val());

      // creating list item for tab
      var listItem = "<li id=" + idOfTable + "><a href=#" + (idOfTable + 1) + ">" +
              tabTitle + "</a></li>";

      // creating new div that contains table
      var $divForTable = $("<div>", {
         id: String(idOfTable + 1)
      });

      // putting table into new div
      $divForTable.append($("#currentTableID"));

      // setting div in tab collection
      $(".tableContent").append($divForTable);

      // setting tab list item
      $(".tableContent > ul").append(listItem);

      // setting right click to highlight a tab for deletion
      $("#" + idOfTable).bind("mousedown", function (event) {
         // 3 indicates right click
         if (event.which === 3) {
            $(this).css({
               background: "red"
            });
            deleteList.push($(this));
         }
      });

      // displaying new tab
      $(".tableContent").tabs("refresh");

      // incremementing IDs to keep them unique
      idOfTable = idOfTable + 2;

      // reset table
      defaultValues();
   }

   // adding clickable action to generate table button
   saveButton = document.getElementById("save");
   saveButton.addEventListener("click", saveTable);

   /**
    * removes all tabs contained in deleteList[]
    */
   function deleteSelectedTables() {

      //safe check for when no tabs have been highlighted
      if (deleteList.length !== 0) {

         for (var i = 0; i < deleteList.length; i++) {
            deleteList[i].remove();
         }

         deleteList = [];
      }

   }

   // adding clickable action to delete button
   deleteButton = document.getElementById("delete");
   deleteButton.addEventListener("click", deleteSelectedTables);

   // set default table
   defaultValues();
});