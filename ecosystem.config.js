module.exports = {
  apps: [{
    name: 'PreRelease',
    script: '/home/mrbb_bot/index.js',
    instances : "max",
    exec_mode : "cluster",
    watch : false,
    cron_restart: '0 0 * * *',
  }]
}
