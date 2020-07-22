USE Odontoradiosis;

DROP PROCEDURE IF EXISTS DIFF_LANDMARKS;

DELIMITER $$

CREATE PROCEDURE DIFF_LANDMARKS(IN landmark_id_1 INTEGER, IN landmark_id_2 INTEGER,
    OUT Ba INTEGER, OUT S INTEGER, OUT N INTEGER, OUT ENA INTEGER, OUT ENP INTEGER, OUT A INTEGER,
    OUT PB INTEGER, OUT Pr INTEGER, OUT Id INTEGER, OUT Pog INTEGER, OUT Gn INTEGER, OUT Me INTEGER,
    OUT D INTEGER, OUT Bo INTEGER, OUT Ar INTEGER, OUT Po INTEGER, OUT Pt INTEGER, OUT E INTEGER,
    OUT Men INTEGER, OUT Co INTEGER, OUT Pn INTEGER, OUT Cm INTEGER, OUT SnX INTEGER, OUT Ls INTEGER,
    OUT Sts INTEGER, OUT Pg INTEGER, OUT pm INTEGER, OUT ad INTEGER, OUT bl INTEGER, OUT bf INTEGER)
BEGIN
    SELECT (l_1.Ba - l_2.Ba), (l_1.S - l_2.S), (l_1.N - l_2.N), (l_1.ENA - l_2.ENA),
    (l_1.ENP - l_2.ENP), (l_1.A - l_2.A), (l_1.PB - l_2.PB), (l_1.Pr - l_2.Pr), (l_1.Id - l_2.Id),
    (l_1.Pog - l_2.Pog), (l_1.Gn - l_2.Gn), (l_1.Me - l_2.Me), (l_1.D - l_2.D), (l_1.Bo - l_2.Bo),
    (l_1.Ar - l_2.Ar), (l_1.Po - l_2.Po), (l_1.Pt - l_2.Pt), (l_1.E - l_2.E), (l_1.Men - l_2.Men),
    (l_1.Co - l_2.Co), (l_1.Pn - l_2.Pn), (l_1.Cm - l_2.Cm), (l_1.SnX - l_2.SnX), (l_1.Ls - l_2.Ls),
    (l_1.Sts - l_2.Sts), (l_1.Pg - l_2.Pg), (l_1.pm - l_2.pm), (l_1.ad - l_2.ad), (l_1.bl - l_2.bl),
    (l_1.bf - l_2.bf)
    INTO Ba, S, N, ENA, ENP, A, PB, Pr, Id, Pog, Gn, Me, D, Bo, Ar, Po, Pt, E,
    Men, Co, Pn, Cm, SnX, Ls, Sts, Pg, pm, ad, bl, bf
    FROM (SELECT * FROM landmarks WHERE id_landmark = landmark_id_1) l_1,
(SELECT * FROM landmarks WHERE id_landmark = landmark_id_2) l_2;
END$$
DELIMITER ;

DROP FUNCTION IF EXISTS One_Diff;

DELIMITER $$

CREATE FUNCTION One_Diff (id_landmark_1 INTEGER, id_landmark_2 INTEGER, to_return INTEGER) RETURNS FLOAT
BEGIN
CALL DIFF_LANDMARKS(id_landmark_1, id_landmark_2,
@Ba, @S, @N, @ENA, @ENP, @A,
    @PB, @Pr, @Id, @Pog, @Gn, @Me,
    @D, @Bo, @Ar, @Po, @Pt, @E,
    @Men, @Co, @Pn, @Cm, @SnX, @Ls,
    @Sts, @Pg, @pm, @ad, @bl, @bf);

RETURN IF(to_return = 1, @Ba, 
IF(to_return = 2, @S, IF(to_return = 3, @N, IF(to_return = 4, @ENA, IF(to_return = 5, @ENP,
IF(to_return = 6, @A, IF(to_return = 7, @PB, IF(to_return = 8, @Pr, IF(to_return = 9, @Id,
IF(to_return = 10, @Pog, IF(to_return = 11, @Gn, IF(to_return = 12, @Me, IF(to_return = 13, @D,
IF(to_return = 14, @Bo, IF(to_return = 15, @Ar, IF(to_return = 16, @Po, IF(to_return = 17, @Pt,
IF(to_return = 18, @E, IF(to_return = 19, @Men, IF(to_return = 20, @Co, IF(to_return = 21, @Pn,
IF(to_return = 22, @Cm, IF(to_return = 23, @SnX, IF(to_return = 24, @Ls, IF(to_return = 25, @Sts,
IF(to_return = 26, @Pg, IF(to_return = 27, @pm, IF(to_return = 28, @ad,
IF(to_return = 29, @bl, IF(to_return = 30, @bf, NULL))))))))))))))))))))))))))))));
END$$

DELIMITER ;

DROP VIEW IF EXISTS Compare_Manual_Semiautomatic;

CREATE VIEW Compare_Manual_Semiautomatic AS
SELECT real_doctor.fk_id_image AS id_image, real_doctor.fk_id_doctor AS id_doctor,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 1) AS Ba_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 1) AS Ba_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 2) AS S_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 2) AS S_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 3) AS N_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 3) AS N_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 4) AS ENA_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 4) AS ENA_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 5) AS ENP_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 5) AS ENP_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 6) AS A_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 6) AS A_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 7) AS PB_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 7) AS PB_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 8) AS Pr_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 8) AS Pr_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 9) AS Id_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 9) AS Id_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 10) AS Pog_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 10) AS Pog_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 11) AS Gn_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 11) AS Gn_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 12) AS Me_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 12) AS Me_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 13) AS D_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 13) AS D_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 14) AS Bo_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 14) AS Bo_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 15) AS Ar_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 15) AS Ar_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 16) AS Po_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 16) AS Po_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 17) AS Pt_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 17) AS Pt_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 18) AS E_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 18) AS E_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 19) AS Men_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 19) AS Men_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 20) AS Co_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 20) AS Co_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 21) AS Pn_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 21) AS Pn_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 22) AS Cm_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 22) AS Cm_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 23) AS SnX_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 23) AS SnX_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 24) AS Ls_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 24) AS Ls_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 25) AS Sts_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 25) AS Sts_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 26) AS Pg_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 26) AS Pg_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 27) AS pm_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 27) AS pm_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 28) AS ad_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 28) AS ad_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 29) AS bl_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 29) AS bl_Y,

One_Diff((SELECT semiautomatic_doctor.fk_landmark_x), (SELECT real_doctor.fk_landmark_x), 30) AS bf_X,
One_Diff((SELECT semiautomatic_doctor.fk_landmark_y), (SELECT real_doctor.fk_landmark_y), 30) AS bf_Y

FROM (SELECT * FROM image_landmarks WHERE fk_id_doctor = 1) AS semiautomatic_doctor
INNER JOIN (SELECT * FROM image_landmarks WHERE fk_id_doctor != 1) AS real_doctor
ON semiautomatic_doctor.fk_id_image = real_doctor.fk_id_image;

SELECT * FROM Compare_Manual_Semiautomatic;

# SELECT @Ba, @S, @N, @ENA, @ENP, @A, @PB, @Pr, @Id, @Pog, @Gn, @Me, @D, @Bo, @Ar, @Po, @Pt, @E,
    #@Men, @Co, @Pn, @Cm, @SnX, @Ls, @Sts, @Pg, @pm, @ad, @bl, @bf;
