pipeline {
  agent {
    docker {
      image 'node:lts'
    }
  }

  options {
    timeout(time: 10, unit: 'MINUTES')
      ansiColor('xterm')
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run lint:md'
        sh 'npm run lint:js'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run clean'
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      when {
        branch 'master'
      }
      environment {
        SURGE = credentials('halkeye-surge')
      }
      steps {
        sh 'SURGE_LOGIN=$SURGE_USR SURGE_TOKEN=$SURGE_PSW npx surge -p public -d blog.gavinmogan.com'
      }
    }
  }
}
