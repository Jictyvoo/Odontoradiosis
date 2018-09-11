<?php
/*
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/

/**
*
* @author Beatriz de Brito Santana
*/
class TracadoUnicamp implements Tracado {

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
            }else if (listadePontos.get(i).getNome().equals("Cd")) {
            PontosCefalometricos ponto = listadePontos.set(41, listadePontos.get(i));
            listadePontos.set(i, ponto);
            }else if (listadePontos.get(i).getNome().equals("C")) {
            PontosCefalometricos ponto = listadePontos.set(42, listadePontos.get(i));
            listadePontos.set(i, ponto);
            }
            }



            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y); //N-A
            g.drawLine(listadePontos.get(0).getPonto().x, listadePontos.get(0).getPonto().y, listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y); //S-N
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(10).getPonto().x, listadePontos.get(10).getPonto().y); //N-B
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(29).getPonto().x, listadePontos.get(29).getPonto().y); //N-D
            //Medida AO-BO
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(14).getPonto().x, listadePontos.get(14).getPonto().y); //N-Me
            g.drawLine(listadePontos.get(16).getPonto().x, listadePontos.get(16).getPonto().y, listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y); //Co-A
            g.drawLine(listadePontos.get(16).getPonto().x, listadePontos.get(16).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y); //Co-Gn
            g.drawLine(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y); //Go-Gn
            g.drawLine(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(41).getPonto().x, listadePontos.get(41).getPonto().y); //Go-Cd
            g.drawLine(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(14).getPonto().x, listadePontos.get(14).getPonto().y); //Go-Me
            g.drawLine(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(42).getPonto().x, listadePontos.get(42).getPonto().y); //Go-C
            g.drawLine(listadePontos.get(34).getPonto().x, listadePontos.get(34).getPonto().y, listadePontos.get(35).getPonto().x, listadePontos.get(35).getPonto().y); //Plano oclusal
            g.drawLine(listadePontos.get(0).getPonto().x, listadePontos.get(0).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y); //S-Gn
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y); //N-Gn
            g.drawLine(listadePontos.get(0).getPonto().x, listadePontos.get(0).getPonto().y, listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y); //S-Go
            g.drawLine(listadePontos.get(36).getPonto().x, listadePontos.get(36).getPonto().y, listadePontos.get(37).getPonto().x, listadePontos.get(37).getPonto().y); // longo eixo do incisivo superior
            g.drawLine(listadePontos.get(39).getPonto().x, listadePontos.get(39).getPonto().y, listadePontos.get(40).getPonto().x, listadePontos.get(40).getPonto().y); // longo eixo do incisivo inferior
            g.drawLine(listadePontos.get(8).getPonto().x, listadePontos.get(8).getPonto().y, listadePontos.get(12).getPonto().x, listadePontos.get(12).getPonto().y); //P'-E
            g.drawLine(listadePontos.get(22).getPonto().x, listadePontos.get(22).getPonto().y, listadePontos.get(20).getPonto().x, listadePontos.get(20).getPonto().y); //Pg'-Ls

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
                listadePontos.add(new PontosCefalometricos(new Point(), "Cd"));
                listadePontos.add(new PontosCefalometricos(new Point(), "C"));


                return listadePontos;
                }

                public void setListaPontos(ArrayList<PontosCefalometricos> pontos) {
                    this.listadePontos = pontos;
                    }

                    public void calcularMedidas() {


                    listaMedidas = new ArrayList<Medidas>();
                        Calculos calcula = new Calculos();


                        //�ngulo SNA
                        float SNA = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(6), listadePontos.get(2));

                        //�ngulo SNB
                        float SNB = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(10), listadePontos.get(2));

                        //�ngulo ANB - na e nb
                        float NANB = (float) calcula.calcularAngulo(listadePontos.get(2), listadePontos.get(6), listadePontos.get(2), listadePontos.get(10));

                        //�ngulo SND
                        float SND = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(29), listadePontos.get(2));

                        // Medida AO-BO
                        float medidaAOBO = (float) (Point.distance(listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y, listadePontos.get(10).getPonto().x, listadePontos.get(10).getPonto().y) * 0.264583);

                        //Angulo Pog-NB
                        //Dist�ncia do ponto Pog � linha NB.
                        float PogNB = (float) (Point.distance(listadePontos.get(11).getPonto().x, listadePontos.get(11).getPonto().y, listadePontos.get(2).getPonto().x, listadePontos.get(10).getPonto().y) * 0.264583);

                        //distancia n-me
                        float distanciaNME = (float) (Point.distance(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(14).getPonto().x, listadePontos.get(14).getPonto().y) * 0.264583);

                        //Dist�ncia Comprimento maxilar( Co-A)
                        float distanciaCOA = (float) (Point.distance(listadePontos.get(16).getPonto().x, listadePontos.get(16).getPonto().y, listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y) * 0.264583);

                        //Dist�ncia Go-Gn
                        float distanciaGOGN = (float) (Point.distance(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y) * 0.264583);

                        // Dist�ncia Go-Cd
                        float distanciaGOCD = (float) (Point.distance(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(41).getPonto().x, listadePontos.get(41).getPonto().y) * 0.264583);

                        //Angulo Gon�aco - goMe e CGo
                        float anguloGoniaco = (float) calcula.calcularAngulo(listadePontos.get(15), listadePontos.get(14), listadePontos.get(42), listadePontos.get(15));

                        //Plano Oclusal
                        float planoOclusal = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(34), listadePontos.get(35));

                        //eixo y - plano horizontal de frankfurt e a linha SGn.
                        float eixoy = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(0), listadePontos.get(13));

                        //Angulo SN.GoGn
                        float SNGOGN = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(15), listadePontos.get(13));

                        //�ngulo S-N.Gn - SN e NGn
                        float SNGN = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(2), listadePontos.get(13));

                        //AFA - SGO
                        float AFA = (float) (Point.distance(listadePontos.get(0).getPonto().x, listadePontos.get(0).getPonto().y, listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y) * 0.264583);

                        //AFP - NMe
                        float AFP = (float) (Point.distance(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(14).getPonto().x, listadePontos.get(14).getPonto().y) * 0.264583);

                        //Angulo FMA
                        float FMA = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(15), listadePontos.get(13));

                        //Angulo FMIA - Frankfurt com o longo eixo dos incisivos inferiores.
                        float FMIA = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(39), listadePontos.get(40));

                        //Angulo IMPA
                        float IMPA = (float) calcula.calcularAngulo(listadePontos.get(15), listadePontos.get(13), listadePontos.get(39), listadePontos.get(40));

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

                        ///1-Linha I
                        float UMI = (float) (Point.distance(listadePontos.get(39).getPonto().x, listadePontos.get(39).getPonto().y, listadePontos.get(8).getPonto().x, listadePontos.get(12).getPonto().y) * 0.264583);

                        //---------------�ngulo Z---------------
                        //angulo entre a RetaH e RetaPoOr
                        // reta H = Pog' e LS
                        float anguloz = (float) calcula.calcularAngulo(listadePontos.get(22), listadePontos.get(20), listadePontos.get(3), listadePontos.get(4));

                        //Angulo H.(N-B)
                        float HNB = (float) calcula.calcularAngulo(listadePontos.get(22), listadePontos.get(20), listadePontos.get(2), listadePontos.get(10));

                        //Linha H-nariz
                        //linha H = Pg'Ls
                        //ponto Pn e a linha Pg'Ls.
                        float medidaPnPgLs = calcula.calcularMedida(listadePontos.get(22), listadePontos.get(20), listadePontos.get(17));

                        listaMedidas.add(new Medidas(SNA, "Angulo SNA"));
                        listaMedidas.add(new Medidas(SNB, "Angulo SNB"));
                        listaMedidas.add(new Medidas(NANB, "angulo ANB"));
                        listaMedidas.add(new Medidas(SND, "angulo SND"));
                        listaMedidas.add(new Medidas(medidaAOBO, "medida AOBO"));
                        listaMedidas.add(new Medidas(PogNB, "Angulo Pog-NB"));
                        listaMedidas.add(new Medidas(distanciaNME, "distancia n-me"));
                        listaMedidas.add(new Medidas(distanciaCOA, "Comprimento maxilar( Co-A)"));
                        listaMedidas.add(new Medidas(distanciaGOGN, "Dist�ncia Go-Gn"));
                        listaMedidas.add(new Medidas(distanciaGOCD, "Dist�ncia Go-Cd "));
                        listaMedidas.add(new Medidas(anguloGoniaco, "Angulo Gon�aco"));
                        listaMedidas.add(new Medidas(planoOclusal, "Plano Oclusal"));
                        listaMedidas.add(new Medidas(eixoy, "Eixo y"));
                        listaMedidas.add(new Medidas(SNGOGN, "Angulo SN.GoGn"));
                        listaMedidas.add(new Medidas(SNGN, "Angulo S-N.Gn"));
                        listaMedidas.add(new Medidas(AFA, "AFA"));
                        listaMedidas.add(new Medidas(AFP, "AFP"));
                        listaMedidas.add(new Medidas(FMA, "Angulo FMA"));
                        listaMedidas.add(new Medidas(FMIA, "Angulo FMIA"));
                        listaMedidas.add(new Medidas(IMPA, "Angulo IMPA"));
                        listaMedidas.add(new Medidas(UMNA, "Angulo l.NA"));
                        listaMedidas.add(new Medidas(medidaUMNA, "Medida l-NA"));
                        listaMedidas.add(new Medidas(UMNB, "Angulo /1.NB"));
                        listaMedidas.add(new Medidas(medidaUMNB, "Medida 1-NB"));
                        listaMedidas.add(new Medidas(UMI, "1-Linha I"));
                        listaMedidas.add(new Medidas(anguloz, "Angulo Z"));
                        listaMedidas.add(new Medidas(HNB, "Angulo H.(N-B)"));
                        listaMedidas.add(new Medidas(medidaPnPgLs, "Linha H-nariz"));
                        }

                        public ArrayList<Medidas> getListaMedidas() {
                            return listaMedidas;
                            }

                            public void setListaMedidas(ArrayList<Medidas> listaMedidas) {
                                this.listaMedidas = listaMedidas;
                                }

                                }
                                ?>