 <?php
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

$data = [
    "message" => "Hello from PHP!",
    "status" => 200
];
echo json_encode($data);
 ?>
