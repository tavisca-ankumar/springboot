window.onload = function () {
	sendGetRequest();
	  autocomplete(document.getElementById("myInput"));
}

function sendGetRequest()
  {
     let request = new XMLHttpRequest();
     request.open('GET', 'http://localhost:8080/', true);
     request.onload = function () { varAutopopulateData = JSON.parse( this.responseText);
     Showlist();}
     request.send();
  }

  function AddItemInList()
    {
        let request = new XMLHttpRequest();
       request.open('POST', 'http://localhost:8080/add', true);
       request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
       let item = document.getElementById("myInput").value;
            varAutopopulateData.data.push(item);
           let obj={"todoname":item};
           request.send(JSON.stringify(obj));
           request.onload = function () { Showlist()};
   }

   function DeleteItemInList(el){
       let request = new XMLHttpRequest();
       request.open('DELETE', 'http://localhost:8080/delete/'+Number(el.className), true);
       varAutopopulateData.data.splice(Number(el.className),1);
       request.send();
       request.onload = function () { Showlist()};
   }

function Showlist() {
	let element = document.getElementById("todo");
	SetClassNameSelected(element);
	OnClickHide();
	document.getElementById("search-container").style.display = "block";
	let html = `<table><tr>`;
	for (let i = 0; i < varAutopopulateData.data.length; i++) {
		html += `<td id="${i}">${varAutopopulateData.data[i]}</td>`;
		html += `<td id="btn${i}">
		<button type="button" onclick="EditItemInList(this)" class=${i}>EDIT</button>
		<button type="button" onclick="DeleteItemInList(this)" class=${i}>DELETE</button>
		</td>`;
		html += "</tr><tr>";
	}
	html += "</tr></table>";
	document.getElementById("todo-container").innerHTML = html;
}

function OnClickHide() {
	var menuItemsArray = document.getElementsByClassName("menu-item");
	for (var i = 0; i < menuItemsArray.length; i++) {
		if (menuItemsArray[i].firstChild.className == "selected") {
			document.getElementById(menuItemsArray[i].id + "-container").style.display = "block";
		}
		else {
			document.getElementById(menuItemsArray[i].id + "-container").style.display = "none";
		}
	}
}

function ShowUserDetails() {
	let element = document.getElementById("user");
	SetClassNameSelected(element);
	OnClickHide();
	document.getElementById("search-container").style.display = "none";
	let html = "<h4>Hi I am anoop</h4>";
	document.getElementById("user-container").innerHTML = html;
}

function ShowDeptDetails() {
	SetClassNameSelected(document.getElementById("dept"));
	OnClickHide();
	document.getElementById("search-container").style.display = "none";
	let html = "<h4>Computer Science department</h4>";
	document.getElementById("dept-container").innerHTML = html;
}

function SetClassNameSelected(element) {
	var menuItemsArray = document.getElementsByClassName("menu-item");
	for (var i = 0; i < menuItemsArray.length; i++) {
		if (menuItemsArray[i].firstChild.className == "selected") {
			menuItemsArray[i].firstChild.classList.remove("selected");
		}
	}
	element.firstChild.className = "selected";
}


function EditItemInList(el){

	let tableCell = document.getElementById(el.className);
	let tableButton = document.getElementById("btn"+el.className);
	let inputUpdateBtn = document.createElement('button');
	let inputCancelBtn = document.createElement('button');
	inputUpdateBtn.setAttribute('onclick','UpdateList('+el.className+')');
	inputCancelBtn.setAttribute('onclick','CancelUpdate('+el.className+')');
	inputCancelBtn.id = "cancel";
	inputUpdateBtn.id="update";
	inputUpdateBtn.innerHTML = "UPDATE";
	inputCancelBtn.innerHTML = "CANCEL";
	tableButton.innerHTML = '';
	tableButton.appendChild(inputUpdateBtn);
	tableButton.appendChild(inputCancelBtn);
	let input = document.createElement('input');
	input.type = "text";
	input.value = tableCell.textContent;
	input.className = "changeListItem"+el.className;
	tableCell.innerHTML = '';
  	tableCell.appendChild(input);
	  input.focus();
	  console.log(document.getElementsByClassName(input.className));
}

function UpdateList(index){
    let request = new XMLHttpRequest();
    request.open('PUT', 'http://localhost:8080/update/'+index, true);

	let classValue = "changeListItem"+index;

	let inputText = document.getElementsByClassName(classValue)[0];
	itemListValue = inputText.value;
	if(SearchInList(itemListValue,index)){
		varAutopopulateData.data[index]= itemListValue;
		let tableCell = document.getElementById(index);
		tableCell.innerHTML='';
		html = `<td id="${index}">${varAutopopulateData.data[index]}</td>`;
		tableCell.innerHTML=html;
		let buttonCell = document.getElementById("btn"+index);
		buttonCell.innerHTML='';
		html = `<td id="btn${index}">
		<button type="button" onclick="EditItemInList(this)" class=${index}>EDIT</button>
		<button type="button" onclick="DeleteItemInList(this)" class=${index}>DELETE</button>
		</td>`;
		buttonCell.innerHTML=html;
		let obj={"todoname":itemListValue};
        request.send(JSON.stringify(obj));
        request.onload = function () { Showlist()};
	}
}

function CancelUpdate(index){
	let classValue = "changeListItem"+index;
	console.log(classValue);
	let tableCell = document.getElementById(index);
	tableCell.innerHTML='';
	html = `<td id="${index}">${varAutopopulateData.data[index]}</td>`;
	tableCell.innerHTML=html;
	let buttonCell = document.getElementById("btn"+index);
	buttonCell.innerHTML='';
	html = `<td id="btn${index}">
	<button type="button" onclick="EditItemInList(this)" class=${index}>EDIT</button>
	<button type="button" onclick="DeleteItemInList(this)" class=${index}>DELETE</button>
	</td>`;
	buttonCell.innerHTML=html;
}

function SearchInList(itemListValue,dataIndex){
	for(let index=0;index<varAutopopulateData.data.length;index++){
		if(varAutopopulateData.data[index]==itemListValue && index!=Number(dataIndex)){
			return false;
		}
	}
	return true;
}

/***********************************Search functionality with auto complete**************************************/


function autocomplete(inp) {
   var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < varAutopopulateData.data.length; i++) {
          if (varAutopopulateData.data[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + varAutopopulateData.data[i].substr(0, val.length) + "</strong>";
            b.innerHTML += varAutopopulateData.data[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + varAutopopulateData.data[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
               closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
         currentFocus++;
         addActive(x);
        } else if (e.keyCode == 38) { //up
         currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });

    function addActive(x) {
       if (!x) return false;
     removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

  }


  function ShowItemInList(){
    let request = new XMLHttpRequest();
    console.log(document.getElementById("myInput").value);
    request.open('GET', 'http://localhost:8080/search/'+document.getElementById("myInput").value, true);
    request.onload = function () { varAutopopulateData = JSON.parse( this.responseText);
    Showlist();}
    request.send();
  }

