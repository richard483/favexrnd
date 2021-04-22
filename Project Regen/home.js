var selectedRow = null;

var currGudang = 0;
var maxRowLength = 10;

var maxPage = [];
maxPage[0] = document.getElementsByClassName("list").length;
maxPage[1] = document.getElementsByClassName("list2").length;
var currPage = [1,1];

var rightArrow = document.getElementById("right-arrow");
var leftArrow = document.getElementById("left-arrow");
var page = document.getElementById("current-page");
var pageList = [];
pageList[0] = document.getElementsByClassName("list");
pageList[1] = document.getElementsByClassName("list2");

function updateTable(){
    for(var i = 0 ; i < pageList[currGudang].length; i++){
        pageList[currGudang][i].classList.remove('input');
    }
    for(var i = 0 ; i < pageList[currGudang].length; i++){
        if(pageList[currGudang][i].tBodies[0].rows.length < maxRowLength){
            pageList[currGudang][i].classList.add('input');
            break;
        }
    }
}

function onFormSubmit(e){
    e.preventDefault();
    updateTable();

    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }else{
        updateRecord(formData)
    }
    resetForm();
    hideInsertTable();
}

function readFormData(){
    var formData = {};
    formData["namaBarang"] = document.getElementById("namaBarang").value;
    formData["jmlBarang"] = document.getElementById("jmlBarang").value;
    formData["lokasi"] = document.getElementById("lokasi").value;
    formData["gbrBarang"] = document.getElementById("gbrBarang").value;
    return formData;
}

// Create operation
function insertNewRecord(data){
    var table = document.querySelector(".active .input").getElementsByTagName('tbody')[0];
    var img = document.createElement('img');
    img.src = data.gbrBarang.replace("C:\\fakepath\\", "file://");
    img.alt = data.namaBarang;
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.namaBarang;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.jmlBarang;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.lokasi;
    var cell4 = newRow.insertCell(3);
    cell4.appendChild(img);
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a href="#" onClick="onEdit(this); showInsertTable();">Edit</a>
    <a href="#" onClick='onDelete(this)'>Delete</a>`;
}

function resetForm(){
    document.getElementById('namaBarang').value = '';
    document.getElementById('jmlBarang').value = '';
    document.getElementById('lokasi').value = '';
    document.getElementById('gbrBarang').value = '';
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('namaBarang').value = selectedRow.cells[0].innerHTML;
    document.getElementById('jmlBarang').value = selectedRow.cells[1].innerHTML;
    document.getElementById('lokasi').value = selectedRow.cells[2].innerHTML;
    document.getElementById('gbrBarang').value = selectedRow.cells[3].getElementsByTagName('img').src;
}
function updateRecord(formData){
    var img = selectedRow.cells[3].getElementsByTagName('img');
    img.alt = formData.namaBarang;
    selectedRow.cells[0].innerHTML = formData.namaBarang;
    selectedRow.cells[1].innerHTML = formData.jmlBarang;
    selectedRow.cells[2].innerHTML = formData.lokasi;
    img.src = formData.gbrBarang;
}
function onDelete(td){
    if(confirm('Are you sure you want to delete this record?')){
        row = td.parentElement.parentElement;
        document.querySelector(".active .current").deleteRow(row.rowIndex);
        resetForm();
    }    
}

var insertTable = document.getElementById("insert");

function showInsertTable(){
    insertTable.style.display = "flex";
}

function hideInsertTable(){
    insertTable.style.display = "none";
}

leftArrow.style.display = "none";
var updatePage = function(){
    page.innerHTML = "Page " + currPage[currGudang];
    if(currPage[currGudang] <= 1){
        leftArrow.style.display = "none";
    }
    else{
        leftArrow.style.display = "block";
    }
    
    if(currPage[currGudang] >= maxPage[currGudang]){
        rightArrow.style.display = "none";
    }
    else{
        rightArrow.style.display = "block";
    }
    for(var i = 0; i < maxPage[currGudang]; i++){
        if(i+1 == currPage[currGudang]){
            pageList[currGudang][i].classList.add("current");
        }
        else{
            pageList[currGudang][i].classList.remove("current");
        }
    }
}

rightArrow.addEventListener("click", function(){
    currPage[currGudang]++;
    updatePage();
});

leftArrow.addEventListener("click", function(){
    currPage[currGudang]--;
    updatePage();
});

var gudangButton = document.getElementsByClassName("dropdown-item");
var gudang = document.getElementsByClassName("gudang");

var removeSelectedClass = function(){
    for(var i = 0; i <  gudangButton.length ; i++){
        gudangButton[i].classList.remove('active');
    }
}

var loadGudang = function(){
    removeSelectedClass();
    this.classList.add('active');
    for(var i = 0 ; i < gudangButton.length ; i++){
        if(gudangButton[i].classList.contains('active')){
            gudang[i].classList.add('active');
            currGudang = i;
        }
        else{
            gudang[i].classList.remove('active');
        }
    }
    updatePage();
}

for (var i = 0; i < gudangButton.length; i++) {
    gudangButton[i].addEventListener("click",loadGudang);
}
