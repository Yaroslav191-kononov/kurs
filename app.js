const express = require("express");
const multer  = require("multer");
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const urlencodedParser = express.urlencoded({extended: false});
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');
let transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
      user: 'buccek@mail.ru',
      pass: 'aS3whCRhckTNNcjHyNh5',
  },
});
app.get('/',(_, response)=>response.sendFile(__dirname + "/index.html"));
app.use(express.static(path.join(__dirname, 'public')));
app.post('/comm',urlencodedParser,function (req, res) {
  const sql = `SELECT \`comm\`,\`foruser\`.\`name\`,\`img\` FROM \`coment\` JOIN \`foruser\` ON \`user_id\`=\`foruser\`.\`id\``;
  db.all(sql, function(err, resalt) {
    res.end(JSON.stringify(resalt));
  });
});
app.post('/commAdd',multer({dest:__dirname+"\\public\\uploads"}).single("img"),urlencodedParser,function (req, res) {
  const sql = `SELECT \`comm\`,\`foruser\`.\`name\` FROM \`coment\` JOIN \`foruser\` ON \`user_id\`=\`foruser\`.\`id\` WHERE \`foruser\`.\`name\`='${req.body.userUser}'`;
  db.all(sql, function(err, result) {
    result.length==0?AddComm(req,res):UpdaseComm(req,res);
  });
});
app.post('/',urlencodedParser, function (req, res) {
  const sql = `SELECT * FROM \`foruser\` WHERE \`name\`='${req.body.userName}'`;
  db.all(sql, function(err,result) {
    //SendMassege(req.body.userEmail);
    result.length==0?AddUser(req,res):UpdaseUser(req,results,res);
  });
});
function AddComm(req,res){
  const sql = `INSERT INTO \`foruser\`(\`name\`, \`email\`, \`quantity\`) VALUES('${req.body.userUser}', '${null}',0)`;
  db.run(sql, (err)=>err);
  const sql1 = `SELECT \`id\` FROM \`foruser\` WHERE \`name\`='${req.body.userUser}'`;
  db.all(sql1, function(err,result) {
    let sql2=`INSERT INTO \`coment\`(\`user_id\`, \`comm\`,\`img\`) VALUES (${result[0].id},'${req.body.userComment}'`;
    sql2 +=req.file?`,'${req.file.filename}')`:`,NULL)`;
    db.run(sql2, err=>res.end(err?(console.log(err),'что-то пошло не так'):'ваш комментарий обновлён'))
  });
}
function UpdaseComm(req,res){
  const sql=`UPDATE coment SET comm = '${req.body.userComment}' WHERE user_id IN (SELECT id FROM foruser WHERE name = '${req.body.userUser}')`;
  db.run(sql, (err)=>res.end(err?('что-то пошло не так',console.log(err)):'ваш комментарий обновлён'));
}
function AddUser(req,res){
  const sql = `INSERT INTO \`foruser\`(\`name\`, \`email\`, \`quantity\`) VALUES('${req.body.userName }', '${req.body.userEmail}',1)`;
  db.run(sql, (err)=>err?console.log(err):console.log(res));
  res.sendFile(__dirname + "/index.html");
}
function UpdaseUser(req,results,res){
  const sql = `UPDATE \`foruser\` SET \`quantity\`=${results[0].quantity+1},\`email\`='${req.body.userEmail}' WHERE \`name\`='${req.body.userName}'`;
  db.run(sql, (err)=>err?console.log(err):console.log(res));
  res.sendFile(__dirname + "/index.html");
}
// function SendMassege(userEmail){
//   let message = transporter.sendMail({
//     from: 'Buccek Comp <buccek@mail.ru>',
//     to: `${userEmail}, ${userEmail}`,
//     subject: 'подтвердите покупку',
//     text: '',
//     html:'подтвердите вашу <i>покупку</i>'
//   })
//   console.log(message);
//   }
app.listen(3000, ()=>console.log("(http://localhost:3000/)Сервер запущен..."));