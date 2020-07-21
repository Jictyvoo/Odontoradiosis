<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use MatthiasMullie\Minify\JS as MinifyJS;


class MinimizeJSController {

	/**
	 * @param string $original
	 * @param string $minimized
	 */
	public static function minimize (string $original, string $minimized) {
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

	public static function minimizeAll(string $originFilename, string $destinyFilename) {
		resource_path();
	}

}
