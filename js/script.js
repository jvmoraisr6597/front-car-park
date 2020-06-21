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

function getCarros(){
    var url = BASE_URL + 'carro';
    getJSON(url,'GET', function(status, data){
        for(var i = 0; i < data.length; i++){
            document.getElementById('section2').innerHTML += "<a href='carro.html?placa="+data[i].placa+"'>"+
                "<article>"+
                    "<img src='imagens/transporte.png' alt=''>"+
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
