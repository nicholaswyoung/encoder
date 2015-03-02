var fs      = require('fs')
,   Stream  = require('stream')
,   co      = require('co')
,   Promise = require('bluebird')
,   temp    = require('temp')
,   ffmpeg  = require('fluent-ffmpeg')
,   Encoder;

/**
 * Shim FS/Temp
 */
fs   = Promise.promisifyAll(fs);
temp = Promise.promisifyAll(temp);

/**
 * Encoder class
 */
Encoder = function (input, options) {
  options = options || {};

  this.formats = options.formats || {};
  this.outputs = [];
  this.through = new Stream.PassThrough();

  if (!input.readable) input = fs.createReadStream(input);
  input.pipe(this.through);

  return this;
};

Encoder.prototype.prime = function () {
  var self = this;

  for (var key in this.formats) {
    this.outputs.push(new Promise(function (resolve, reject) {
      temp.open({ suffix: '.' + key }, function (err, info) {
        if (err) return reject(err);

        resolve({
          path: info.path,
          meta: self.formats[key]
        });
      });
    }));
  }

  return Promise.all(this.outputs);
};

Encoder.prototype.encode = function () {
  var self = this;

  return self.prime().then(function (outputs) {
    return new Promise(function (resolve, reject) {
      var proc = ffmpeg(self.through);

      outputs.forEach(function (output) {
        proc
          .output(output.path)
          .audioChannels(output.channels || 2)

        if (output.codec) proc.audioCodec(output.data.codec);
        if (output.bitrate) proc.audioBitrate(output.data.bitrate);
        if (output.frequency) proc.audioFrequency(output.data.frequency);
        if (output.options) proc.outputOptions(output.options);
      });

      proc
        .on('progress', function (progress) {
          self.emit('progress')
        })
        .on('message', function (message) {
          self.emit('message')
        })
        .on('error', function (error) {
          return reject(error);
        })
        .on('end', function () {
          resolve(outputs);
        })
        .run();
    });
  });
};

Encoder.prototype.cleanup = function () {
  return Promise.map(this.outputs, function (output) {
    return fs.unlinkAsync(output.path);
  });
}

module.exports = function (input, options) {
  options = options || {};
  return new Encoder(input, options);
};
