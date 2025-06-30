<?php
// Configuración de headers para CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Verificar si es una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Función para limpiar y validar datos
function cleanInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Función para validar email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

try {
    // Obtener datos del formulario
    $nombre = isset($_POST['nombre']) ? cleanInput($_POST['nombre']) : '';
    $apellido = isset($_POST['apellido']) ? cleanInput($_POST['apellido']) : '';
    $email = isset($_POST['email']) ? cleanInput($_POST['email']) : '';
    $telefono = isset($_POST['telefono']) ? cleanInput($_POST['telefono']) : '';
    $empresa = isset($_POST['empresa']) ? cleanInput($_POST['empresa']) : '';
    $servicio = isset($_POST['servicio']) ? cleanInput($_POST['servicio']) : '';
    $mensaje = isset($_POST['mensaje']) ? cleanInput($_POST['mensaje']) : '';

    // Validaciones
    $errors = [];

    if (empty($nombre)) {
        $errors[] = 'El nombre es requerido';
    }

    if (empty($apellido)) {
        $errors[] = 'El apellido es requerido';
    }

    if (empty($email)) {
        $errors[] = 'El email es requerido';
    } elseif (!isValidEmail($email)) {
        $errors[] = 'El email no es válido';
    }

    if (empty($mensaje)) {
        $errors[] = 'El mensaje es requerido';
    }

    // Si hay errores, devolverlos
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'errors' => $errors
        ]);
        exit;
    }

    // Configuración del email
    $to = 'info@R&Cnetworks.com'; // Cambiar por el email real
    $subject = 'Nuevo mensaje de contacto - R&CNetworks';
    
    // Construir el mensaje
    $emailContent = "
    <html>
    <head>
        <title>Nuevo mensaje de contacto</title>
    </head>
    <body>
        <h2>Nuevo mensaje de contacto recibido</h2>
        <table>
            <tr><td><strong>Nombre:</strong></td><td>{$nombre} {$apellido}</td></tr>
            <tr><td><strong>Email:</strong></td><td>{$email}</td></tr>
            <tr><td><strong>Teléfono:</strong></td><td>{$telefono}</td></tr>
            <tr><td><strong>Empresa:</strong></td><td>{$empresa}</td></tr>
            <tr><td><strong>Servicio de interés:</strong></td><td>{$servicio}</td></tr>
            <tr><td><strong>Mensaje:</strong></td><td>{$mensaje}</td></tr>
        </table>
        <br>
        <p><strong>Fecha:</strong> " . date('Y-m-d H:i:s') . "</p>
        <p><strong>IP:</strong> " . $_SERVER['REMOTE_ADDR'] . "</p>
    </body>
    </html>
    ";

    // Headers del email
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $email,
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    );

    // Enviar email
    $mailSent = mail($to, $subject, $emailContent, implode("\r\n", $headers));

    // Guardar en base de datos (opcional)
    // saveToDatabase($nombre, $apellido, $email, $telefono, $empresa, $servicio, $mensaje);

    // Enviar email de confirmación al usuario
    $userSubject = 'Gracias por contactarnos - R&CNetworks';
    $userMessage = "
    <html>
    <head>
        <title>Confirmación de contacto</title>
    </head>
    <body>
        <h2>¡Gracias por contactarnos!</h2>
        <p>Hola {$nombre},</p>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
        <p><strong>Resumen de tu mensaje:</strong></p>
        <p>{$mensaje}</p>
        <br>
        <p>Mientras tanto, puedes visitar nuestro sitio web para conocer más sobre nuestros servicios.</p>
        <p>Saludos,<br>El equipo de R&CNetworks</p>
    </body>
    </html>
    ";

    mail($email, $userSubject, $userMessage, implode("\r\n", $headers));

    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado correctamente. Te contactaremos pronto.'
    ]);

} catch (Exception $e) {
    // Log del error (en producción, usar un sistema de logging apropiado)
    error_log('Error en contact.php: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor. Por favor, intenta nuevamente.'
    ]);
}

// Función para guardar en base de datos (opcional)
function saveToDatabase($nombre, $apellido, $email, $telefono, $empresa, $servicio, $mensaje) {
    // Configuración de la base de datos
    $host = 'localhost';
    $dbname = 'R&Cnetworks';
    $username = 'root';
    $password = '';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO contactos (nombre, apellido, email, telefono, empresa, servicio, mensaje, fecha_creacion) 
                VALUES (:nombre, :apellido, :email, :telefono, :empresa, :servicio, :mensaje, NOW())";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nombre' => $nombre,
            ':apellido' => $apellido,
            ':email' => $email,
            ':telefono' => $telefono,
            ':empresa' => $empresa,
            ':servicio' => $servicio,
            ':mensaje' => $mensaje
        ]);

        return true;
    } catch (PDOException $e) {
        error_log('Error de base de datos: ' . $e->getMessage());
        return false;
    }
}

// Función para validar reCAPTCHA (opcional)
function validateRecaptcha($recaptchaResponse) {
    $secretKey = 'TU_CLAVE_SECRETA_RECAPTCHA'; // Cambiar por tu clave secreta
    
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $secretKey,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result);

    return $response->success;
}
?> 