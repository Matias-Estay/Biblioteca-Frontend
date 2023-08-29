pipeline {
    agent 'any'
    stages {
        stage('Pull') {
            steps {
                dir('C:\\Aplicaciones\\Apache24\\htdocs\\Biblioteca-digital\\Biblioteca-Frontend') {
                    bat "git config --global --add safe.directory 'C:/Aplicaciones/Apache24/htdocs/Biblioteca-digital/Biblioteca-Frontend'"
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