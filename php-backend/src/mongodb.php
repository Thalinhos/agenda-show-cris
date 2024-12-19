<?php

use MongoDB\Client;

$client = new Client('mongodb://admin:metroplan@localhost:27017/');
$db = $client->selectDatabase('cris_db');
$userCollection = $db->selectCollection('users');
$postCollection = $db->selectCollection('events');

?>

