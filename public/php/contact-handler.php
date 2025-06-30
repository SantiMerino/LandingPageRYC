<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Configuración de email (ajusta según tu hosting)
$to_email = 'info@miempresa.com'; // Cambia por tu email
$from_email = 'noreply@miempresa.com'; // Email del servidor

// Obtener y validar datos del formulario
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validaciones
$errors = [];

if (empty($name)) {
    $errors[] = 'El nombre es requerido';
}

if (empty($email)) {
    $errors[] = 'El email es requerido';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'El email no es válido';
}

if (empty($message)) {
    $errors[] = 'El mensaje es requerido';
}

// Si hay errores, devolver respuesta de error
if (!empty($errors)) {
    echo json_encode([
        'success' => false, 
        'message' => implode(', ', $errors)
    ]);
    exit;
}

// Sanitizar datos
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Crear el cuerpo del email
$email_subject = !empty($subject) ? $subject : 'Nuevo mensaje desde el sitio web';
$email_body = "Has recibido un nuevo mensaje desde tu sitio web:\n\n";
$email_body .= "Nombre: $name\n";
$email_body .= "Email: $email\n";
if (!empty($phone)) {
    $email_body .= "Teléfono: $phone\n";
}
$email_body .= "Asunto: $email_subject\n\n";
$email_body .= "Mensaje:\n$message\n\n";
$email_body .= "---\n";
$email_body .= "Enviado desde: " . $_SERVER['HTTP_HOST'] . "\n";
$email_body .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "Fecha: " . date('Y-m-d H:i:s') . "\n";

// Headers del email
$headers = "From: $from_email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Intentar enviar el email
try {
    $mail_sent = mail($to_email, $email_subject, $email_body, $headers);
    
    if ($mail_sent) {
        // Opcional: Guardar en base de datos o archivo log
        saveMessageToLog($name, $email, $phone, $subject, $message);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Mensaje enviado correctamente. Te contactaremos pronto.'
        ]);
    } else {
        throw new Exception('Error al enviar el email');
    }
} catch (Exception $e) {
    error_log("Error enviando email: " . $e->getMessage());
    echo json_encode([
        'success' => false, 
        'message' => 'Error al enviar el mensaje. Intenta de nuevo más tarde.'
    ]);
}

// Función para guardar mensaje en log (opcional)
function saveMessageToLog($name, $email, $phone, $subject, $message) {
    $log_entry = date('Y-m-d H:i:s') . " | ";
    $log_entry .= "Name: $name | ";
    $log_entry .= "Email: $email | ";
    $log_entry .= "Phone: $phone | ";
    $log_entry .= "Subject: $subject | ";
    $log_entry .= "Message: " . str_replace(["\r", "\n"], [" ", " "], $message) . "\n";
    
    // Crear directorio logs si no existe
    $log_dir = __DIR__ . '/logs';
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    // Guardar en archivo log
    $log_file = $log_dir . '/contact_messages.log';
    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}

// Función para verificar spam básico (opcional)
function isSpam($message, $email) {
    $spam_words = ['viagra', 'casino', 'lottery', 'winner', 'congratulations'];
    $message_lower = strtolower($message);
    
    foreach ($spam_words as $word) {
        if (strpos($message_lower, $word) !== false) {
            return true;
        }
    }
    
    // Verificar si el email parece spam
    if (substr_count($email, '.') > 3 || strpos($email, '+') !== false) {
        return true;
    }
    
    return false;
}

// Función para validar y limpiar número de teléfono
function cleanPhone($phone) {
    // Remover todos los caracteres que no sean números, +, -, espacios o paréntesis
    $phone = preg_replace('/[^0-9+\-\s\(\)]/', '', $phone);
    return trim($phone);
}

?>