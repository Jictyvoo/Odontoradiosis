<?php
/*
* To change this template, choose Tools | Templates
* and open the template in the editor.
*/


/**
*
* @author João Victor Oliveira Couto
*/
class TracadoUnespAraraquara implements Tracado {

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
            } else if (listadePontos.get(i).getNome().equals("labio inferior")) {
            PontosCefalometricos ponto = listadePontos.set(41, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("meio nariz")) {
            PontosCefalometricos ponto = listadePontos.set(42, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("vestibular da  coroa do dente")) {
            PontosCefalometricos ponto = listadePontos.set(43, listadePontos.get(i));
            listadePontos.set(i, ponto);
            } else if (listadePontos.get(i).getNome().equals("lingual do incisivo inferior ")) {
            PontosCefalometricos ponto = listadePontos.set(44, listadePontos.get(i));
            listadePontos.set(i, ponto);
            }
            }


            g.drawLine(listadePontos.get(0).getPonto().x, listadePontos.get(0).getPonto().y, listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y); //S-N
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y); //N-A
            g.drawLine(listadePontos.get(3).getPonto().x, listadePontos.get(3).getPonto().y, listadePontos.get(4).getPonto().x, listadePontos.get(4).getPonto().y); //Po-Or
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y+5000); //Nperp (a-nperp e pg-nperp)
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(10).getPonto().x, listadePontos.get(10).getPonto().y); //N-B
            g.drawLine(listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y, listadePontos.get(11).getPonto().x, listadePontos.get(11).getPonto().y); //N-Pg
            g.drawLine(listadePontos.get(34).getPonto().x, listadePontos.get(34).getPonto().y, listadePontos.get(35).getPonto().x, listadePontos.get(35).getPonto().y); //Plano oclusal
            g.drawLine(listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y, listadePontos.get(16).getPonto().x, listadePontos.get(16).getPonto().y); //A-Co
            g.drawLine(listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y, listadePontos.get(16).getPonto().x, listadePontos.get(16).getPonto().y); //Gn-Co
            g.drawLine(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(14).getPonto().x, listadePontos.get(14).getPonto().y); //Go-Me
            g.drawLine(listadePontos.get(15).getPonto().x, listadePontos.get(15).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y); //Go-Gn
            g.drawLine(listadePontos.get(7).getPonto().x, listadePontos.get(7).getPonto().y, listadePontos.get(9).getPonto().x, listadePontos.get(9).getPonto().y); //ENA-ENP
            g.drawLine(listadePontos.get(1).getPonto().x, listadePontos.get(1).getPonto().y, listadePontos.get(2).getPonto().x, listadePontos.get(2).getPonto().y); //Ba-N
            g.drawLine(listadePontos.get(5).getPonto().x, listadePontos.get(5).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y); //Pt-Gn
            g.drawLine(listadePontos.get(36).getPonto().x, listadePontos.get(36).getPonto().y, listadePontos.get(37).getPonto().x, listadePontos.get(37).getPonto().y); // longo eixo do incisivo superior
            g.drawLine(listadePontos.get(39).getPonto().x, listadePontos.get(39).getPonto().y, listadePontos.get(40).getPonto().x, listadePontos.get(40).getPonto().y); // longo eixo do incisivo inferior
            g.drawLine(listadePontos.get(20).getPonto().x, listadePontos.get(20).getPonto().y, listadePontos.get(19).getPonto().x, listadePontos.get(19).getPonto().y); //Ls-Sn
            g.drawLine(listadePontos.get(19).getPonto().x, listadePontos.get(19).getPonto().y, listadePontos.get(18).getPonto().x, listadePontos.get(18).getPonto().y); //Sn-Cm
            g.drawLine(listadePontos.get(22).getPonto().x, listadePontos.get(22).getPonto().y, listadePontos.get(20).getPonto().x, listadePontos.get(20).getPonto().y); //Pg'-Ls
            g.drawLine(listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y, listadePontos.get(11).getPonto().x, listadePontos.get(11).getPonto().y); //A-Pg


            //linha tracejada
            final float dash1[] = {10.0f};
            final BasicStroke dashed = new BasicStroke(1.0f,
            BasicStroke.CAP_BUTT,
            BasicStroke.JOIN_MITER,
            10.0f, dash1, 0.0f);
            Graphics2D g2 = (Graphics2D) g;
            g2.setStroke(dashed);

            g2.drawLine(listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y, listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y+200); //A pra baixo perpendicular
            g2.drawLine(listadePontos.get(10).getPonto().x, listadePontos.get(10).getPonto().y, listadePontos.get(10).getPonto().x, listadePontos.get(10).getPonto().y-200); //B pra cima perpendicular


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
                listadePontos.add(new PontosCefalometricos(new Point(), "Cm"));
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
                listadePontos.add(new PontosCefalometricos(new Point(), "labio inferior"));
                listadePontos.add(new PontosCefalometricos(new Point(), "meio nariz"));
                listadePontos.add(new PontosCefalometricos(new Point(), "vestibular da  coroa do dente"));
                listadePontos.add(new PontosCefalometricos(new Point(), "lingual do incisivo inferior"));


                return listadePontos;
                }

                public void setListaPontos(ArrayList<PontosCefalometricos> pontos) {
                    this.listadePontos = pontos;
                    }

                    public void calcularMedidas() {

                    listaMedidas = new ArrayList<Medidas>();
                        Calculos calcula = new Calculos();

                        //---------------�ngulo SN-NA--------------- OK
                        float SNA = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(6), listadePontos.get(2));


                        //---------------Distancia A-Nperp--------------- ok
                        //v� a dist�ncia entre o ponto A e o novo ponto que tem o x do N e o y do A, ou seja, na dire��o da perpendicular do N e do A.
                        //a multiplica��o do final transforma o valor de px para mil�metros
                        //A ponto 6, N ponto 2
                        double distancia =  Point.distance(listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y, listadePontos.get(2).getPonto().x, listadePontos.get(6).getPonto().y) * 0.264583;
                        float anperp;
                        if(listadePontos.get(6).getPonto().x  <  listadePontos.get(2).getPonto().x){
                        anperp = (float) (distancia * (-1));
                        }else
                        anperp = (float) distancia;



                        //---------------�ngulo SNB--------------- OK
                        float SNB = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(10), listadePontos.get(2));




                        //---------------Distancia Pg-Nperp--------------- ok
                        //mesma coisa da medida A-Nperp
                        // Pg ponto 11, N ponto 2
                        double distancia2 =  Point.distance(listadePontos.get(11).getPonto().x, listadePontos.get(11).getPonto().y, listadePontos.get(2).getPonto().x, listadePontos.get(11).getPonto().y) * 0.264583;
                        float pgnperp;
                        if(listadePontos.get(11).getPonto().x  <  listadePontos.get(2).getPonto().x){
                        pgnperp = (float) (distancia2 * (-1));
                        }else
                        pgnperp = (float) distancia2;


                        //---------------�ngulo FNP--------------- ok
                        // angulo entre Po-Or e N-Pg
                        float FNP = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(2), listadePontos.get(11));



                        //---------------�ngulo ANB--------------- OK
                        float ANB = (float) calcula.calcularAngulo(listadePontos.get(6), listadePontos.get(2), listadePontos.get(10), listadePontos.get(2));



                        //---------------Distancia WIT�s--------------- ok
                        //(Xb, Yb, Xa, Yb) distancia entre as retas perpedinculares ao plano oclusal
                        // B � o ponto 10 e A � o ponto 6
                        double distancia3 =  Point.distance(listadePontos.get(10).getPonto().x, listadePontos.get(10).getPonto().y, listadePontos.get(6).getPonto().x, listadePontos.get(10).getPonto().y) * 0.264583;
                        float wits;
                        if(listadePontos.get(6).getPonto().x  <  listadePontos.get(10).getPonto().x){
                        wits = (float) (distancia3 * (-1));
                        }else
                        wits = (float) distancia3;



                        //---------------Dist�ncia Co-A--------------- OK
                        float distanciaCOA =  (float) (Point.distance(listadePontos.get(16).getPonto().x, listadePontos.get(16).getPonto().y, listadePontos.get(6).getPonto().x, listadePontos.get(6).getPonto().y) * 0.264583);

                        //---------------Dist�ncia Co-Gn--------------- OK
                        float distanciaCOGN =  (float) (Point.distance(listadePontos.get(16).getPonto().x, listadePontos.get(16).getPonto().y, listadePontos.get(13).getPonto().x, listadePontos.get(13).getPonto().y) * 0.264583);

                        float proporcaoMaxMan = distanciaCOA - distanciaCOGN;



                        //---------------Medida AFAI--------------- ok
                        //medida afai - ena-me
                        float medidaAFAI =  (float) (Point.distance(listadePontos.get(7).getPonto().x, listadePontos.get(7).getPonto().y, listadePontos.get(14).getPonto().x, listadePontos.get(14).getPonto().y) * 0.264583);





                        //---------------�ngulo SN.GoMe--------------- ok
                        //linha SN com GoMe
                        float SNGOME = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(15), listadePontos.get(14));




                        //---------------�ngulo FMA--------------- ok
                        //Po-Or e Go-Gn
                        float FMA = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(15), listadePontos.get(13));






                        //---------------�ngulo F.Pp--------------- ok
                        //Po-Or e ENA-ENP
                        float FPP = (float) calcula.calcularAngulo(listadePontos.get(3), listadePontos.get(4), listadePontos.get(7), listadePontos.get(9));



                        //---------------Eixo Facial--------------- ok
                        //BaN com PtGn
                        float BaNPtGn = (float) calcula.calcularAngulo(listadePontos.get(1), listadePontos.get(2), listadePontos.get(5), listadePontos.get(13));


                        //---------------�ngulo SN.Plo--------------- ok
                        //SN com o plano oclusal
                        float SnPlo = (float) calcula.calcularAngulo(listadePontos.get(0), listadePontos.get(2), listadePontos.get(34), listadePontos.get(35));



                        //---------------�ngulo 1/.NA--------------- ok
                        //�ngulo formado pela intersec��o do longo eixo do incisivo superior com a linha NA.
                        float UMNA = (float) calcula.calcularAngulo(listadePontos.get(2), listadePontos.get(6), listadePontos.get(36), listadePontos.get(37));




                        //---------------�ngulo /1.NB--------------- ok
                        //�ngulo formado pela intersec��o do longo eixo do incisivo superior com a linha NA.
                        float UMNB = (float) calcula.calcularAngulo(listadePontos.get(2), listadePontos.get(10), listadePontos.get(39), listadePontos.get(40));





                        //---------------Medida 1-NA--------------- OK
                        //Medida linear do ponto mais vestibular da coroa do incisivo superior at� a linha NA
                        //coroa ponto 38, 6 ponto A, 2 ponto N
                        float medidaUMNA = calcula.calcularMedida(listadePontos.get(6), listadePontos.get(2), listadePontos.get(38));






                        //---------------Medida 1-NB--------------- ok
                        //Medida linear do ponto mais vestibular da coroa do incisivo superior at� a linha NB
                        //coroa ponto 38, B ponto 10, 2 ponto N
                        float medidaUMNB = calcula.calcularMedida(listadePontos.get(10), listadePontos.get(2), listadePontos.get(38));






                        //---------------Propor��o Pg-NB: 1-NB--------------- OK
                        //Medida Pg-NB
                        //PG ponto 11, B ponto 10, 2 ponto N
                        // F = ponto N
                        // E = ponto B
                        // C = Pg
                        float medidaPgNB = calcula.calcularMedida(listadePontos.get(2), listadePontos.get(10), listadePontos.get(11));
                        float proporcaoPGNB = medidaPgNB - medidaUMNB;





                        //---------------Angulo /1.1/--------------- ok
                        //longos eixos dos incisivos superior e longo eixos do incisivo inferior
                        float UMUM = (float) calcula.calcularAngulo(listadePontos.get(36), listadePontos.get(37), listadePontos.get(39), listadePontos.get(40));





                        //---------------Medida \1-STs---------------
                        //Projeta-se uma linha horizontal passando pela borda incisal do incisivo superior e paralela ao plano oclusal
                        //  /1 ponto 40, sts 21
                        float medida1Sts = calcula.calcularMedida(listadePontos.get(40), listadePontos.get(40), listadePontos.get(21));





                        //---------------�ngulo IMPA--------------- ok
                        //longo eixo do incisivo inferior com o plano mandibular (GoGn).
                        float IMPA = (float) calcula.calcularAngulo(listadePontos.get(15), listadePontos.get(13), listadePontos.get(39), listadePontos.get(40));



                        //---------------�ngulo \1.Pp--------------- ok
                        float UMPp = (float) calcula.calcularAngulo(listadePontos.get(36), listadePontos.get(37), listadePontos.get(7), listadePontos.get(9));


                        //----------- �ngulo nasolabial ----------- ok
                        //LsSn com SnCm
                        float nasolabial = (float) calcula.calcularAngulo(listadePontos.get(20), listadePontos.get(19), listadePontos.get(18), listadePontos.get(19));



                        //---------------Linha H-nariz--------------- OK
                        //Dist�ncia entre o ponto Pn e a linha Pg�Ls
                        //Pg' ponto 22, Pn ponto 17, Ls ponto 20
                        float medidaPnPgLs = calcula.calcularMedida(listadePontos.get(22), listadePontos.get(20), listadePontos.get(17));





                        //---------------�ngulo Z---------------
                        //angulo entre a RetaH e RetaPoOr
                        // reta H = Pog' e LS
                        float anguloz = (float) calcula.calcularAngulo(listadePontos.get(22), listadePontos.get(20), listadePontos.get(3), listadePontos.get(4));


                        //--------------- Linha S ---------------
                        //Medida ls at� a linha PgMn (Pg - meio do nariz)
                        //ls ponto 20,  11 ponto pg, 42 meio do nariz
                        float distS1 = calcula.calcularMedida(listadePontos.get(11), listadePontos.get(42), listadePontos.get(20));
                        //li ponto 41, 11 ponto pg, 42 meio do nariz
                        float distS2 = calcula.calcularMedida(listadePontos.get(11), listadePontos.get(42), listadePontos.get(41));

                        float linhaS = distS1/distS2;




                        //Linha I
                        float linhaI =  (float) (Point.distance(listadePontos.get(8).getPonto().x, listadePontos.get(12).getPonto().y, listadePontos.get(44).getPonto().x, listadePontos.get(44).getPonto().y) * 0.264583);

                        //Linha A-Pg
                        float linhaAPG =  (float) (Point.distance(listadePontos.get(6).getPonto().x, listadePontos.get(11).getPonto().y, listadePontos.get(43).getPonto().x, listadePontos.get(43).getPonto().y) * 0.264583);


                        //--------------- Dist�ncia ad-pm --------------- ok
                        float distanciaADPM =  (float) (Point.distance(listadePontos.get(23).getPonto().x, listadePontos.get(23).getPonto().y, listadePontos.get(24).getPonto().x, listadePontos.get(24).getPonto().y) * 0.264583);



                        //--------------- Dist�ncia bf-bl  --------------- ok
                        float distanciaBFBL =  (float) (Point.distance(listadePontos.get(26).getPonto().x, listadePontos.get(26).getPonto().y, listadePontos.get(25).getPonto().x, listadePontos.get(25).getPonto().y) * 0.264583);



                        //FALTAM CALCULOS
                        listaMedidas.add(new Medidas(SNA, "angulo SNA"));
                        listaMedidas.add(new Medidas(anperp, "medida A-Nperp"));
                        listaMedidas.add(new Medidas(SNB, "angulo SNB"));
                        listaMedidas.add(new Medidas(pgnperp, "medida Pg-Nperp"));
                        listaMedidas.add(new Medidas(FNP, "angulo FNP"));
                        listaMedidas.add(new Medidas(ANB, "angulo ANB"));
                        listaMedidas.add(new Medidas(wits, "medida WIT�s"));
                        listaMedidas.add(new Medidas(distanciaCOA, "Distancia Co-A"));
                        listaMedidas.add(new Medidas(distanciaCOGN, "Distancia Co-Gn"));
                        listaMedidas.add(new Medidas(proporcaoMaxMan, "Rela��o entre maxila e mand�bula"));
                        listaMedidas.add(new Medidas(medidaAFAI, "medida medidaAFAI"));
                        listaMedidas.add(new Medidas(SNGOME, "angulo SN.GoMe"));
                        listaMedidas.add(new Medidas(FMA, "angulo FMA"));
                        listaMedidas.add(new Medidas(FPP, "angulo F.Pp"));
                        listaMedidas.add(new Medidas(BaNPtGn, "Eixo Facial"));
                        listaMedidas.add(new Medidas(SnPlo, "angulo SN.Plo"));
                        listaMedidas.add(new Medidas(UMNA, "angulo 1/.NA"));
                        listaMedidas.add(new Medidas(medidaUMNA, "medida 1/.NA"));
                        listaMedidas.add(new Medidas(medidaUMNB, "medida 1/.NB"));
                        listaMedidas.add(new Medidas(proporcaoPGNB, "Propor��o Pg-NB: 1.NB"));
                        listaMedidas.add(new Medidas(UMUM, "Angulo /1.1/"));
                        listaMedidas.add(new Medidas(medida1Sts, "Medida 1.Sts"));
                        listaMedidas.add(new Medidas(IMPA, "Angulo IMPA"));
                        listaMedidas.add(new Medidas(UMPp, "Angulo \1.Pp"));
                        listaMedidas.add(new Medidas(nasolabial, "Angulo nasolabial"));
                        listaMedidas.add(new Medidas(medidaPnPgLs, "Linha H-nariz"));
                        listaMedidas.add(new Medidas(anguloz, "Angulo z"));
                        listaMedidas.add(new Medidas(linhaS, "Linha S"));
                        listaMedidas.add(new Medidas(linhaAPG, "Linha A-Pg"));
                        listaMedidas.add(new Medidas(linhaI, "Linha I"));
                        listaMedidas.add(new Medidas(distanciaADPM, "Medida aden�ide"));
                        listaMedidas.add(new Medidas(distanciaBFBL, "Medida am�gdala"));

                        }

                        public ArrayList<Medidas> getListaMedidas() {
                            return listaMedidas;
                            }

                            public void setListaMedidas(ArrayList<Medidas> listaMedidas) {
                                this.listaMedidas = listaMedidas;
                                }

                                }
                                ?>
