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
    const root = document.getElementById("root");
    new QRCode(root, {
      text: tabs[0].url,
      width: 300,
      height: 300,
      colorDark: "#000000",
      colorLight: "#fffffc",
      correctLevel: QRCode.CorrectLevel.H,
    });
    const input = document.getElementById("input");
    const apply = document.getElementById("apply");

    apply.onclick = (e) => {
      e.preventDefault();
      if (input.value) {
        root.innerHTML = "";
        try {
          new QRCode(root, {
            text: input.value,
            width: 300,
            height: 300,
            colorDark: "#000000",
            colorLight: "#fffffc",
            correctLevel: QRCode.CorrectLevel.H,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        root.innerHTML = "<h1 style='width:300px;height: 300px;'>O_o ops!</h1>";
      }

    };


    document.getElementById("dowland").addEventListener("click", function (event) {
      download(document.querySelector("#root > canvas"), tabs[0].url)
    })

  });

});