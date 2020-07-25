<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AnalyzerController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth');
    }

    private function get_dpi($filename) {
        $a = fopen($filename, 'r');
        $string = fread($a, 20);
        fclose($a);

        $data = bin2hex(substr($string, 14, 4));
        $x = substr($data, 0, 4);
        $y = substr($data, 4, 4);

        return array(hexdec($x), hexdec($y));
    }

    private function getImageDpi(int $id) {
        $path = DB::table('images')->where('id', $id)->select('path')->get()->first()->path;
        $realpath = Storage::disk('local')->path('public/' . $path);
        return $this->get_dpi($realpath)[0];
    }

    private function landmarksAverage($landmarkPosition, array $currentImageAverage, string $landmarkType) {
        $total = $currentImageAverage['total'];
        foreach ($landmarkPosition as $key => $value) {
            if ($key != 'id_landmark' && $key != 'created_at' && $key != 'updated_at') {
                if (!array_key_exists($key, $currentImageAverage[$landmarkType])) {
                    $currentImageAverage[$landmarkType][$key] = 0;
                }
                if (is_null($value)) {
                    $value = 0;
                } else {
                    $value = intval($value);
                }
                $currentImageAverage[$landmarkType][$key] = (($currentImageAverage[$landmarkType][$key] * $total) + $value) / ($total + 1);
            }
        }
        return $currentImageAverage;
    }

    private function toMilimeters(float $value, int $imageId) {
        $imageResolutionDpi = $this->getImageDpi($imageId);
        $inchInMilimeters = 25.4;
        return ($inchInMilimeters * $value) / $imageResolutionDpi;
    }

    private function toArray($landmarkTable) {
        $toReturn = array();
        foreach ($landmarkTable as $key => $value) {
            if ($key != 'id_landmark' && $key != 'created_at' && $key != 'updated_at') {
                $toReturn[$key] = $value;
            }
        }
        return $toReturn;
    }

    private function euclidianDistance($x1, $y1, $x2, $y2) {
        return sqrt(pow(($x2 - $x1), 2) + pow(($y2 - $y1), 2));
    }

    private function calculateDifference(array $averages, $landmarkX, $landmarkY, int $imageId) {
        $result = array('pixels' => array(), 'milimeters' => array());
        $landmarks = array('x' => $this->toArray($landmarkX), 'y' => $this->toArray($landmarkY));
        foreach ($landmarks['x'] as $key => $value) {
            if ($key != 'id_landmark' && $key != 'created_at' && $key != 'updated_at') {
                if (!array_key_exists($key, $averages['x'])) {
                    $result['pixels'][$key] = null;
                } else {
                    $result['pixels'][$key] = $this->euclidianDistance(
                        $averages['x'][$key], $averages['y'][$key],
                        $landmarks['x'][$key], $landmarks['y'][$key]
                    );
                    $result['milimeters'][$key] = $this->toMilimeters($result['pixels'][$key], $imageId);
                }
            }
        }
        return $result;
    }

    public function compareLandmarks(int $toCompare) {
        $others = DB::table('image_landmarks')->whereNotIn('fk_id_doctor', array($toCompare))->orderBy('fk_id_image')->get();
        $reference = DB::table('image_landmarks')->where('fk_id_doctor', $toCompare)->orderBy('fk_id_image')->get();
        //making average to others
        $averages = array();
        foreach ($others as $noCare => $imageLandmarkObj) {
            $index = $imageLandmarkObj->fk_id_image;
            if (!array_key_exists($index, $averages)) {
                $averages[$index] = array('x' => array(), 'y' => array(), 'total' => 0);
            }
            $currentImageAverage = $averages[$index];
            $landmarkX = DB::table('landmarks')->where('id_landmark', $imageLandmarkObj->fk_landmark_x)->get()->first();
            $landmarkY = DB::table('landmarks')->where('id_landmark', $imageLandmarkObj->fk_landmark_y)->get()->first();
            $currentImageAverage = $this->landmarksAverage($landmarkX, $currentImageAverage, 'x');
            $currentImageAverage = $this->landmarksAverage($landmarkY, $currentImageAverage, 'y');
            $currentImageAverage['total'] += 1;
            $averages[$index] = $currentImageAverage;
        }
        $differenceBetween = array();
        foreach ($reference as $noCare => $imageLandmarkObj) {
            $index = $imageLandmarkObj->fk_id_image;
            if (!array_key_exists($index, $differenceBetween)) {
                $differenceBetween[$index] = array();
            }
            $landmarkX = DB::table('landmarks')->where('id_landmark', $imageLandmarkObj->fk_landmark_x)->get()->first();
            $landmarkY = DB::table('landmarks')->where('id_landmark', $imageLandmarkObj->fk_landmark_y)->get()->first();
            if (array_key_exists($index, $averages)) {
                $differenceBetween[$index] = $this->calculateDifference($averages[$index], $landmarkX, $landmarkY, $index);
            }
        }
        return response()->json(array('averages' => $averages, 'differenceBetween' => $differenceBetween, 'reference' => $reference));
    }

}
