"strict mode";

/**
 * @param {string} filename File Name (current dir) OR Full Path with file name
 * @param {string} fformat File Format Like png , jpg , jpeg etc
 */

async function ss(filename, fformat) {
  return new Promise((resolve, reject) => {
    const dfname = filename || process.cwd() + "/" + Date.now();
    const dformat = fformat || "jpg";

    if (process.platform === "darwin") {
      const applescript = require("applescript");
      var ext = dfname + "." + dformat;
      var script =
        'do shell script "screencapture -x -t ' + dformat + " " + ext + '"';

      applescript.execString(script, function (err, rtn) {
        if (err) {
          reject(err);
        } else {
          resolve(`${ext}`);
        }
      });
    } else if (process.platform === "win32") {
      const PowerShell = require("powershell");
      var tt = dfname.replace(/\\/g, "/");
      function capitalize(s) {
        if (s.toLowerCase() == "jpg" || s.toLowerCase() == "jpeg") {
          return "JPEG";
        } else {
          return s.toLowerCase();
        }
      }
      var ext = capitalize(dformat);
      var script = `Add-Type -AssemblyName System.Windows.Forms
          $screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
          $image = New-Object System.Drawing.Bitmap($screen.Width, $screen.Height)
          $graphic = [System.Drawing.Graphics]::FromImage($image)
          $point = New-Object System.Drawing.Point(0, 0)
          $graphic.CopyFromScreen($point, $point, $image.Size);
          $cursorBounds = New-Object System.Drawing.Rectangle([System.Windows.Forms.Cursor]::Position, [System.Windows.Forms.Cursor]::Current.Size)
          [System.Windows.Forms.Cursors]::Default.Draw($graphic, $cursorBounds)
          $screen_file = "${tt}.${dformat}"
          $image.Save($screen_file, [System.Drawing.Imaging.ImageFormat]::${ext})`;

      let ps = new PowerShell(script);
      ps.on("error", (err) => {
        reject(err);
      });
      ps.on("output", (data) => {
        resolve(`${tt}.${dformat}`);
      });
      ps.on("error-output", (data) => {
        reject(data);
      });
    } else {
      module.exports = function unSupported() {
        reject(
          new Error("Currently unsupported platform. Pull requests welcome!")
        );
      };
    }
  });
}

module.exports = ss;
