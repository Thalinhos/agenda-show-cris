<?php

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

function verifyToken($jwt) {
    try {
        $secretKey = 'your_secret_key';
        return JWT::decode($jwt, new Key($secretKey, 'HS512'));
    } catch (Exception $e) {
        return null;
    }
}

function setToken($username) {
    $key = 'your_secret_key';
    $issuedAt = time();
    $expirationTime = $issuedAt + 100;  
    $payload = array(
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'username' => $username
    );
    return JWT::encode($payload, $key, 'HS512');
}
