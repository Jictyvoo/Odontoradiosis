<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BezierCurveController;
use App\Http\Controllers\ImageLandmarkController;
use Illuminate\Support\Facades\DB;

class SemiautomaticLandmarkController extends Controller {

    private array $semiautomaticFunctions;
    private array $globalPoints;

    private static function generateSemiautomaticFunctions() {
        $temporary = array();
        /* calculateSela */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["sela-túrcica"];
            $x = ($curvePoints[0][6] + $curvePoints[1][0] + $curvePoints[1][2] + $curvePoints[1][4]) / 4;
            $y = ($curvePoints[0][7] + $curvePoints[1][1] + $curvePoints[1][3] + $curvePoints[1][5]) / 4;
            $globalPoints["Sela (S)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculateNasio */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["sutura-fronto-nasal"];
            $x = $curvePoints[0][0];
            $y = $curvePoints[0][1];
            $globalPoints["Násio (N)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculateENA */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["maxila"];
            $x = $curvePoints[1][4];
            $y = $curvePoints[1][5];
            $globalPoints["Espinha nasal anterior (ENA)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculateA */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["maxila"];
            $x = $curvePoints[2][0];
            $y = $curvePoints[2][1];
            $globalPoints["Ponto subespinhal (A)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculateGnatio */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["mandíbula"];
            $x = $curvePoints[3][4];
            $y = $curvePoints[3][5];
            $globalPoints["Gnátio (Gn)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculatePalatoMole */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints_1 = $bezierCurves["mandíbula"];
            $curvePoints_2 = $bezierCurves["maxila"];
            $x1 = $curvePoints_2[0][6];
            $y1 = $curvePoints_2[0][7];
            $x2 = $curvePoints_1[0][2];
            $y2 = $curvePoints_1[0][3];
            $x = ($x1 + $x2) / 2;
            $y = ($y1 + $y2) / 2;
            $globalPoints["Palato Mole (pm)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculateB */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints_1 = $bezierCurves["mandíbula"];
            $curvePoints_2 = $bezierCurves["perfil-mole"];
            $x1 = $curvePoints_2[5][2];
            $y1 = $curvePoints_2[5][3];
            $x2 = $curvePoints_1[4][4];
            $y2 = $curvePoints_1[4][5];
            $x = ($x1 + $x2) / 2;
            $y = ($y1 + $y2) / 2;
            $globalPoints["Ponto pupramental (B)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculateProNasal */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["perfil-mole"];
            $x = $curvePoints[0][6];
            $y = $curvePoints[0][7];
            $globalPoints["Pró-nasal (Pn)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculatePogonioMole */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["perfil-mole"];
            $x = $curvePoints[5][4];
            $y = $curvePoints[5][5];
            $globalPoints["Pogônio Mole (Pg)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculateENP */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["maxila"];
            $x = $curvePoints[0][6];
            $y = $curvePoints[0][7];
            $globalPoints["Espinha nasal posterior (ENP)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculateCondilio */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints_1 = $bezierCurves["fissura-pterigomaxilar"];
            $curvePoints_2 = $bezierCurves["mandíbula"];
            $curvePoints_3 = $bezierCurves["pório-anatômico"];
            $x1 = $curvePoints_3[0][6];
            $y1 = $curvePoints_3[0][7];
            $x2 = $curvePoints_1[0][2];
            $y2 = $curvePoints_1[0][3];
            $x = ($x1 + $x2) / 2;
            $y = ($y1 + $y2) / 2;
            $globalPoints["Condílio (Co)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculatePogonio */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints_1 = $bezierCurves["perfil-mole"];
            $curvePoints_2 = $bezierCurves["mandíbula"];
            $x1 = $curvePoints_1[5][4];
            $y1 = $curvePoints_1[5][5];
            $x2 = $curvePoints_2[3][4];
            $y2 = $curvePoints_2[3][5];
            $x3 = ($x1 + $x2) / 2;
            $y3 = ($y1 + $y2) / 2;

            $x4 = $curvePoints_1[5][4];
            $y4 = $curvePoints_1[5][5];
            $x5 = $curvePoints_2[4][4];
            $y5 = $curvePoints_2[4][5];
            $x6 = ($x4 + $x5) / 2;
            $y6 = ($y4 + $y5) / 2;

            $x = ($x2 + $x3 + $x6) / 3;
            $y = ($y2 + $y3 + $y6) / 3;

            $globalPoints["Pogônio (Pog)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /* calculateMento */
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["mandíbula"];
            $x1 = $curvePoints[3][4];
            $y1 = $curvePoints[3][5];
            $x2 = $curvePoints[4][0];
            $y2 = $curvePoints[4][1];
            $x3 = ($x1 + $x2) / 2;
            $y3 = ($y1 + $y2) / 2;
            $x = ($x1 + $x3) / 2;
            $y = ($y1 + $y3) / 2;
            $globalPoints["Mento (Me)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /*calculateGonio*/
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["mandíbula"];
            $x1 = $curvePoints[2][4];
            $y1 = $curvePoints[2][5];
            $x2 = $curvePoints[3][0];
            $y2 = $curvePoints[3][1];
            $x = ($x1 + $x2) / 2;
            $y = $y2;
            $globalPoints["Gônio (Go)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /*calculateOrbitale*/
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["borda-póstero-inferior"];
            $x1 = $curvePoints[0][4];
            $y1 = $curvePoints[0][7];
            $x2 = $curvePoints[0][0];
            $y2 = $curvePoints[0][5];
            $x = ($x1 + $x2) / 2;
            $y = ($y1 * 0.9) + ($y2 * 0.1);
            $globalPoints["Órbitário (Or)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /*calculatePorio*/
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["pório-anatômico"];
            $total = 0;
            $average = array('x' => 0, 'y' => 0);
            for ($counter = 0; $counter < count($curvePoints); $counter++) {
                $subCurve = $curvePoints[$counter];
                for ($index = 0; $index < count($subCurve); $index += 2) {
                    $average['x'] += $subCurve[$index];
                    $average['y'] += $subCurve[$index + 1];
                    $total += 1;
                }
            }
            $x = $average['x'] / $total;
            $y = $average['y'] / $total;
            $globalPoints["Pório (Po)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /*calculatePontaNariz*/
        //Ponta do Nariz (PtN)

        /*calculateFossaPterigoMaxilar*/
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["fissura-pterigomaxilar"];
            $x1 = $curvePoints[0][4];
            $y1 = $curvePoints[0][5];
            $x2 = $curvePoints[0][6];
            $y2 = $curvePoints[0][7];
            $x = ($x1 * 0.25) + ($x2 * 0.75);
            $y = ($y1 * 0.5) + ($y2 * 0.5);
            $globalPoints["Fossa Ptérigo Maxilar (Fpm)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        /*calculatePterigoide*/
        array_push($temporary, function (array $bezierCurves, $globalPoints) {
            $curvePoints = $bezierCurves["fissura-pterigomaxilar"];
            $x1 = $curvePoints[0][4];
            $y1 = $curvePoints[0][5];
            $x2 = $curvePoints[0][6];
            $y2 = $curvePoints[0][7];
            $x = ($x1 * 0.1) + ($x2 * 0.9);
            $y = ($y1 * 0.8) + ($y2 * 0.2);
            $globalPoints["Pterigóide (Pt)"] = array('x' => $x, 'y' => $y);
            return $globalPoints;
        });

        return $temporary;
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth');
        $this->semiautomaticFunctions = SemiautomaticLandmarkController::generateSemiautomaticFunctions();
        $this->globalPoints = array();
    }

    private function generateDateTime() {
        return (new \DateTime())->format('Y-m-d H:i:s');
    }

    /**
     * @return int
     */
    private function insertData(string $table_name, array $data) {
        $data['created_at'] = $this->generateDateTime();
        $data['updated_at'] = $this->generateDateTime();
        return DB::table($table_name)->insertGetId($data);
    }

    private function updateData(int $landmarkId, array $pointsLocation, string $position, array $dictionaryLandmark) {
        $updateData = array('updated_at' => $this->generateDateTime());
        foreach ($pointsLocation as $key => $value) {
            $updateData[$dictionaryLandmark[$key]] = $value[$position];
        }
        DB::table('landmarks')->where('id_landmark', $landmarkId)
            ->update($updateData);
    }

    private function saveLandmarks() {
        $userId = auth()->user()->id;
        $landmarksId = array();
        $imageLandmarks = DB::table('image_landmarks')->where('fk_id_doctor', $userId)->get();
        $dictionaryLandmark = ImageLandmarkController::getDictionaryLandmarks();
        foreach ($imageLandmarks as $noCare => $value) {
            $landmarksId[$value->fk_id_image] = array(
                'x' => $value->fk_landmark_x,
                'y' => $value->fk_landmark_y,
            );
        }
        foreach ($this->globalPoints as $key => $value) {
            if (!array_key_exists($key, $landmarksId)) {
                $landmarksId[$key] = array(
                    'x' => $this->insertData('landmarks', array()),
                    'y' => $this->insertData('landmarks', array()),
                );
                $this->insertData('image_landmarks', array(
                    'fk_id_image' => $key,
                    'fk_id_doctor' => $userId,
                    'fk_landmark_x' => $landmarksId[$key]['x'],
                    'fk_landmark_y' => $landmarksId[$key]['y'],
                ));
            }
            $this->updateData($landmarksId[$key]['x'], $value, 'x', $dictionaryLandmark);
            $this->updateData($landmarksId[$key]['y'], $value, 'y', $dictionaryLandmark);
        }
    }

    public function run(int $quantity) {
        $imageIds = DB::table('images')->select('id')->get();
        $counter = 0;
        foreach ($imageIds as $noCare => $imageObj) {
            if ($counter > $quantity) {
                $this->saveLandmarks();
                //return response()->json($this->globalPoints);
                return redirect('home');
            }
            $currentId = intval($imageObj->id);
            $this->globalPoints[$currentId] = array();
            $bezierString = BezierCurveController::toJsonCurve($currentId, false);
            $bezierCurves = json_decode($bezierString, true);
            foreach ($this->semiautomaticFunctions as $functionName => $callback) {
                $this->globalPoints[$currentId] = $callback($bezierCurves, $this->globalPoints[$currentId]);
            }
            $counter += 1;
        }
    }

}
