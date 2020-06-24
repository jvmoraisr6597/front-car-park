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
    getJSON(url,'GET', function(status, data){
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
    var url = BASE_URL + 'carro';
    getJSON(url,'GET', function(status, data){
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


//Esta função recebe uma url para requisição e faz a busca por meio de um GET
//Depois ela chama o callback
function getJSON(url, method, callback){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true); //abrindo requisição para a url de forma assíncrona
    xhr.setRequestHeader('Content-Type', 'application/json'); 
    xhr.responseType = 'json';
    xhr.onload = function(){
        var status = xhr.status;
        if (status === 200){
            callback(status, xhr.response);
        } else {
            console.log('ERROR: '+ status);
        }
    }
    xhr.send();
}
