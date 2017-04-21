var plan = require('flightplan');
var appName = 'builtright';
var username = 'deploy';
var startFile = 'bin/www';

plan.target('dev', {
	host: '159.203.106.53',
  username: 'root',
  agent: process.env.SSH_AUTH_SOCK,
	webRoot: '/var/www/dev.builtrightapp.com/server',
  ownerUser: 'root',
  repository: 'https://github.com/dylanlott/builtright-api.git',
  branchName: 'master',
  maxDeploys: 10
});

plan.target('prod', {
  host: '159.203.106.53',
  username: 'root',
  agent: process.env.SSH_AUTH_SOCK,
  webRoot: '/var/www/builtrightapp.com/server',
  repository: 'https://github.com/dylanlott/builtright-api.git',
  branchName: 'master'
});

plan.remote('setup', function(remote) {
  remote.hostname();
  remote.with('cd ' + remote.runtime.webRoot, function() {
    remote.sudo(`git clone ${remote.runtime.repository} .`);
    remote.sudo('npm install');
    remote.sudo('npm install -g pm2');
    remote.sudo('pm2 start src/index.js');
  })
})

//Git based deploy
plan.local('deploy', function(local) {
  local.hostname();
  local.failsafe();
  local.exec('git add . && git commit -am "flightplan push"');
  local.log('Committed to GitHub');
  local.exec('git push origin master');
  local.log('Pushed to GitHub');
  local.unsafe();
});

plan.remote('deploy', function(remote) {
  remote.hostname();
  remote.with('cd ' + remote.runtime.webRoot, function() {
    remote.sudo('git pull origin master');
    remote.sudo('npm install');
    remote.failsafe();
    remote.exec('pm2 restart src/index.js');
    remote.unsafe();
    remote.exec('pm2 list');
    remote.log('Deploy successful');
  });
});

//Docker based deploy
plan.local('docker', function(local) {
  local.hostname();
  local.exec('docker build -t hivemindapps/builtright-api .');
  local.exec('docker push hivemindapps/builtright-api');
  local.log('Docker image built successfully and pushed to Docker Hub');
});

plan.remote('docker', function(remote) {
  remote.hostname();
  remote.exec('docker pull hivemindapps/builtright-api:latest');
  remote.failsafe();
  remote.exec('docker stop builtright-api');
  remote.unsafe();
  remote.exec('docker run --name builtright-api -d -p 3030:3030 --link mongo:mongo hivemindapps/builtright-api:latest');
  remote.exec('docker ps');
  remote.exec('docker logs builtright-api');
});

plan.remote('check', function(remote) {
  remote.exec('pm2 list');
  remote.exec('pm2 show builtright');
});
