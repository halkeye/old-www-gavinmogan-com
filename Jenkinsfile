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
        sh 'npm run lint:js'
        sh 'npm run test'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run clean'
        sh 'npm run build'
        sh 'test -e public/index.html || exit 1'
      }
    }

    stage('Deploy') {
      when {
        branch 'master'
      }
      environment {
        NETLIFY = credentials('netlify-gavinmogan')
      }
      steps {
        sh """
        wget -q -O - https://github.com/netlify/netlifyctl/releases/download/v0.3.3/netlifyctl-linux-amd64-0.3.3.tar.gz | tar xvzf - 
        ./netlifyctl -y deploy -b public -A $NETLIFY
        """
      }
    }
  }
}
