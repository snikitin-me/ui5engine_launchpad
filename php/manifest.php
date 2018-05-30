<?php

return [
	'controllers' => [
		'' => __DIR__ . '/controllers/Index.php'
	],
	'tiles' => [
			'tiles_forms_01'=>[
		      "icon" => "sap-icon://form",
		      "type" => "Monitor",
		      "title" => "Форма ОС",
		      "url" => "/modules/forms/webapp/index.html?id=01"
		    ],
		  	'tiles_forms_02' => [
		      "icon" => "sap-icon://form",
		      "type" => "Monitor",
		      "title" => "Объекты и услуги",
		      "url" => "/modules/forms/webapp/index.html?id=02"
		    ],
		  	'tiles_forms_03' => [
		      "icon" => "sap-icon://form",
		      "type" => "Monitor",
		      "title" => "Сопровождение",
		      "url" => "/modules/forms/webapp/index.html?id=03"
		    ],
		  	'tiles_users' =>[
		      "icon" => "sap-icon://account",
		      "type" => "Monitor",
		      "title" => "Пользователи",
		      "url" => "/modules/users/webapp/index.html"		      
		    ]
		]
];