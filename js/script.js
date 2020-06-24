let BASE_URL = 'https://carpark10.herokuapp.com/';

function openMenu(){
    if(document.getElementById('content').style.display == "flex"){
        document.getElementById('content').style.display = "none";
    }else{
        document.getElementById('content').style.display = "flex";
    }
    
}

function carregaCarros(){
    this.getCarros();
}

function carregaCarro(){
    var params = window.location.search.substring(1).split('placa=');
    var placa = params[1];
    this.getByPlaca(placa);
}

function getByPlaca(placa){
    var url = BASE_URL + 'carro/' + placa;
    getJSON(url,'GET', false, function(status, data){
       var w = "<article id='image'>"+
        "<img src='imagens/carro (2).png' alt=''>"+
    "</article>"+
   " <article id='description'>"+
        "<h3>"+data.modelo+"</h3>"+
        "<div>"+
            "<ul>"+
                "<li>Marca: "+data.marca+"</li>"+
                "<li>Ano: "+data.ano+"</li>"+
                "<li>Cor: "+data.cor+"</li>"+
            "</ul>"+
        "</div>";
    if(data.descricao !== ''){
        w += "<h4>Descrição:</h4>"+
            "<p>"+data.descricao+"</p>"+
        "</article>"+
        "<a href='#'>Alugar</a>";
    }else{
        w += "</article>"+
        "<a href='#'>Alugar</a>";
    }  
    document.getElementById('section2').innerHTML = w;
    } );
}

function getCarros(){
    var url = BASE_URL + 'carro/available';
    getJSON(url,'GET', false, function(status, data){
        for(var i = 0; i < data.length; i++){
            document.getElementById('section2').innerHTML += "<a href='carro.html?placa="+data[i].placa+"'>"+
                "<article>"+
                    "<div class='boximage'>"+
                        "<img src='imagens/auto-conducao.png' alt=''>"+
                    "</div>"+
                    "<div>"+
                        "<h3>"+data[i].modelo+"</h3>"+
                        "<p>Marca: "+ data[i].marca + "<br> Ano: "+ data[i].ano +"<br> Cor: "+ data[i].cor +"</p>"+
                    "</div>"+
                "</article>"+
            "</a>";
                
        } 
    } );
}
var serialize = function (form) {
    var json = {};
    var data = new FormData(form);
    var keys = data.keys();
    for (var key = keys.next(); !key.done; key = keys.next()) {
      var values = data.getAll(key.value);
      json[key.value] = values.length == 1 ? values[0] : values;
    }  
    return json;
  }

function OpenCadastro(){
    document.getElementById("cadastro").style.marginLeft = "0";
}
function fechaCadastro(){
    document.getElementById("cadastro").style.marginLeft = "-100vw";
}

function OpenLogin(){
    document.getElementById("login").style.marginLeft = "0";
}
function fechaLogin(){
    document.getElementById("login").style.marginLeft = "-100vw";
}
function Cadastro(){
    var form = document.getElementById("form");
    var json = serialize(form);	
    var url = BASE_URL + 'user';
    getJSON(url,'POST', json, function(status, data){
       console.log(data);
    } );
}

function Login(){
    var form = document.getElementById("formLogin");
    var json = serialize(form);
    var url = BASE_URL + 'auth/login';
    getJSON(url,'POST', json, function(status, data){
        this.loadByEmail(json['email']);
        sessionStorage.setItem('jwt', data.access_token);
        this.posLogin();
    } );
}

function posLogin(){
    document.getElementById("alugar").display = "flex !important";
    window.location.href = "https://wizardly-raman-a274a6.netlify.app/index.html";
}

function loadByEmail(email){
    var url = BASE_URL + 'user/search?search=' + email;
    getJSON(url,'GET', false, function(status, data){
        sessionStorage.setItem('user', JSON.stringify(data));
     } );
}

//Esta função recebe uma url para requisição e faz a busca por meio de um GET
//Depois ela chama o callback
function getJSON(url, method, body, callback){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true); //abrindo requisição para a url de forma assíncrona
    xhr.setRequestHeader('Content-Type', 'application/json'); 
    xhr.responseType = 'json';
    xhr.onload = function(){
        var status = xhr.status;
        if (status === 200 || status === 201){
            callback(status, xhr.response);
        } else {
            console.log('ERROR: '+ status);
        }
    }
    if(body){
        xhr.send(JSON.stringify(body));
    }else{
        xhr.send();
    }
    
}
