var encoder = require('../')
,   path    = require('path')
,   fs      = require('fs')
,   input   = fs.createReadStream(path.join(__dirname, 'support/audio.wav'));

/**
 * Ideal API
 */
var proc = encoder(input, {
  formats: {
    opus: {
      sample: 48000,
      codec: 'libopus',
      bitrate: '64k',
      options: [
        '-vbr constrained'
      ]
    },
    m4a: {
      sample: 44100,
      codec: 'libfdk_aac',
      bitrate: '64k',
      options: [
        '-profile:a aac_he_v2'
      ]
    }
  }
});

proc.encode().then(function (outputs) {
  console.log(outputs);
}).finally(function () {
  proc.cleanup();
});
