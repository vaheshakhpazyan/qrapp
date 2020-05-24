import './popup.css'

const download = function (canvas, filename) {
  const link = document.createElement('a');
  link.download = filename + '.png';
  link.href = canvas.toDataURL()
  link.click();
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function (tabs) {
    const qr = new QRCode(document.getElementById("root"), {
      text: tabs[0].url,
      width: 300,
      height: 300,
      colorDark: "#000000",
      colorLight: "#fffffc",
      correctLevel: QRCode.CorrectLevel.H
    });
    document.getElementById("dowland").addEventListener("click", function (event) {
      download(document.querySelector("#root > canvas"), tabs[0].url)
    })
  });

});