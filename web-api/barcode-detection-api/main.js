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

  const formatList = [
    'aztec',
    'code_128',
    'code_39',
    'code_93',
    'data_matrix',
    'ean_13',
    'ean_8',
    'itf',
    'pdf417',
    'qr_code',
    'upc_e',
  ]
  const supportedFormats = await BarcodeDetector.getSupportedFormats();
 
  supportFormatsElem.innerHTML = formatList.map(format => {
    const html = '<li>是否支持${format}(result)</li>';
    if (supportedFormats.length && supportedFormats.includes(format)) {
      return html.replace('(result)', '支持');
    } else {
      return html.replace('(result)', '不支持');
    }
  }).join('\n');
})();