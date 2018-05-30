<?php

namespace Launchpad\Models;

class Launchpad {

	public function getTiles($allTiles, $userGroupName, $permModel){
		$tiles = [];

		foreach ($allTiles as $resource => $tile) {
			if($permModel->isGranted($userGroupName, $resource)){
				$tiles[] = $tile;
			}
		}

		return $tiles;
	}
}