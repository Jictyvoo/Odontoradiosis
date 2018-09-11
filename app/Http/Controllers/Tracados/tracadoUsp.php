<?php
/*
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/

/**
*
* @author Beatriz de Brito Santana
*/
class TracadoUsp implements Tracado {

public ArrayList<PontosCefalometricos> listadePontos = new ArrayList<PontosCefalometricos>();
        public ArrayList<Medidas> listaMedidas;

            //pontos necess�rios para a realiza��o das an�lises Unesp � Araraquara, USP e Unicamp
            public void realizarTracado(Graphics g) {
            for (int i=0;i<listadePontos.size();i++) {
            if (listadePontos.get(i).getNome().equals("S")) {
            PontosCefalometricos ponto = listadePontos.set(0, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Ba")) {
            PontosCefalometricos ponto = listadePontos.set(1, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("N")) {
            PontosCefalometricos ponto = listadePontos.set(2, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Po")) {
            PontosCefalometricos ponto = listadePontos.set(3, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Or")) {
            PontosCefalometricos ponto = listadePontos.set(4, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Pt")) {
            PontosCefalometricos ponto = listadePontos.set(5, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("A")) {
            PontosCefalometricos ponto = listadePontos.set(6, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("ENA")) {
            PontosCefalometricos ponto = listadePontos.set(7, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("P'")) {
            PontosCefalometricos ponto = listadePontos.set(8, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("ENP")) {
            PontosCefalometricos ponto = listadePontos.set(9, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("B")) {
            PontosCefalometricos ponto = listadePontos.set(10, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Pg")) {
            PontosCefalometricos ponto = listadePontos.set(11, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("E")) {
            PontosCefalometricos ponto = listadePontos.set(12, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Gn")) {
            PontosCefalometricos ponto = listadePontos.set(13, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Me")) {
            PontosCefalometricos ponto = listadePontos.set(14, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Go")) {
            PontosCefalometricos ponto = listadePontos.set(15, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Co")) {
            PontosCefalometricos ponto = listadePontos.set(16, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Pn")) {
            PontosCefalometricos ponto = listadePontos.set(17, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Cm")) {
            PontosCefalometricos ponto = listadePontos.set(18, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Sn")) {
            PontosCefalometricos ponto = listadePontos.set(19, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Ls")) {
            PontosCefalometricos ponto = listadePontos.set(20, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Sts")) {
            PontosCefalometricos ponto = listadePontos.set(21, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Pg'")) {
            PontosCefalometricos ponto = listadePontos.set(22, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("pm")) {
            PontosCefalometricos ponto = listadePontos.set(23, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("ad")) {
            PontosCefalometricos ponto = listadePontos.set(24, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("bl")) {
            PontosCefalometricos ponto = listadePontos.set(25, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("bf")) {
            PontosCefalometricos ponto = listadePontos.set(26, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("T")) {
            PontosCefalometricos ponto = listadePontos.set(27, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("V")) {
            PontosCefalometricos ponto = listadePontos.set(28, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("D")) {
            PontosCefalometricos ponto = listadePontos.set(29, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Pi")) {
            PontosCefalometricos ponto = listadePontos.set(30, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Ais")) {
            PontosCefalometricos ponto = listadePontos.set(31, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Lis")) {
            PontosCefalometricos ponto = listadePontos.set(32, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("St")) {
            PontosCefalometricos ponto = listadePontos.set(33, listadePontos.get(i));
            listadePontos.set(i, ponto);

            //pontos adicionais para medidas de �ngulos, dist�ncias, etc
            } else if (listadePontos.get(i).getNome().equals("Inicio - Plano Oclusal")) {
            PontosCefalometricos ponto = listadePontos.set(34, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("Fim - Plano Oclusal")) {
            PontosCefalometricos ponto = listadePontos.set(35, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("1/ inicio")) {
            PontosCefalometricos ponto = listadePontos.set(36, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("1/ final")) {
            PontosCefalometricos ponto = listadePontos.set(37, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("ponto mais vestibular da coroa do incisivo superior")) {
            PontosCefalometricos ponto = listadePontos.set(38, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("/1 inicio")) {
            PontosCefalometricos ponto = listadePontos.set(39, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("/1 final")) {
            PontosCefalometricos ponto = listadePontos.set(40, listadePontos.get(i));
            listadePontos.set(i, ponto);
            }else if (listadePontos.get(i).getNome().equals("H")) {
            PontosCefalometricos ponto = listadePontos.set(41, listadePontos.get(i));
            listadePontos.set(i, ponto);
            }
            }


            g.drawLine(listadePontos.get(3).getPonto().x, listadePontos.get(3).getPonto().y, listadePontos.get(4).getPonto().x, listadePontos.get(4).getPonto().y); //Po-Or
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(11).getPonto().x, listadePontos.get(11).getPonto().y); //N-Pg
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y); //N-A
            g.drawLine(listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y, listadePontos.get(11).getPonto().x, listadePontos.get(11).getPonto().y); //A-Pg
            g.drawLine(listadePontos.get(0).getPonto().x, listadePontos.get(0).getPonto().y, listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y); //S-N
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(10).getPonto().x, listadePontos.get(10).getPonto().y); //N-B
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(29).getPonto().x, listadePontos.get(29).getPonto().y); //N-D
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y); //N-Gn
            g.drawLine(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(14).getPonto().x, listadePontos.get(14).getPonto().y); //Go-Me
            g.drawLine(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y); //Go-Gn
            g.drawLine(listadePontos.get(4).getPonto().x, listadePontos.get(4).getPonto().y, listadePontos.get(31).getPonto().x, listadePontos.get(31).getPonto().y); //Or-Ais
            g.drawLine(listadePontos.get(31).getPonto().x, listadePontos.get(31).getPonto().y, listadePontos.get(32).getPonto().x, listadePontos.get(32).getPonto().y); //Ais-Lis
            g.drawLine(listadePontos.get(22).getPonto().x, listadePontos.get(22).getPonto().y, listadePontos.get(20).getPonto().x, listadePontos.get(20).getPonto().y); //Pg'-Ls
            g.drawLine(listadePontos.get(27).getPonto().x, listadePontos.get(27).getPonto().y, listadePontos.get(30).getPonto().x, listadePontos.get(30).getPonto().y); //T-Pi
            g.drawLine(listadePontos.get(8).getPonto().x, listadePontos.get(8).getPonto().y, listadePontos.get(12).getPonto().x, listadePontos.get(12).getPonto().y); //P'-E
            g.drawLine(listadePontos.get(28).getPonto().x, listadePontos.get(28).getPonto().y, listadePontos.get(27).getPonto().x, listadePontos.get(27).getPonto().y); //V-T - s�nfise
            g.drawLine(listadePontos.get(34).getPonto().x, listadePontos.get(34).getPonto().y, listadePontos.get(35).getPonto().x, listadePontos.get(35).getPonto().y); //Plano oclusal
            g.drawLine(listadePontos.get(36).getPonto().x, listadePontos.get(36).getPonto().y, listadePontos.get(37).getPonto().x, listadePontos.get(37).getPonto().y); // longo eixo do incisivo superior
            g.drawLine(listadePontos.get(39).getPonto().x, listadePontos.get(39).getPonto().y, listadePontos.get(40).getPonto().x, listadePontos.get(40).getPonto().y); // longo eixo do incisivo inferior

            calcularMedidas();


            }

            public ArrayList<PontosCefalometricos> carregaPontos() {
                listadePontos.add(new PontosCefalometricos(new Point(), "S"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Ba"));
                listadePontos.add(new PontosCefalometricos(new Point(), "N"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Po"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Or"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Pt"));
                listadePontos.add(new PontosCefalometricos(new Point(), "A"));
                listadePontos.add(new PontosCefalometricos(new Point(), "ENA"));
                listadePontos.add(new PontosCefalometricos(new Point(), "P'"));
                listadePontos.add(new PontosCefalometricos(new Point(), "ENP"));
                listadePontos.add(new PontosCefalometricos(new Point(), "B"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Pg"));
                listadePontos.add(new PontosCefalometricos(new Point(), "E"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Gn"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Me"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Go"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Co"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Pn"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Cn"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Sn"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Ls"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Sts"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Pg'"));
                listadePontos.add(new PontosCefalometricos(new Point(), "pm"));
                listadePontos.add(new PontosCefalometricos(new Point(), "ad"));
                listadePontos.add(new PontosCefalometricos(new Point(), "bl"));
                listadePontos.add(new PontosCefalometricos(new Point(), "bf"));
                listadePontos.add(new PontosCefalometricos(new Point(), "T"));
                listadePontos.add(new PontosCefalometricos(new Point(), "V"));
                listadePontos.add(new PontosCefalometricos(new Point(), "D"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Pi"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Ais"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Lis"));
                listadePontos.add(new PontosCefalometricos(new Point(), "St"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Inicio - Plano Oclusal"));
                listadePontos.add(new PontosCefalometricos(new Point(), "Fim - Plano Oclusal"));
                listadePontos.add(new PontosCefalometricos(new Point(), "1/ inicio"));
                listadePontos.add(new PontosCefalometricos(new Point(), "1/ final"));
                listadePontos.add(new PontosCefalometricos(new Point(), "ponto mais vestibular da coroa do incisivo superior"));
                listadePontos.add(new PontosCefalometricos(new Point(), "/1 inicio"));
                listadePontos.add(new PontosCefalometricos(new Point(), "/1 final"));
                listadePontos.add(new PontosCefalometricos(new Point(), "H"));



                return listadePontos;
                }

                public void setListaPontos(ArrayList<PontosCefalometricos> pontos) {
                    this.listadePontos = pontos;
                    }

                    public void calcularMedidas() {

                    listaMedidas = new ArrayList<Medidas>();
                        Calculos calcula = new Calculos();

                        //Angulo (N-Pog).(Po-Orb) - Po-or e N-pg
                        float NPogPoOrb = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(2), listadePontos.get(11));

                        //Angulo N-A.Pog  -  N-a e Pg-A
                        float NaPog = (float) calcula.calcularAngulo(listadePontos.get(2), listadePontos.get(6), listadePontos.get(11), listadePontos.get(6));

                        //�ngulo SNA
                        float SNA = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(6), listadePontos.get(2));

                        //�ngulo SNB
                        float SNB = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(10), listadePontos.get(2));

                        //�ngulo ANB - na e nb
                        float NANB = (float) calcula.calcularAngulo(listadePontos.get(2), listadePontos.get(6), listadePontos.get(2), listadePontos.get(10));

                        //�ngulo SND
                        float SND = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(29), listadePontos.get(2));

                        //�ngulo S-N.Gn - SN e NGn
                        float SNGN = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(2), listadePontos.get(13));

                        //Angulo S-N.Ocl - SN com o plano oclusal
                        float SNOcl = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(34), listadePontos.get(35));

                        //Angulo SN.GoMe
                        float SNGOME = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(15), listadePontos.get(14));

                        //Angulo ( Go-Gn ).Ocl. - GoGn com o plano oclusal
                        float GOGNOcl = (float) calcula.calcularAngulo(listadePontos.get(15), listadePontos.get(13), listadePontos.get(34), listadePontos.get(35));

                        //Angulo 1/./l -  eixo incisivo superior e inferior
                        float UMUM = (float) calcula.calcularAngulo(listadePontos.get(36), listadePontos.get(37), listadePontos.get(39), listadePontos.get(40));

                        //Angulo l /.NS
                        float UMNS = (float) calcula.calcularAngulo(listadePontos.get(36), listadePontos.get(37), listadePontos.get(0), listadePontos.get(2));

                        //�ngulo l.NA
                        float UMNA = (float) calcula.calcularAngulo(listadePontos.get(36), listadePontos.get(37), listadePontos.get(2), listadePontos.get(6));

                        //Medida l-NA
                        float medidaUMNA = calcula.calcularMedida(listadePontos.get(6), listadePontos.get(2), listadePontos.get(38));

                        //---------------�ngulo /1.NB--------------- ok
                        //�ngulo formado pela intersec��o do longo eixo do incisivo superior com a linha NB.
                        float UMNB = (float) calcula.calcularAngulo(listadePontos.get(2), listadePontos.get(10), listadePontos.get(39), listadePontos.get(40));

                        //---------------Medida 1-NB--------------- ok
                        //Medida linear do ponto mais vestibular da coroa do incisivo superior at� a linha NB
                        float medidaUMNB = calcula.calcularMedida(listadePontos.get(10), listadePontos.get(2), listadePontos.get(38));

                        //Angulo /l.NPog
                        float UMnpog = (float) calcula.calcularAngulo(listadePontos.get(37), listadePontos.get(40), listadePontos.get(2), listadePontos.get(22));

                        //Angulo H.(N-B)
                        float HNB = (float) calcula.calcularAngulo(listadePontos.get(22), listadePontos.get(20), listadePontos.get(2), listadePontos.get(10));

                        //Linha H-nariz
                        //linha H = Pg'Ls
                        //ponto Pn e a linha Pg'Ls.
                        float medidaPnPgLs = calcula.calcularMedida(listadePontos.get(22), listadePontos.get(20), listadePontos.get(17));

                        //Angulo Pog-NB
                        //Dist�ncia do ponto Pog � linha NB.
                        float PogNB = (float) (Point.distance(listadePontos.get(11).getPonto().x, listadePontos.get(11).getPonto().y, listadePontos.get(2).getPonto().x, listadePontos.get(10).getPonto().y) * 0.264583);

                        //Emin�ncia Mentoniana
                        //distancia go-me
                        float GoMe = (float) (Point.distance(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(14).getPonto().x, listadePontos.get(14).getPonto().y) * 0.264583);

                        //Angulo FMA
                        float FMA = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(15), listadePontos.get(13));

                        //Angulo FMIA - Frankfurt com o longo eixo dos incisivos inferiores.
                        float FMIA = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(39), listadePontos.get(40));

                        //Angulo IMPA
                        float IMPA = (float) calcula.calcularAngulo(listadePontos.get(15), listadePontos.get(13), listadePontos.get(39), listadePontos.get(40));

                        //Distancia TPi
                        float TPi = (float) (Point.distance(listadePontos.get(27).getPonto().x, listadePontos.get(27).getPonto().y, listadePontos.get(30).getPonto().x, listadePontos.get(30).getPonto().y) * 0.264583);

                        ///1-Linha I
                        float UMI = (float) (Point.distance(listadePontos.get(39).getPonto().x, listadePontos.get(39).getPonto().y, listadePontos.get(8).getPonto().x, listadePontos.get(12).getPonto().y) * 0.264583);

                        //Angulo ( Go-Me).(V-T)
                        float GoMeVT = (float) calcula.calcularAngulo(listadePontos.get(28), listadePontos.get(27), listadePontos.get(15), listadePontos.get(14));

                        //Angulo F.(V-T)
                        float FVT = (float) calcula.calcularAngulo(listadePontos.get(28), listadePontos.get(27), listadePontos.get(3), listadePontos.get(4));

                        //Dist�ncia A-(V-T)
                        float AVT = (float) (Point.distance(listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y, listadePontos.get(28).getPonto().x, listadePontos.get(27).getPonto().y) * 0.264583);

                        //Dist�ncia lii-(V-T)
                        float liiVT = (float) (Point.distance(listadePontos.get(39).getPonto().x, listadePontos.get(40).getPonto().y, listadePontos.get(28).getPonto().x, listadePontos.get(27).getPonto().y) * 0.264583);

                        //AnguloH.(V-T)
                        float HVT = (float) calcula.calcularAngulo(listadePontos.get(28), listadePontos.get(27), listadePontos.get(20), listadePontos.get(17));



                        listaMedidas.add(new Medidas(NPogPoOrb, "angulo (N-Pog).(Po-Orb)"));
                        listaMedidas.add(new Medidas(NaPog, "Angulo N-A.Pog"));
                        listaMedidas.add(new Medidas(SNA, "Angulo SNA"));
                        listaMedidas.add(new Medidas(SNB, "Angulo SNB"));
                        listaMedidas.add(new Medidas(NANB, "angulo ANB"));
                        listaMedidas.add(new Medidas(SND, "angulo SND"));
                        listaMedidas.add(new Medidas(SNGN, "angulo S-N.Gn"));
                        listaMedidas.add(new Medidas(SNOcl, "angulo S-N.Ocl"));
                        listaMedidas.add(new Medidas(SNGOME, "angulo SN.GoMe"));
                        listaMedidas.add(new Medidas(GOGNOcl, "angulo ( Go-Gn ).Ocl"));
                        listaMedidas.add(new Medidas(UMUM, "angulo 1/./l"));
                        listaMedidas.add(new Medidas(UMNS, "Angulo l /.NS"));
                        listaMedidas.add(new Medidas(UMNA, "angulo l-NA"));
                        listaMedidas.add(new Medidas(medidaUMNA, "Medida l-NA"));
                        listaMedidas.add(new Medidas(UMNB, "angulo /1.NB"));
                        listaMedidas.add(new Medidas(medidaUMNB, "Medida 1-NB"));
                        listaMedidas.add(new Medidas(UMnpog, "Angulo /l.NPog"));
                        listaMedidas.add(new Medidas(HNB, "Angulo H.(N-B)"));
                        listaMedidas.add(new Medidas(medidaPnPgLs, "Linha H-nariz"));
                        listaMedidas.add(new Medidas(PogNB, "Angulo Pog-NB"));
                        listaMedidas.add(new Medidas(GoMe, "Emin�ncia Mentoniana"));
                        listaMedidas.add(new Medidas(FMA, "angulo FMA"));
                        listaMedidas.add(new Medidas(FMIA, "angulo FMIA"));
                        listaMedidas.add(new Medidas(IMPA, "angulo IMPA"));
                        listaMedidas.add(new Medidas(TPi, "distancia TPi"));
                        listaMedidas.add(new Medidas(UMI, "/1-Linha I"));
                        listaMedidas.add(new Medidas(GoMeVT, "Angulo ( Go-Me).(V-T)"));
                        listaMedidas.add(new Medidas(FVT, "Angulo F.(V-T)"));
                        listaMedidas.add(new Medidas(AVT, "Dist�ncia A-(V-T)"));
                        listaMedidas.add(new Medidas(liiVT, "Dist�ncia lii(V-T)"));
                        listaMedidas.add(new Medidas(HVT, "AnguloH.(V-T)"));


                        }

                        public ArrayList<Medidas> getListaMedidas() {
                            return listaMedidas;
                            }

                            public void setListaMedidas(ArrayList<Medidas> listaMedidas) {
                                this.listaMedidas = listaMedidas;
                                }


                                }
                                ?>