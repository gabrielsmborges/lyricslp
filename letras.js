const key = "41f1694213a688eedf196dc87df708c5"
const key2 = "a0b8689c9cadbf5a69943f6365a74edf"
var thisTitre = "";
var thisAuteur ="";
var artist = "";
var music = "";
var api = "";
var thisTexte = "";
var newArr  = [];
var finalText;
var eunaoaguentomais = [];

//  1° - No clique chama a funçao AnteLetra
function anteLetra(){
    letra(`${document.getElementById('link').value}`)
}
//  2° - Chama Letra
const letra = (url) => {
    url = url.split('/');
    //https://www.vagalume.com.br/soraya-moraes/caminho-no-deserto.html
    artist = url[3];
    music = url[4].replace('.html', '');
    api = `https://api.vagalume.com.br/search.php?apikey=${key}&art=${artist}&mus=${music}`
    app(api)
}

//  3° - Chama App
function app (rst){
    fetch(rst)
    .then(response => response.json())
    .then(data => {
        thisTexte = (JSON.stringify(data["mus"][0]["text"])).toString();
        thisTitre = (JSON.stringify(data["mus"][0]["name"])).toString();
        thisAuteur = (JSON.stringify(data["art"]["name"])).toString();
        document.getElementById('receiver').innerHTML = `
            <h1>${thisTitre.replace(/"/g, '')}</h1>
            <br/>
            <p>${formerText(thisTexte).replace( /\\n\\n/g , "<br/><br/>").replace( /\\n/g , "<br/>")}</p>
        `
        formerText(thisTexte);

    })
}

function formerText(str){
    str = str.replace( /\\n\\n/g , "<br/><br/>").replace( /\\n/g , "<br/>").replace(/[\\]/g, '').split("<br/><br/>")
    return versifier(str)
}


function versifier(arr){
    finalText = [];
    let i = 0
    arr.forEach(word => {
        
        finalText.push(`<verse name="v${i}">
        <lines>${word}</lines>
    </verse>`)
    i++;
})
    eunaoaguentomais.push(finalText.join(''))

    return finalText.join('')
}



function xmlFile(){
    return (`<?xml version='1.0' encoding='UTF-8'?>
    <song xmlns="http://openlyrics.info/namespace/2009/song" version="0.8" createdIn="OpenLP 2.4.6" modifiedIn="OpenLP 2.4.6" modifiedDate="2018-06-19T21:54:51">
      <properties>
        <titles>
          <title>${thisTitre.replace(/"/g, '')}</title>
        </titles>
        <authors>
          <author>${thisAuteur.replace(/"/g, '')}</author>
        </authors>
      </properties>
      <lyrics>
        ${formerText(thisTexte.replace(/"/g, ""))}
      </lyrics>
    </song>`)}


function preDownload(){
    setTimeout(function(){
        download(`${thisTitre}(${thisAuteur}).xml`, xmlFile())
    }, 1000);
} 


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  

function newPage(){
    document.getElementById('body').innerHTML = `<header>
    <a href="index.html"><img id="logo-header-2" src="LyricsLP-logo.png" /></a>
    <a href="como.html" id="como-usar"><p>Como Usar</p></a>
</header>
<div id="receiver"></div>  `
}