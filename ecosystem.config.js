module.exports = {
  apps: [{
    name: 'gnao1-cn',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/gnao1-cn',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
