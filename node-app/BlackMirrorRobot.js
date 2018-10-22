//  This is a Constructor function taking file and passport 
//  as the paramaters
function BlackMirrorRobot(file) {
  this.file = file;
}
const log = "[BlackMirrorRobot]: ";

// Sets the file
// 
BlackMirrorRobot.prototype.setfile = function(file) {
  this.file = file;
};

BlackMirrorRobot.prototype.makeBackup = function(backupAdress){
  var fs = require("fs");
  var nomeArquivo = this.file.toString().split("\\");
  console.log(log + "Novo arquivo detectado ("+ nomeArquivo[nomeArquivo.length - 1] +"), iniciando processamento...");
  
  var dataHoje = new Date();
  fs.appendFileSync(this.file, "Modificado em " + dataHoje.getDate() + "-" + (dataHoje.getMonth() + 1) +
  "-" + dataHoje.getFullYear() + " às " + dataHoje.getHours() + ":" + dataHoje.getMinutes() + "\r\n");

  

  fs.renameSync(this.file, backupAdress + "\\" + nomeArquivo[nomeArquivo.length - 1]);
  console.log(log + "Processamento concluído com sucesso.");
};
//  Sets the BlackMirrorRobot object to module.exports
// 
module.exports = BlackMirrorRobot;