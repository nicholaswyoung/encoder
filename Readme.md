# Encoder

[![Greenkeeper badge](https://badges.greenkeeper.io/nicholaswyoung/encoder.svg)](https://greenkeeper.io/)

A simple wrapper around ffmpeg with a clean, Promises-based API.

## Example

```javascript
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
```

## License

Copyright (C) Original Machine LLC.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
