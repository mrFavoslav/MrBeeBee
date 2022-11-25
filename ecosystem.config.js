module.exports = {
  apps : [{
    name: 'Release',
    script: '/var/backups/bot/mrbb_v4.6.4/index.js',
    watch: false,
    cron_restart: '0 0 * * *',
  }],
};