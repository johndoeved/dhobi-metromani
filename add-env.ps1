$envVars = @{
    MONGODB_URI = "mongodb+srv://vedparmar659_db_user:qiGfSpxI7HrhhaoE@cluster0.nbsalhh.mongodb.net/dhobi-metromani"
    GEMINI_API_KEY = "MY_GEMINI_API_KEY"
    SMTP_HOST = "smtp.gmail.com"
    SMTP_PORT = "587"
    SMTP_USER = "vedparmar659@gmail.com"
    SMTP_PASS = "xvcf nagp aspv hkju"
    SMTP_FROM = "Dhobi Matrimony <vedparmar659@gmail.com>"
    JWT_SECRET = "dhobi_metromani_secret_key_12345"
}

foreach ($key in $envVars.Keys) {
    $value = $envVars[$key]
    npx vercel env rm $key production -y
    $value | npx vercel env add $key production
}
