// replicare quanto visto a lezione sulla todo-list permettendo all'utente di leggere tutti i task inseriti, inserirne di nuovi, eliminare quelli vecchi

$(document).ready(init);

// FUNZIONI
  function init(){
    stampaPlanning();
    clicKAggiungi();
    keyupInput();
    clickElimina();
  }

  function  stampaPlanning() {
    $.ajax({
      url: "http://157.230.17.132:3013/todos",
      method: "GET",
      success: function(data, state) {
        var target = $("#lista-planning");
        target.text("");
        for (var i = 0; i < data.length; i++) {
          var compito = data[i];
          target.append(`<li class="compito" data-id="${compito.id}">
          ${compito.text}
          <div class="elimina">
            <span>Davvero vuoi eliminarlo dalla tua lista?</span>
            <button class="btn-elimina" type="button" name="button">Elimina</button>
          </div>
          </li>`);
        }
      },
      error: function(request, state, error) {
        console.log("request",request);
        console.log("state",state);
        console.log("error",error);
      }
    });
  }

  function clicKAggiungi() {
    var btnCerca = $("#btn-aggiungi");
    btnCerca.click(function verificaImput(){
      var input = $("#input-aggiungi").val();
      if (input.length > 0) {
        aggiungiCompito(input);
      }
    });
  }

  function keyupInput() {
    var inputAggiungi = $("#input-aggiungi");
    inputAggiungi.keyup(sendKeyupInput);
  }

  function sendKeyupInput(event) {
    var tasto = event.which;
    var input = $(this).val();
    if (tasto == 13 && input.length > 0) {
      aggiungiCompito(input);
    }
  }

  function  aggiungiCompito(nuovoCompito) {
    $("#input-aggiungi").val("");
    $.ajax({
      url: "http://157.230.17.132:3013/todos",
      method: "POST",
      data:{
        "text": nuovoCompito
      },
      success: function(data, state) {
        stampaPlanning();
      },
      error: function(request, state, error) {
        console.log("request",request);
        console.log("state",state);
        console.log("error",error);
      }
    });
  }

  function clickElimina() {
    $(document).on("click", ".btn-elimina", eliminaCompito);
  }

  function eliminaCompito() {
    var btnElimina = $(this);
    var id = btnElimina.parents(".compito").data("id");
    console.log(id);
    $.ajax({
      url: `http://157.230.17.132:3013/todos/${id}`,
      method: "DELETE",
      success: function(data, state) {
        stampaPlanning();
      },
      error: function(request, state, error) {
        console.log("request",request);
        console.log("state",state);
        console.log("error",error);
      }
    });
  }
