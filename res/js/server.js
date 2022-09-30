var demoAccounts = [
    {
        id:1,
        name:"Мой первый аккаунт",
        total:1200.00
    },
    {
        id:2,
        name:"Мой второй аккаунт",
        total:567.00
    }
];

var demoTransactions = [
    {
        id:1,
        date:"20.02.2022",
        move:"Доход",
        sum:1200.00,
        comment:"Покупка сока",
        account_id:1
    },
    {
        id:2,
        date:"22.02.2022",
        move:"Доход",
        sum:567.00,
        comment:"Покупка сока",
        account_id:2
    },
];


$(document).ready(function() {
    getAccounts();
    getTransactions();
});

function getAccounts() {
    $.post("http://localhost:40805/api/accounts/get", {
    }).done(function(response){
        renderAccounts(response);
    }).fail(function(){
        renderAccounts(demoAccounts);
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
        renderTransactions(demoTransactions);
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
