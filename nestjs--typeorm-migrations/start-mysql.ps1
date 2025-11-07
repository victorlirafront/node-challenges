# Script para iniciar MySQL - Opções disponíveis

Write-Host "=== Iniciador de MySQL para NestJS ===" -ForegroundColor Cyan
Write-Host ""

# Verificar Docker
Write-Host "Verificando Docker..." -ForegroundColor Yellow
$dockerRunning = docker ps 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Docker está rodando!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Iniciando MySQL via Docker..." -ForegroundColor Yellow
    docker-compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ MySQL iniciado com sucesso via Docker!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Aguarde alguns segundos para o MySQL inicializar completamente..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        docker ps
    } else {
        Write-Host "✗ Erro ao iniciar MySQL via Docker" -ForegroundColor Red
    }
} else {
    Write-Host "✗ Docker não está rodando ou não está instalado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Opções disponíveis:" -ForegroundColor Cyan
    Write-Host "1. Inicie o Docker Desktop manualmente e tente novamente" -ForegroundColor Yellow
    Write-Host "2. Use MySQL local (se instalado):" -ForegroundColor Yellow
    Write-Host "   net start MySQL80" -ForegroundColor White
    Write-Host "3. Use XAMPP:" -ForegroundColor Yellow
    Write-Host "   - Abra XAMPP Control Panel" -ForegroundColor White
    Write-Host "   - Clique em 'Start' ao lado do MySQL" -ForegroundColor White
    Write-Host ""
    Write-Host "Para mais informações, consulte SETUP_DATABASE.md" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure o arquivo .env com as credenciais do MySQL" -ForegroundColor Yellow
Write-Host "2. Execute: npm run migration:run" -ForegroundColor Yellow
Write-Host "3. Execute: npm run start:dev" -ForegroundColor Yellow
