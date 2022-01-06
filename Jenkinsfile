pipeline {
    agent any
    stages {
        stage('dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
                echo '------- Successfully installed dependencies -------'
            }
        }

        stage('build') {
            steps {
                echo 'Starting to build...'
                bat 'npm run build'
                echo '------- Build successful -------'
            }
        }

        stage('test') {
            steps {
                echo 'Starting to test...'
            }
        }
    }
}
