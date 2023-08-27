import React, { useState } from 'react';
// import pdfjs from 'pdfjs-dist/build/pdf.js';
import * as pdfjs from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

// const pdfjs = pdfjsLib.build
// Initialize PDFJS worker (can be done globally in your app)
pdfjs.GlobalWorkerOptions.workerSrc =
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.10.111/pdf.worker.js`;

  async function extractText(pdfUrl: string) {
    var pdf = pdfjs.getDocument(pdfUrl);
  
    return pdf.promise.then(function (pdf) {
      var maxPages = pdf.numPages;
      console.log(maxPages);
    });
  }
  
  // Example PDF file.
  const url =
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
  
  extractText(url).then(
    function (text) {
      console.log('parse ' + text);
    },
    function (reason) {
      console.error(reason);
    },
  );

const PdfTextExtractor = () => {
  const [text, setText] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if(!event.target.files || !event.target.files.length ) return console.log('no files');

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        const numPages = pdf.numPages;
        let extractedText = '';

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const pageText = await page.getTextContent();
          pageText.items.forEach((item) => {
            extractedText += (item as TextItem ).str + ' ';
          });
        }

        setText(extractedText);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={ handleFileChange} />
      <div>
        <h2>Extracted Text:</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default PdfTextExtractor;
