window.onload = function () {
	sendGetRequest();
	  autocomplete(document.getElementById("myInput"));
}

function sendGetRequest()
  {
	  varAutopopulateData = [];
     let request = new XMLHttpRequest();
     request.open('GET', 'http://localhost:8080/list', true);
     request.onload = function () { autopopulateData = JSON.parse( this.responseText)["_embedded"]["list"];
	 for(let i=0;i<autopopulateData.length;i++){
		 varAutopopulateData.push(autopopulateData[i].item);
	 }
	 Showlist();}
     request.send();
  }

  function AddItemInList()
    {
        let request = new XMLHttpRequest();
       request.open('POST', 'http://localhost:8080/list', true);
       request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
       let item = document.getElementById("myInput").value;
            varAutopopulateData.push(item);
           let obj={"item":item};
           request.send(JSON.stringify(obj));
           request.onload = function () { sendGetRequest();}
   }

   function DeleteItemInList(el){
	   let item = el.parentNode.previousSibling.innerHTML;
	   let request = new XMLHttpRequest();
	   request.open('GET', 'http://localhost:8080/list', true);
	   request.send();
       request.onload = function () {
		autopopulateData = JSON.parse( this.responseText)["_embedded"]["list"];
		url = null
		for(x of autopopulateData){
			if(x.item == item){
				url = x['_links']['self']['href'];
				break;
			}
		}
		request.open('DELETE', url, true);
       varAutopopulateData.splice(Number(el.className),1);
       request.send();
       request.onload = function () { sendGetRequest()};
	   };
       
   }

function Showlist() {
	let element = document.getElementById("todo");
	SetClassNameSelected(element);
	OnClickHide();
	document.getElementById("search-container").style.display = "block";
	let html = `<table><tr>`;
	for (let i = 0; i < varAutopopulateData.length; i++) {
		html += `<td id="${i}">${varAutopopulateData[i]}</td>`;
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

var itemPreviousValue = "";

function EditItemInList(el){
	itemPreviousValue = el.parentNode.previousSibling.innerHTML;
	console.log(itemPreviousValue);
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
}


var url="";
function UpdateList(index){
    // let request = new XMLHttpRequest();
    // request.open('PUT', 'http://localhost:8080/update/'+index, true);

	let classValue = "changeListItem"+index;

	let inputText = document.getElementsByClassName(classValue)[0];
	item = inputText.value;
	console.log(item);
	if(SearchInList(item,index)){
		varAutopopulateData[index]= item;
		console.log(varAutopopulateData[index]);
	   let request = new XMLHttpRequest();
	   request.open('GET', 'http://localhost:8080/list', true);
	   request.send();
	   let url1='';
       request.onload = function () {
		autopopulateData = JSON.parse( this.responseText)["_embedded"]["list"];
		for(x of autopopulateData){
			if(x.item == itemPreviousValue){
				url1 = x['_links']['self']['href'];
				break;
			}
		}
		url = url1;
		console.log(url);
	   };
	   console.log(url);
	   console.log(item);
       request.open('PUT', url, true);
       let obj={"item":item};
       console.log(JSON.stringify(obj));
       request.send(JSON.stringify(obj));
       request.onload = function () { sendGetRequest()};
	}
	else{
	    alert("Item name already present");
	}

}

function CancelUpdate(index){
	let classValue = "changeListItem"+index;
	console.log(classValue);
	let tableCell = document.getElementById(index);
	tableCell.innerHTML='';
	html = `<td id="${index}">${varAutopopulateData[index]}</td>`;
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
	for(let index=0;index<varAutopopulateData.length;index++){
		if(varAutopopulateData[index]==itemListValue && index!=Number(dataIndex)){
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
        for (i = 0; i < varAutopopulateData.length; i++) {
          if (varAutopopulateData[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + varAutopopulateData[i].substr(0, val.length) + "</strong>";
            b.innerHTML += varAutopopulateData[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + varAutopopulateData[i] + "'>";
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
    text = document.getElementById("myInput").value;
    request.open('GET', 'http://localhost:8080/search/'+text, true);
    request.onload = function () { varAutopopulateData = [""+JSON.parse( this.responseText)[0]["item"]];
    console.log(varAutopopulateData);
    Showlist();}
    request.send();
  }

