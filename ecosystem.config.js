module.exports = {
  apps: [{
    name: 'PreRelease',
    script: '/home/mrbb_bot/index.js',
    watch : false,
    cron_restart: '0 0 * * *',
  }]
}
