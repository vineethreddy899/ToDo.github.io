function getandupdate(){
    console.log("Updating Lists...");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();
}
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    // populating to table
    let tablebody = document.getElementById("tablebody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn" onclick="deleted(${index})">Delete</button></td>
        </tr>`;
    });
    tablebody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getandupdate)
update();
function deleted(itemindex){
    console.log("delete",itemindex);
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // deletind the item
    itemJsonArray.splice(itemindex,1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

function clearstorage(){
    if (confirm("Do you really want to clear all?")) {
        console.log('Clearing storage...');
        localStorage.clear();
        update();
    }
}

const searchFun= ()=>{
    let filter = document.getElementById('myinput').value.toUpperCase();
    let myTable =document.getElementById('myTable');
    let tr = myTable.getElementsByTagName('tr');
    for (var i = 0;i < tr.length;i++) {
       let td =tr[i].getElementsByTagName('td')[0];

       if (td) {
           let textvalue = td.textContent || td.innerHTML;

           if (textvalue.toUpperCase().indexOf(filter)>-1) {
               tr[i].style.display="";
           }else{
               tr[i].style.display="none";
           }
       }
        
    }
}