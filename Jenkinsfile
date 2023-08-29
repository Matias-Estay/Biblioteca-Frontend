pipeline {
    agent 'any'
    tools { nodejs "nodejs" }
    stages {
        stage('Pull') {
            steps {
                dir('C:\\Aplicaciones\\Apache24\\htdocs\\Biblioteca-digital\\Biblioteca-Frontend\\') {
                    bat "git config --system --add safe.directory 'C:/Aplicaciones/Apache24/htdocs/Biblioteca-digital/Biblioteca-Frontend'"
                    bat "git pull"
                }
            }
        }
        stage('Install') {
            steps {
                dir('C:\\Aplicaciones\\Apache24\\htdocs\\Biblioteca-digital\\Biblioteca-Frontend') {
                    bat "composer install"
                    bat "npm install"
                }
            }
        }
        stage('build'){
            steps {
                dir('C:\\Aplicaciones\\Apache24\\htdocs\\Biblioteca-digital\\Biblioteca-Frontend') {
                    bat "npm run build"
                }
            }
        }
    }  
}