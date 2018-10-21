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

  console.log(log + "Novo arquivo detectado, iniciando processamento...");
  
  var dataHoje = new Date();
  fs.appendFileSync(this.file, "Modificado em " + dataHoje.getDate() + "-" + (dataHoje.getMonth() + 1) +
  "-" + dataHoje.getFullYear() + "\r\n");

  var nomeArquivo = this.file.toString().split("\\");

  fs.renameSync(this.file, backupAdress + "\\" + nomeArquivo[nomeArquivo.length - 1]);
  console.log(log + "Processamento concluído com sucesso.");
};
//  Sets the BlackMirrorRobot object to module.exports
// 
module.exports = BlackMirrorRobot;