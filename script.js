document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
  var docBod = document.getElementById('docBod');  //Obtain the body
  var docHead = document.getElementById('docHead');
  var f = 1;    //First page
  loadJson(docHead,docBod,f);

  //Next button
  document.getElementById('next').addEventListener('click', function(event){
    if (f < 7) {
      docHead.innerHTML = ""
      docBod.innerHTML = "";    //Reload body
      f++;    //Increase page
      loadJson(docHead,docBod, f);

    }
  });

  //Previous button
  document.getElementById('prev').addEventListener('click', function(event){
    if (f > 1) {
      docHead.innerHTML = ""
      docBod.innerHTML = "";
      f--;    //Decrease page
      loadJson(docHead,docBod,f);
    }
  });
}


function loadJson( docHead,docBod,  f){

  var planetHead = document.createElement('h3');
  docHead.appendChild(planetHead);
  planetHead.textContent = 'Planets Page - ' + f;   //f = page #

  var table = document.createElement("table");
	/*table.style.width = '50%';
	table.setAttribute('border', '1');
	table.setAttribute('cellspacing', '0');
	table.setAttribute('cellpadding', '5');*/

  var col = ["Name","Climate","Population","Movies"];

  // CREATE TABLE HEAD .
	var tHead = document.createElement("thead");


	// CREATE ROW FOR TABLE HEAD .
	var hRow = document.createElement("tr");

	// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
	for (var i = 0; i < (col.length); i++) {  //Sin contar Films
			var th = document.createElement("th");
			th.innerHTML = col[i];
			hRow.appendChild(th);
	}
	tHead.appendChild(hRow);
	table.appendChild(tHead);

  // CREATE TABLE BODY .
	var tBody = document.createElement("tbody");



  //Get API
  var req = new XMLHttpRequest();
  var URLhost = 'https://swapi.co/api/planets/?page=' + f;    //Depending of the page
  req.open('GET', URLhost, true);
  //Load JSON
  req.addEventListener('load', function() {
    //In case of an error
    if (req.status >= 200 && req.status < 400) {

      //Parse JSON to an object
      var response = JSON.parse(req.responseText);
      console.log(response);
      //Create heading
      /*
      var planetHead = document.createElement('h3');
      docBod.appendChild(planetHead);
      planetHead.textContent = 'Planets Page - ' + f;   //f = page #

      //Create ordered list
      var planetList = document.createElement('ol');
      planetHead.appendChild(planetList);
      */
      //let tbl = document.createElement("table");
      //tbl.createCaption().innerText = "Films";
      //let hdr=tbl.insertRow();
      //Obtain planets in that page
      for (var k = 0; k < response.results.length; k++) {
        (function(y) {
          //Create elements of the ordered list

          var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD
          /*for (var j = 0; j < col.length; j++) {
						var td = document.createElement("td");
            var obj = col[]
						td.innerHTML = response.result[y].;
						bRow.appendChild(td);
					}
          */
          var tname = document.createElement("td");
          tname.innerHTML = response.results[y].name;
          bRow.appendChild(tname);

          var tclimate = document.createElement("td");
          tclimate.innerHTML = response.results[y].climate;
          bRow.appendChild(tclimate);

          var tpopu = document.createElement("td");
          tpopu.innerHTML = response.results[y].population;
          bRow.appendChild(tpopu);

          var tmovies = document.createElement("td");
          /*
          var planetIn = document.createElement('li');
          planetIn.textContent = response.results[y].name;

          var climateHead = document.createElement('h6');
          climateHead.textContent = response.results[y].climate;

          var populationHead = document.createElement('h6');
          populationHead.textContent = response.results[y].population;

          planetIn.appendChild(climateHead);
          planetIn.appendChild(populationHead);
          */
          // ------------------- Access to another API ------------------------
          //Verify if the list is empty or not
          if (response.results[y].films.length > 0) {
            /*
            //Head
            var movieHead = document.createElement('h6');
            movieHead.textContent = 'Movie Appearances:';
            planetIn.appendChild(movieHead)
            */
            //Ordered list
            var movieList = document.createElement('ol');
            //movieHead.appendChild(movieList);
            tmovies.appendChild(movieList);
            //Go through the list of films
            for (var e = 0; e < response.results[y].films.length; e++) {
              (function(x) {
                //Access each API
                var newURLhost = response.results[y].films[x];
                var newReq = new XMLHttpRequest();
                newReq.open('GET', newURLhost, true);

                newReq.addEventListener('load', function(){
                  if(newReq.status >= 200 && newReq.status < 400){
                    var newResponse = JSON.parse(newReq.responseText);
                    //Get title of the film
                    var movie = document.createElement('li');
                    movie.textContent = newResponse.title;
                    movieList.appendChild(movie);

                  } else {
                    console.log("Error in network request: " + newReq.statusText);
                  }});
                newReq.send(null);
                event.preventDefault();
              })(e); //Close
            }

          }
          //planetList.appendChild(planetIn);
          bRow.appendChild(tmovies);
          tBody.appendChild(bRow);

        })(k);
      }
    } else {
      console.log('Error in network request: ' + req.statusText);
    }
  });
  table.appendChild(tBody);
  docBod.appendChild(table);
  req.send(null);
  event.preventDefault();
}
