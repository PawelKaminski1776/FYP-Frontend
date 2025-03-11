pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"  // Use the NodeJS tool installed in Jenkins
    }

    environment {
        CI = "true"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-repo/angular-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'ng build --configuration production'
            }
        }

        stage('Test') {
            steps {
                sh 'ng test --watch=false --browsers=ChromeHeadless'
            }
        }

        stage('Deploy') {
            steps {
                // Modify this step to deploy to your desired location
                echo "Deploying the Angular application..."
            }
        }
    }
}
