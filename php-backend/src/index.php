<?php
require '../vendor/autoload.php';
require_once './JWT.php';
require_once './mongodb.php';

header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// app.post('/handleLogin')
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['REQUEST_URI'] == '/handleLogin'){
    $data = json_decode(file_get_contents('php://input'), true);
    $usuario = $data['usuario'];
    $senha = $data['senha'];

    $user = $userCollection->findOne(['nome' => $usuario]);
    
    if (!$user) {
        header('Content-Type: application/json; charset=UTF-8', true , 400);
        return json_encode(['errorMessage' => "Usuário não encontrado."], JSON_UNESCAPED_UNICODE);
    }

    if (!password_verify($senha, $user['senha'])) {
        header('Content-Type: application/json; charset=UTF-8', true , 400);
        return json_encode(['errorMessage' => "Credenciais inválidas."], JSON_UNESCAPED_UNICODE);
    }

    $token = setToken($user['nome']);
    echo json_encode(['token' => $token]);
}

// app.post('/verifyLogin')
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['REQUEST_URI'] == '/verifyToken') {    
    $headers = apache_request_headers();

    $token = $headers['authorization'];

    $token = str_replace("Bearer ", "", $token);

    if (!$token) {
        header('Content-Type: application/json; charset=UTF-8', true , 400);
        echo json_encode(['errorMessage' => 'Token não fornecido.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $decoded = verifyToken($token);

    if ($decoded) {
        header('Content-Type: application/json; charset=UTF-8', true , 200);
        echo json_encode(['message' => 'Token válido.', 'username' => $decoded->username], JSON_UNESCAPED_UNICODE);
    } else {
        header('Content-Type: application/json; charset=UTF-8', true , 400);
        echo json_encode(['errorMessage' => 'Token inválido ou expirado.'], JSON_UNESCAPED_UNICODE);
    }
}

// app.get('/getAllPost')
if ($_SERVER['REQUEST_METHOD'] == 'GET' && $_SERVER['REQUEST_URI'] == '/getAllPosts') {
    $posts = $postCollection->find()->toArray();
    if (count($posts) === 0) {
        header('Content-Type: application/json; charset=UTF-8', true , 400);
        return json_encode(['errorMessage' => "Sem eventos disponíveis."], JSON_UNESCAPED_UNICODE);
    }
    
    header('Content-Type: application/json; charset=UTF-8', true , 200);
    print_r(json_encode(['message' => $posts], JSON_UNESCAPED_UNICODE));
}


// app.post('/addPost');
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SERVER['REQUEST_URI'] == '/addPost') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data['descricao'] || !$data['data'] || !$data['hora']) {
        header('Content-Type: application/json; charset=UTF-8', true , 400);
        echo json_encode(['errorMessage' => "Valores precisam ser inseridos."]);
        return;
    }

    $date = DateTime::createFromFormat('d/m/Y', $data['data']);
    
    if (!$date) {
        header('Content-Type: application/json; charset=UTF-8', true , 400);
        echo json_encode(['errorMessage' => "Formato de data inválido. Use DD/MM/YYYY."], JSON_UNESCAPED_UNICODE);
        return;
    }

    $formattedDate = $date->format('d/m/Y');

    $postToAdd = [
        'descricao' => $data['descricao'],
        'data' => $formattedDate,
        'hora' => $data['hora']
    ];

    try {
        $postCollection->insertOne($postToAdd);
        header('Content-Type: application/json; charset=UTF-8', true , 200);
        echo json_encode(['message' => "Evento inserido com sucesso!"], JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        header('Content-Type: application/json; charset=UTF-8', true , 400);
        echo json_encode(['errorMessage' => "Erro ao inserir valores. Erro: " . $e->getMessage()]);
    }
}

// app.get('/getPostFromDate/${dataToPost}')
if ($_SERVER['REQUEST_METHOD'] == 'GET' && strpos($_SERVER['REQUEST_URI'], '/getPostFromDate/') !== false) {
    // Pegando a URI completa
    $uri = $_SERVER['REQUEST_URI'];

    $valueDate = explode('/getPostFromDate/', $uri);

    if (isset($valueDate[1]) && !empty($valueDate[1])) {
        
        $dateValue = $valueDate[1];

        $date = DateTime::createFromFormat('d-m-Y', $dateValue);
        $date = $date->format('d/m/Y');

        $posts = $postCollection->find(["data" => $date])->toArray();
        
        header('Content-Type: application/json; charset=UTF-8', true , 200);
        
        echo json_encode(["message" => $posts]);
    } else {
        header('Content-Type: application/json; charset=UTF-8', true , 400);
        echo json_encode(["errorMessage" => "Nenhuma data foi passada após '/getPostFromDate/'."]);
    }
}



?>
