create database if not exists pruebaEMQU;

use pruebaEMQU;

create table redesSociales(
    correo varchar(80) not null,
    edad enum('18-25','26-33','34-40','40+') not null,
    sexo char(1) not null,
    tiempoF int not null unsigned default 0,
    tiempoW int not null unsigned default 0,
    tiempoTw int not null unsigned default 0,
    tiempoIg int not null unsigned default 0,
    tiempoTik int not null unsigned default 0,
    redFavorita enum('Facebook','Whatsapp','Twitter','Instagram','Tiktok') not null,
    primary key(correo)
);