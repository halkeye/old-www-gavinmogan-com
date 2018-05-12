pipeline {
  agent {
    docker {
      image 'node:9'
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
        sh 'npm run build:pp'
      }
    }

    stage('Deploy') {
      when {
        branch 'master'
      }
      environment {
        SURGE = credentials('halkeye-surge')
        NETLIFY = credentials('netlify-gavinmogan')
      }
      steps {
        sh 'SURGE_LOGIN=$SURGE_USR SURGE_TOKEN=$SURGE_PSW npx surge -p public -d blog.gavinmogan.com'
        sh """
        wget -O - https://github.com/netlify/netlifyctl/releases/download/v0.3.3/netlifyctl-linux-amd64-0.3.3.tar.gz | tar xvzf - 
        ./netlifyctl -y deploy -b public -A $NETLIFY
        """
      }
    }
  }
}
