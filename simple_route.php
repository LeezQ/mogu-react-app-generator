<?php 
    /**
     * 简单的路由匹配方法，支持正则
     * @param  [type]  $str [description]
     * @return boolean      [description]
     */

$baseUrl = '';

$routes = require('./routes.php');

$isRouteHit = false;
foreach ($routes as $route => $path) {
    if (isRoute($route)) {
        $jsFile = $path;
        $isRouteHit = true;
        break;
    }
}

if (!$isRouteHit) {
    echo '你到火星啦~';
    die;
}

function isRoute($str)
{
    $route = $_SERVER['REQUEST_URI'];
    $routeReg = str_replace('/', '\\/', $str);
    $routeReg = str_replace('?', '\\?', $routeReg);
    return preg_match("/^" . $routeReg . "\/?((\?|#).+)?$/i", $route);
}
