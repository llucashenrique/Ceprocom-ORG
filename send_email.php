<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    $nome = addslashes($_POST['name']);
    $birth = addslashes($_POST['birth']);
    $email = addslashes($_POST['email']);
    $mobnumber = addslashes($_POST['mobnumber']);
    $gender = addslashes($_POST['gender']);
    $occupation = addslashes($_POST['occupation']);
    $idty = addslashes($_POST['idty']);
    $idnum = addslashes($_POST['idnum']);
    $issueaut = addslashes($_POST['issueaut']);
    $issuesta = addslashes($_POST['issuesta']);
    $issuedate = addslashes($_POST['issuedate']);
    $expirydate = addslashes($_POST['expirydate']);

    // Exemplo de envio de e-mail
    $to = "lucasperes1591@gmail.com";
    $subject = "Informações do Formulário de Registro";

    $body = "
        Nome: $nome
        Data de Nascimento: $birth
        E-mail: $email
        Número de Celular: $mobnumber
        Gênero: $gender
        Ocupação: $occupation
        Tipo de ID: $idty
        Número da ID: $idnum
        Autoridade de Emissão: $issueaut
        Estado de Emissão: $issuesta
        Data de Emissão: $issuedate
        Data de Expiração: $expirydate
    ";

    $headers = "From: lucasxl1591@gmail.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo "E-mail enviado com sucesso!";
    } else {
        echo "Erro ao enviar o e-mail.";
    }
?>

