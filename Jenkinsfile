pipeline {
    agent any
    stages {
        stage('dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
                echo '------- Successfully installed dependencies -------'
            }
        }

        stage('build') {
            steps {
                echo 'Starting to build...'
                sh 'npm run build'
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
