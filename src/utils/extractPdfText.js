// utils/extractPdfText.js

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractPdfText = async (pdfBuffer) => {
  const uint8Array = new Uint8Array(pdfBuffer);

  const pdf = await pdfjsLib.getDocument({
    data: uint8Array,
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content =
      await page.getTextContent();

    text +=
      content.items
        .map((item) => item.str)
        .join(" ") + "\n";
  }

  return text;
};