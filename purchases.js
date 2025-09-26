/* document.addEventListener("DOMContentLoaded", () => {
    const purchasesTable = document.getElementById('purchasesTable').getElementsByTagName('tbody')[0];

    function loadPurchases() {
        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        purchases.forEach(purchase => addRow(purchase));
    }

    function savePurchase(purchase) {
        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        purchases.push(purchase);
        localStorage.setItem('purchases', JSON.stringify(purchases));
    }

    function addRow(purchase) {
        const row = purchasesTable.insertRow();
        row.insertCell(0).textContent = purchase.dateCreated;
        row.insertCell(1).textContent = purchase.purchaseNumber;
        row.insertCell(2).textContent = purchase.supplier;
        row.insertCell(3).textContent = purchase.manager;
        row.insertCell(4).textContent = purchase.amount;
        row.insertCell(5).textContent = purchase.dateReceived;
        row.insertCell(6).textContent = purchase.status;
    }

    document.getElementById('AddBtn').addEventListener('click', () => {
        const newPurchase = {
            dateCreated: new Date().toLocaleDateString(),
            purchaseNumber: purchasesTable.rows.length + 1,
            supplier: "Поставщик " + (purchasesTable.rows.length + 1),
            manager: "Менеджер " + (purchasesTable.rows.length + 1),
            amount: (Math.random() * 10000).toFixed(2),
            dateReceived: new Date().toLocaleDateString(),
            status: "Неизвестно"
        };
        addRow(newPurchase);
        savePurchase(newPurchase);
    });

    loadPurchases();
}); */
