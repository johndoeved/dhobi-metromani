$envVars = @{
    MONGODB_URI = "mongodb+srv://vedparmar659_db_user:qiGfSpxI7HrhhaoE@cluster0.nbsalhh.mongodb.net/dhobi-matrimony"
    GEMINI_API_KEY = "MY_GEMINI_API_KEY"
    SMTP_HOST = "smtp.gmail.com"
    SMTP_PORT = "587"
    SMTP_USER = "dhobimetromany@gmail.com"
    SMTP_PASS = "qhjg uirc rgco wlon"
    SMTP_FROM = "Dhobi Matrimony <dhobimetromany@gmail.com>"
    JWT_SECRET = "dhobi_metromani_secret_key_12345"
}

foreach ($key in $envVars.Keys) {
    $value = $envVars[$key]
    npx vercel env rm $key production -y
    $value | npx vercel env add $key production
}
