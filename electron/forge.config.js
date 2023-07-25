module.exports = {
  packagerConfig: {
    asar: false,
    icon: "assets/appIcon.icns",
    osxSign: {
      provisioningProfile: 'developer-id-deepapp.provisionprofile',
      platform: 'mas',
      type: 'development',
      entitlements: 'entitlements.mas.plist',
      hardenedRuntime: true
    },
    osxNotarize:{
      tool: 'notarytool',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLEIDPASS,
      teamId: process.env.APPLE_TEAM_ID
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO'
      }
    }
  ],
  plugins: [],
};