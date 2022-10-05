$(document).ready(function(){

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    $("#new_account").on("click", function() {
        var html = `
        <p>
            <span class="input">
                <input type="text" id="new_account_name" placeholder="Название Вашего счёта">
                <span></span>
            </span>
        </p>
        `;

        Swal.fire({
          title: 'Создать новый счет',
          html: html,
          confirmButtonText: 'Создать'
          }).then(function(result){
              if (result.isConfirmed) {
                  var account_name = $("#new_account_name").val();

                  $.post("http://localhost:40805/api/accounts/create", {
                      account : account_name
                  }).done(function(response){
                      getAccounts();
                  }).fail(function(){
                      alert("Не удалось соединиться с сервером");
                  });

              }
          });
    });

    $("#new_transaction").on("click", function() {
        var dayNow = today.toLocaleDateString();
        var html = `
        <p>
            <span class="inputplace">Дата</span>
            <span class="input">
                <input type="text" id="trans_date" value="`+dayNow+`" placeholder="Дата">
                <span></span>
            </span>
        </p>
        <p>
            <span class="inputplace">Движение</span>
            <span class="input">
                <select id="trans_move" style="min-width: 220px;">
                    <option value="РАСХОД">РАСХОД</option>
                    <option value="ДОХОД">ДОХОД</option>
                </select>
                <span></span>
            </span>
        </p>
        <p>
            <span class="inputplace">Сумма</span>
            <span class="input">
                <input id="trans_sum" type="text" value="" placeholder="Укажите сумму">
                <span></span>
            </span>
        </p>
        <p>
            <span class="inputplace">Причина</span>
            <span class="input">
                <input type="text" id="trans_comm" value="" placeholder="Причина">
                <span></span>
            </span>
        </p>
        <p>
            <span class="inputplace">Аккаунт</span>
            <span class="input">
                <select id="trans_acc" style="min-width: 220px;">
        `;

        accounts.forEach(function(account){
            html += `
            <option value="`+account.id+`">`+account.name+`</option>
            `;
        });

        html += `
                </select>
                <span></span>
            </span>
        </p>
        `;

        Swal.fire({
          title: 'Добавить транзакцию',
          html: html,
          confirmButtonText: 'Добавить'
          }).then(function(result){
              if (result.isConfirmed) {
                  var tranc_date = $("#tranc_date").val();
                  var trans_move = $("#trans_move").val();
                  var trans_sum = $("#trans_sum").val();
                  var trans_comm = $("#trans_comm").val();
                  var trans_acc = $("#trans_acc").val();

                  $.post("http://localhost:40805/api/transactions/create", {
                      date : tranc_date,
                      move : trans_move,
                      sum : trans_sum,
                      comm : trans_comm,
                      acc : trans_acc
                  }).done(function(response){
                      getTransactions();
                  }).fail(function(){
                      alert("Не удалось соединиться с сервером");
                  });
              }
          });
    });
});
