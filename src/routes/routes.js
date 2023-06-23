const router = require('express').Router();
const pool = require('../database');

router.get('/',async(req,res)=>{
    const nroEncuestas = await pool.query('SELECT count(*) as nroEncuestas FROM redessociales');
    const timeProm = await pool.query(`SELECT avg(tiempoF) as promF, avg(tiempoW) as promW,
    avg(tiempoTw) as promTw, avg(tiempoIg) as promIg, avg(tiempoTik) as promTik FROM redessociales`);
    const tiempos = [['tiempoF','Facebook'],['tiempoW','Whatsapp'],['tiempoTw','Twitter'],['tiempoIg','Instagram'],['tiempoTik','Tiktok']];
    let times = [], redFavorita = [];
    for(const t of tiempos){
        const rowRed = await pool.query(`SELECT count(redFavorita) as nro, '${t[1]}' as red FROM redessociales WHERE redFavorita='${t[1]}'`);
        const rows = await pool.query(`SELECT (SELECT sum(${t[0]}) FROM redessociales WHERE edad='18-25') as tiempo_18_25,
        (SELECT sum(${t[0]}) FROM redessociales WHERE edad='26-33') as tiempo_26_33,
        (SELECT sum(${t[0]}) FROM redessociales WHERE edad='34-40') as tiempo_34_40,
        (SELECT sum(${t[0]}) FROM redessociales WHERE edad='40+') as tiempo_40p, '${t[1]}' as nombreRed`);
        redFavorita.push(rowRed[0]);
        times.push(rows[0]);
    }
    res.json({nroEncuestas:nroEncuestas[0].nroEncuestas,timeProm:timeProm[0],redFavorita,times});
});

router.post('/',async(req,res)=>{
    const { correo,edad,sexo,redFavorita,tiempoF,tiempoW,tiempoTw,tiempoIg,tiempoTik } = req.body;
    const correoRepetido = await pool.query('SELECT * FROM redessociales WHERE correo=?',[correo]);
    if(correoRepetido.length==0){
        const INSERT = { correo,edad,sexo,redFavorita,tiempoF,tiempoW,tiempoTw,tiempoIg,tiempoTik };
        pool.query('INSERT INTO redessociales set ?',[INSERT],(err,rows)=>{
            if(err) throw err;
            else res.json({"operacion":"exitosa"});
        });
    }
    else res.json({"operacion":"Correo Repetido"});
});

module.exports = router;