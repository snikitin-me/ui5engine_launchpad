<?php

use Symfony\Component\HttpFoundation\Request;

require_once(dirname(__DIR__) .'/models/Launchpad.php'); 


$permModel = new Engine\Models\Permissions($config['roles']);
$launchpadModel = new  Launchpad\Models\Launchpad();

$c = $app['controllers_factory'];

// $c->get('/{module}', function ($module) use ($app, $config) {
//   return $app['twig']->render('launchpad.twig', array(
//   	'module' => $module
//   ));
// });

// $c->get('', function () use ($app, $config) {
//   return "asd";
// });

$c->get('tiles', function () use ($app, $permModel, $launchpadModel, $config) {
  $user = $app['session']->get('user');

  if(!isset($user["user_group_name"])){
    throw new Exception("User is not authorized!");
  }

  $tiles = $config['modules']['launchpad']['tiles'];
  return $app->json( ["d"=>["results"=>$launchpadModel->getTiles($tiles, $user["user_group_name"], $permModel)]]);
});


return $c;