(async function () {
  const supportDetectElem = document.querySelector('#support-detect');
  const supportFormatsElem = document.querySelector('#support-formats');
  const backButton = document.querySelector('#back');

  backButton.addEventListener('click', () => {
    history.back();
  })

  if (!('BarcodeDetector' in window)) {
    supportDetectElem.textContent = '不支持 barcode';
    return;
  } else {
    supportDetectElem.textContent = '支持 barcode';
  }

  const supportedFormats = await BarcodeDetector.getSupportedFormats();
  supportFormatsElem.innerHTML = supportedFormats.map(format => `<li>${format}</li>`).join('\n');
})();