<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use MatthiasMullie\Minify\JS as MinifyJS;

class MinimizeJSController {

    /**
     * @param string $original
     * @param string $minimized
     */
    public static function minimize(string $original, string $minimized) {
        $changed = false;
        if (File::isFile(public_path($minimized)) && File::lastModified(resource_path($original)) > File::lastModified(public_path($minimized))) {
            File::delete(public_path($minimized));
            $changed = true;
        } else if (!File::isFile(public_path($minimized))) {
            $changed = true;
        }
        if ($changed) {
            $minimizer = new MinifyJS(File::get(resource_path($original)));
            File::append(public_path($minimized), $minimizer->minify());
        }
    }

    /**
     * Will minimize and put all files together
     */
    public static function minimizeAll(string $originPath, string $destinyPath) {
        $minimizeAgain = false;
        $publicDestinyPath = public_path($destinyPath);
        $lastModificationDestiny = File::isFile($publicDestinyPath) ? File::lastModified($publicDestinyPath) : 0;
        $allFiles = File::allFiles(resource_path($originPath));
        $sequence = array();
        $resourcePaths = array();
        foreach ($allFiles as $noCare => $fileInfo) {
            $currentPath = resource_path($originPath . '/' . $fileInfo->getRelativePathname());
            if ($fileInfo->getFileName() == "sequence.json") {
                $sequence = json_decode(File::get($currentPath), true);
            } else {
                //array_push($resourcePaths, $currentPath);
                $resourcePaths[$fileInfo->getRelativePathname()] = $currentPath;
                if (File::isFile($publicDestinyPath) && File::lastModified($currentPath) > $lastModificationDestiny) {
                    File::delete($publicDestinyPath);
                    $minimizeAgain = true;
                } else if (!File::isFile($publicDestinyPath)) {
                    $minimizeAgain = true;
                }
            }
        }
        if ($minimizeAgain) {
            $minimizer = new MinifyJS(File::get($resourcePaths[$sequence[0]]));
            for ($index = 1; $index < count($sequence); $index++) {
                $minimizer->add($resourcePaths[$sequence[$index]]);
            }
            File::append($publicDestinyPath, $minimizer->minify());
            //$minimizer->gzip($publicDestinyPath);
        }
    }
}
