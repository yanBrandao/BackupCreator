const log = "[Serviço]: ";
var BlackMirrorRobot = require("./BlackMirrorRobot.js");
var fs = require("fs");
const path = require('path')

var getDir = false;
var comD = false;
var jumpLine = false;
var novoDiretorio = "";

//#region Processamento dos Argumentos.
/* Leitura dos argumentos */
process.argv.forEach(function (val, index, array) {
    /* Validação para realizar leitura do Diretório*/
    if(getDir == true){
        novoDiretorio = val.toString();
        getDir = false;
    }
    /* Validação para checkar se o argumento atual é um comando */
    if(val.includes('-')){
        var comando = val[val.indexOf('-') + 1];
        /* Se o comando atual for de ajuda, o próximo valor será 'h' */
        if(comando == 'h'){
            console.log(log + "Uso: node check_file.js [-h] [-d diretório]");
            process.exit(); 
        }
        /* Se o comando for 'd', então o próximo argumento deverá ser um diretório */
        if(comando == 'd' && comD == false){
            getDir = true;
            comD = true;
        }else if(comando == 'd' && comD == true)
        {
            console.log(log + "Operação inválida, use apenas um diretório para backup!");
            process.exit();
        }
        else{
            console.log(log + "Argumento inválido, use -h para mais informações.")
            process.exit();
        }
    }
});

if(novoDiretorio == ""){
    console.log(log + "Por favor, insira um diretório para começar. Use -h para ajuda.");
    process.exit();
}

var pasta = novoDiretorio.toString().split("\\");

/* Validação se Diretório Backup existe. */
var backupDir =  novoDiretorio + "..\\" + pasta[(pasta.length - 2)].toString() + "_bkp";
if(!fs.existsSync(backupDir)){
    fs.mkdirSync(backupDir);
    console.log(log + "Diretório de backup criado com sucesso!");
}

//#endregion

function loopCheckArquivo(){
    var dataHoje = new Date();
    var arquivos = fs.readdirSync(novoDiretorio);
    var indiceArquivos = new Array(arquivos.length);
    var countTxt = 0;
    var i = 0;
    /* Verifica os arquivos na pasta e guarda as posições dos txt em um vetor. */
    arquivos.forEach(arq =>{
        var splitArq = arq.split(".");
        if(splitArq[splitArq.length - 1] == "txt"){
            countTxt++;
            indiceArquivos[i] = true;
        }else{
            indiceArquivos[i] = false;
        }
        i++;
    });

    if(!jumpLine){
        process.stdout.write("Aguardando novos arquivos.");
        jumpLine = true;
    }else{
        process.stdout.write(".");
    }

    if(countTxt > 0){
        jumpLine = !jumpLine;
        console.log(" ");
    }
    i = 0;
    arquivos.forEach(arq =>{
        if(indiceArquivos[i] == true){ 
            var robot = new BlackMirrorRobot(novoDiretorio + arq);
            robot.makeBackup(backupDir);
        }
        i++;
    });
}

//Timer para processar a verificação de arquivos a cada 2 segundos.
setInterval(loopCheckArquivo, 2000);