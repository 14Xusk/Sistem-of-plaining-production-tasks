function radiocheck() {
    var form = document.querySelector("form");
    var Data = new FormData(form);
    for (const entry of Data) {
        return entry[1];
    }
    return "Не указано";
};

function addrow() {
    const tbl = document.querySelector("table");
    const tblBody = document.querySelector("tbody") || document.createElement("tbody");
    const row = document.createElement("tr");

    tbl.appendChild(tblBody);
    tblBody.appendChild(row);
};

/* addEventListener("dblclick",
    function editCell(event) {
        if (event.target.localName == "td"){
            const cellofEditing = event.target;
            event.target.outerHTML = `<input value = ${event.target.textContent} id = editCell></input>`;
            document.querySelector("#editCell").addEventListener("blur", (event) => {
                console.log(event.target)
            }
            )
            console.log(event.target);
    }
    }); */
    function sales(formIDs) {
        const tbl = document.querySelector("table");
        const storeName = tbl.id;
        const tblBody = tbl.querySelector("tbody") || document.createElement("tbody");
        const row = document.createElement("tr");
    
        const formData = {
            DateofCreate: new Date(document.getElementById(formIDs.DateofCreate).value || new Date()).toLocaleDateString(),
            IDSales: document.getElementById(formIDs.IDSales).value || document.querySelectorAll(`tr`).length + 1,
            Client: document.getElementById(formIDs.Client).value,
            Manager: document.getElementById(formIDs.Manager).value,
            Sum: document.getElementById(formIDs.Sum).value,
            DateofDispatch: new Date(document.getElementById(formIDs.DateofDispatch).value || new Date()).toLocaleDateString(),
            Status: document.querySelector(`input[name="${formIDs.Status}"]:checked`).value,
        };
    
        Object.keys(formData).forEach((key, index) => {
            const cell = document.createElement("td");
            cell.textContent = formData[key];
            cell.id = `${key}${index + 1}`;
            row.appendChild(cell);
        });
    
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
    
        saveDataToIndexedDB(storeName, formData);
    }
    
    
    

// Функция для создания строки таблицы
function createTableRow(data) {
    const table = document.querySelector("table");
    const tbody = table.querySelector('tbody');
    const row = document.createElement('tr');
    const rowNumber = tbody.querySelectorAll('tr').length + 1;

    Object.keys(data).forEach((property, index) => {
        const cell = document.createElement('td');
        const cellTextNode = document.createTextNode(data[property]);
        cell.appendChild(cellTextNode);
        cell.id = `${property}${rowNumber}`;
        row.appendChild(cell);
    });

    tbody.appendChild(row);
}



// Функция для загрузки данных из IndexedDB
async function getDataFromIndexedDB(storeName) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(storeName, 1);

        request.onerror = function(event) {
            console.log('Database error: ' + event.target.errorCode);
            reject(event.target.errorCode);
        };

        request.onsuccess = function(event) {
            const db = event.target.result;
            console.log('Database opened successfully');

            if (db.objectStoreNames.contains(storeName)) {
                let transaction = db.transaction(storeName, 'readonly');
                let objectStore = transaction.objectStore(storeName);
                let allData = [];

                objectStore.openCursor().onsuccess = function(event) {
                    let cursor = event.target.result;
                    if (cursor) {
                        allData.push(cursor.value);
                        cursor.continue();
                    } else {
                        resolve(allData);
                    }
                };
            } else {
                resolve([]);
            }
        };

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                console.log('Object store created');
            }
        };
    });
}



// Функция для сохранения данных в IndexedDB
function saveDataToIndexedDB(storeName, data) {
    const request = indexedDB.open(storeName, 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            const objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            console.log('Database upgraded successfully');
        }
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        let transaction = db.transaction(storeName, 'readwrite');
        const table = transaction.objectStore(storeName);
        const requestAdd = table.add(data);
        requestAdd.onsuccess = () => {
            console.log('Data saved successfully');
        };
        requestAdd.onerror = (event) => {
            console.log('Error saving data: ' + event.target.errorCode);
        }
    };

    request.onerror = (event) => {
        console.log('Database error: ' + event.target.errorCode);
    };
}

// Ожидание полной загрузки DOM перед выполнением кода
window.onload = async function() {
    const tableID = document.querySelector("table"); // Укажите здесь ID вашей таблицы
    const storeName = tableID.id; // Укажите здесь имя вашего хранилища

    const data = await getDataFromIndexedDB(storeName);
    data.forEach((item) => createTableRow(item));

    // Создание адаптивной фильтрации по столбцу n с помощью addEventListener('click'), позволяющего обработать событие щелчка по th определенного colomn
    /* const cellHead = document.getElementsByClassName('MTb');
    for (const element of cellHead) {
        element.addEventListener('click', function() {
            const colomn = document.querySelectorAll(`td[id^="${element.id}"]`);
            const colomnArr = Array.from(colomn);

            // Вставить выражение из input .th
            const filteredColomn = colomnArr.filter(number => number.textContent <= 10);

            filteredColomn.forEach(item => {
                const cell = item.closest('td');
                const row = cell.parentNode;
                row.style.display = 'none';
                item.style.color = 'red';
                item.style.backgroundColor = 'yellow';
            });
        });
    } */
}

