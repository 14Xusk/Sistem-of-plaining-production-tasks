//Создать конструкторы для addrow(Colls) для спецификации ячеек. Данные ячейки необходимо сохранять с помощью localstorage.setItem("cell", JSON.stringyfity(cell)). Чтобы можно было сохранять ячейки, их значения и др. данные, представленные в cell конструктором.

function radiocheck(){
    var form = document.querySelector("form");
    var Data = new FormData(form);
    for (const entry of Data){
        return entry[1];
    }
};

function addrow(tblID ) {
    const tbl = document.getElementById(tblID) || document.querySelector("table");
    const tblBody = document.querySelector("tbody") || document.createElement("tbody");
    const row = document.createElement("tr");

    tbl.appendChild(tblBody);
    tblBody.appendChild(row);
};

function editCell(id) {
    let cellofEditing = document.getElementById(id);  // Editable cell ID
    document.getElementById(id).textContent = "de"; // New text of editable cell
    console.log(cellofEditing)
};
// Создаем новый элемент с указанным именем тега
function sales() {
    // Create constants from tags of table. Create constant to put our txt from form by itc-modal
    const tbl = document.getElementById("sales");
    const tblBody = tbl.querySelector("tbody") || document.createElement("tbody");
    const row = document.createElement("tr");
    
    // Create row(with 5 cels) for the table
    const cellDateofCreate = document.createElement("td");
    const cellIDSales = document.createElement("td");
    const cellClient = document.createElement("td");
    const cellManager = document.createElement("td");
    const cellSum = document.createElement("td");
    const cellDateofDispatch = document.createElement("td");
    const cellStatus = document.createElement("td");
        
    let counter = document.querySelectorAll("tr").length;
    cellDateofCreate.id = "cellDateofCreate" + counter;
    cellIDSales.id = "cIDSCounter" + counter;
    cellClient.id = "cellClient" + counter;
    cellManager.id = "cellManager" + counter;
    cellSum.id = "cellSum" + counter;
    var tableSales = {
        DateofCreate    : new Date(document.getElementById("DateofCreate").value || new Date()).toLocaleDateString(),
        IDSales         : document.getElementById("IDSales").value || counter,
        Client          : document.getElementById("client").value,
        Manager         : document.getElementById("manager").value,
        Sum             : document.getElementById("sum").value,
        DateofDispatch  : new Date(document.getElementById("DateofDiscpatch").value || new Date()).toLocaleDateString(),
        Status          : radiocheck(),
    };

    var tableTextSales = {
        cellTextDateofCreate    : document.createTextNode(tableSales.DateofCreate),
        cellTextIDSales         : document.createTextNode(tableSales.IDSales),
        cellTextClient          : document.createTextNode(tableSales.Client),
        cellTextManager         : document.createTextNode(tableSales.Manager),
        cellTextSum             : document.createTextNode(tableSales.Sum),
        cellTextDateofDispatch  : document.createTextNode(tableSales.DateofDispatch),
        cellTextStatus          : document.createTextNode(tableSales.Status),
    };

    tbl.appendChild(tblBody);
    tblBody.appendChild(row);
    row.appendChild(cellDateofCreate);
    row.appendChild(cellIDSales);
    row.appendChild(cellClient);
    row.appendChild(cellManager);
    row.appendChild(cellSum);
    row.appendChild(cellDateofDispatch);
    row.appendChild(cellStatus);
    cellDateofCreate.appendChild(tableTextSales.cellTextDateofCreate);
    cellIDSales.appendChild(tableTextSales.cellTextIDSales);
    cellClient.appendChild(tableTextSales.cellTextClient);
    cellManager.appendChild(tableTextSales.cellTextManager);
    cellSum.appendChild(tableTextSales.cellTextSum);
    cellDateofDispatch.appendChild(tableTextSales.cellTextDateofDispatch);
    cellStatus.appendChild(tableTextSales.cellTextStatus);
    
    localStorage.setItem("tableSales", JSON.stringify(tableSales));

    //РАБОТА С IDB

    const request = indexedDB.open('Система планирования', 2);

    request.onupgradeneeded = () => {
            const db = request.result;
            const objectStore = db.createObjectStore('tableSales');
            objectStore.createIndex("id", "row", {unique: true});
            console.log('Database opened successfully');
    };

    request.onsuccess = (event) => {
            const db = event.target.result;
            let transaction = db.transaction('tableSales', 'readwrite');
            const table = transaction.objectStore('tableSales');
            let id = document.querySelectorAll("tr").length - 1;
            table.add(tableSales, id);
    };
    
};

window.onload = async function(){

    // Функция для открытия базы данных и извлечения данных из object store
    async function getDataFromIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('Система планирования', 2);

            request.onerror = function(event) {
                console.log('Database error: ' + event.target.errorCode);
                reject(event.target.errorCode);
            };

            request.onsuccess = function(event) {
                const db = event.target.result;
                console.log('Database opened successfully');

                if (db.objectStoreNames.contains('tableSales')) {
                    let transaction = db.transaction('tableSales', 'readonly');
                    let objectStore = transaction.objectStore('tableSales');
                    let allData = [];

                    objectStore.openCursor().onsuccess = function(event) {
                        let cursor = event.target.result;
                        if (cursor) {
                            allData.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(allData); // Возвращаем все данные
                        }
                    };
                } else {
                    resolve([]); // Если object store не существует, возвращаем пустой массив
                }
            };
        });
    }

    // Функция для создания строки таблицы
    function createTableRow(data, rowNumber) { 
        let table = document.querySelector('table');
        let row = document.createElement('tr');

        Object.keys(data).forEach(property => {
            let cell = document.createElement('td');
            let cellTextNode = document.createTextNode(data[property]);

            cell.appendChild(cellTextNode);
            // Устанавливаем id для ячейки в формате [имя ключа] + [номер строки]
            cell.id = `${property}${rowNumber}`;
            row.appendChild(cell);
        }); 

        table.appendChild(row);
    }

    // Ожидание извлечения данных из IndexedDB и заполнение таблицы
    const data = await getDataFromIndexedDB();
    data.forEach((item, index) => createTableRow(item, index + 1));

    // Создание адаптивной фильтрации по стобцу n с помощью addEventListener('click'), позволяющего обработать событие щелчка по th определенного colomn
    const cellHead = document.getElementsByClassName('MTb');
    for (const element of cellHead) {
        element.addEventListener('click', function() {
            const cellHead = element;
            const colomn = document.querySelectorAll(`td[id^="${cellHead.id}"]`);
            const colomnArr = Array.from(colomn);

            // Вставить выражение из input .th
            const filteredColomn = colomnArr.filter(number => number.textContent <= 10);
            
            filteredColomn.forEach(item => {
                var cell = item.closest('td');
                var row = cell.parentNode;
                row.style.display = 'none'
                item.style.color = 'red';
                item.style.backgroundColor = 'yellow';
            });
            
        });
    };
    // Получаем все элементы, к которым мы хотим привязать эффект hover
var elements = document.querySelectorAll('th');

    // Проходимся по каждому элементу и добавляем обработчики событий
    elements.forEach(function(element) {
        // Добавляем обработчик события при наведении мыши
        element.addEventListener('mouseenter', function() {
            // Действия, которые произойдут при наведении мыши на элемент
            const table = element.closest("table");
            console.log(table)
            const th = document.createElement("th");
            const thTxt = th.createElement("input")
            console.log("[eq]")
        });

        // Добавляем обработчик события при уходе мыши
        element.addEventListener('mouseleave', function() {
            // Действия, которые произойдут при уходе мыши с элемента
            element.style.color = "blue";;
        });
    });
};