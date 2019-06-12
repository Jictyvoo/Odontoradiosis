<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use MatthiasMullie\Minify;


class MinimizeJS {

	/**
	 * @param string $original
	 * @param string $minimized
	 */
	public static function minimize (string $original, string $minimized) {
		$changed = false;
		if (File::isFile(public_path($minimized)) && File::lastModified(public_path($original)) > File::lastModified(public_path($minimized))) {
			File::delete(public_path($minimized));
			$changed = true;
		} else if (!File::isFile(public_path($minimized))) {
			$changed = true;
		}
		if ($changed) {
			$minimizer = new Minify\JS(File::get(public_path($original)));
			File::append(public_path($minimized), $minimizer->minify());
		}
	}
}