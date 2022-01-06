pipeline {
    agent any
    stages {
        stage('dependencies') {
            steps {
                echo 'Installing dependencies...'
                nodejs('NodeJS-16.3.0') {
                    sh 'npm install'
                }
                echo '------- Successfully installed dependencies -------'
            }
        }

        stage('build') {
            steps {
                echo 'Starting to build...'
                nodejs('NodeJS-16.3.0') {
                    sh 'npm run build'
                }
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
