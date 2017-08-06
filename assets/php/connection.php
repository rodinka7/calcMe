<?php
define (DB_DRIVER,  "mysql");
define (DB_CHARSET, "UTF8");
define (DB_HOST,    "localhost");
define (DB_USER,    "root");
define (DB_PASS,    "");
define (DB_NAME,    "calcbase");

try {
    $pdo = new PDO(DB_DRIVER.":host=".DB_HOST.";dbname=".DB_NAME,DB_USER, DB_PASS);
} catch (PDOException $e) {
    echo "Ошибка: " . $e->getMessage();
}
?>