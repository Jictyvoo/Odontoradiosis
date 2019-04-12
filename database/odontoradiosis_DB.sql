create database if not exists odontoradiosis;
use odontoradiosis;

create table if not exists Imagem(
	id_imagem int not null auto_increment,
	caminho varchar(30) not null,
	primary key(id_imagem)
);

create table if not exists Img_Save(
	fk_id_img integer NOT NULL,
	id_doctor integer NOT NULL,
	BaX INTEGER,
	BaY INTEGER,
	SX INTEGER,
	SY INTEGER,
	NX INTEGER,
	NY INTEGER,
	ENAX INTEGER,
	ENAY INTEGER,
	ENPX INTEGER,
	ENPY INTEGER,
	AX INTEGER,
	AY INTEGER,
	PBX INTEGER,
	PBY INTEGER,
	PrX INTEGER,
	PrY INTEGER,
	IdX INTEGER,
	IdY INTEGER,
	PogX INTEGER,
	PogY INTEGER,
	GnX INTEGER,
	GnY INTEGER,
	MeX INTEGER,
	MeY INTEGER,
	DX INTEGER,
	DY INTEGER,
	BoX INTEGER,
	BoY INTEGER,
	ArX INTEGER,
	ArY INTEGER,
	PoX INTEGER,
	PoY INTEGER,
	PtX INTEGER,
	PtY INTEGER,
	EX INTEGER,
	EY INTEGER,
	MenX INTEGER,
	MenY INTEGER,
	CoX INTEGER,
	CoY INTEGER,
	PnX INTEGER,
	PnY INTEGER,
	CmX INTEGER,
	CmY INTEGER,
	SnX INTEGER,
	SnY INTEGER,
	LsX INTEGER,
	LsY INTEGER,
	StsX INTEGER,
	StsY INTEGER,
	PgX INTEGER,
	PgY INTEGER,
	pmX INTEGER,
	pmY INTEGER,
	adX INTEGER,
	adY INTEGER,
	blX INTEGER,
	blY INTEGER,
	bfX INTEGER,
	bfY INTEGER,
	PRIMARY KEY  (fk_id_img,id_doctor),
	foreign key (fk_id_img) references Imagem(id_imagem)
);


create table if not exists User(
	code_user int not null auto_increment,
	login varchar(20) not null,
	password varchar(30) not null,
	access_level int,
	cpf char(11),
	primary key(code_user)
);

create table if not exists Historical_Log(
	log_id int not null auto_increment,
	user_id int not null,
	user_type int(1) not null,
	operation varchar(100),
	date_hour datetime,
	primary key(log_id),
	foreign key(user_id) references User(code_user)
);

INSERT INTO `odontoradiosis`.`User` (`code_user`, `login`, `password`, `access_level`, `cpf`) VALUES ('1', 'Rustorier', 'user@admin_root', '1', '0');
INSERT INTO `odontoradiosis`.`User` (`code_user`, `login`, `password`, `access_level`, `cpf`) VALUES ('2', 'Admin_Doctor', 'user@admin_doctor', '2', '1');
INSERT INTO `odontoradiosis`.`User` (`code_user`, `login`, `password`, `access_level`, `cpf`) VALUES ('3', 'Doctor', 'user@doctor', '2', '3333');

