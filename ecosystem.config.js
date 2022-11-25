module.exports = {
  apps: [{
    name: 'PreRelease',
    script: '/home/ubuntu/mrbb/index.js',
    watch: true,
    cron_restart: '0 0 * * *',
    ignore_watch : [],
  }]
}
