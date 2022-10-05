$(document).ready(function() {
    getAccounts();
    getTransactions();

    $("#update").on("click", function(){
        location.reload();
    });
});

var accounts = [];

function getAccounts() {
    $.post("http://localhost:40805/api/accounts/get", {
    }).done(function(response){
        accounts = response;
        renderAccounts(response);
    }).fail(function(){
        alert("Не удалось соединиться с сервером");
    });
}

function renderAccounts(accountsObj) {
    let total = 0.00;
    let my_accounts = $("#my_accounts");
    my_accounts.html("");

    accountsObj.forEach((account) => {
        my_accounts.append("<li>"+account.name+": "+account.total+" ₽</li>");
        total += account.total;
    });

    $("#total").html(total);
}

function getTransactions() {
    $.post("http://localhost:40805/api/transactions/get", {
    }).done(function(response){
        renderTransactions(response);
    }).fail(function(){
        alert("Не удалось соединиться с сервером");
    });
}

function renderTransactions(transactionsObj) {
    let transactionsData = $("#transactions_data");
    transactionsData.html("");

    transactionsObj.forEach((transaction, i) => {
        var transactionHTML = `<tr>
          <td><b>`+transaction.date+`</b></td>
          <td><b>`+transaction.move+`</b></td>
          <td>`+transaction.sum+` ₽</td>
          <td>`+transaction.comment+`</td>
          <td>`+transaction.account_id+`</td>
          <td class="transaction_controll">
              <input type="hidden" class="transaction_id" value="`+transaction.id+`">
              <span class="transaction_update">✎</span>
              <span class="transaction_delete">✖</span>
          </td></tr>`;
          transactionsData.append(transactionHTML);
    });
}
