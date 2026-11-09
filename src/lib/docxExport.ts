import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { GeneratedLetter } from '@/types/letter';

export async function exportToDocx(letter: GeneratedLetter, filename: string = 'Surat_Rasmi.docx') {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Arial',
            size: 22, // 11pt
            color: '000000',
          },
          paragraph: {
            spacing: {
              line: 276, // 1.15 line spacing
              after: 120, // 6pt after
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // SENDER BLOCK
          ...letter.senderBlock.split('\n').map((line) =>
            new Paragraph({
              children: [new TextRun({ text: line, bold: false })],
              spacing: { after: 40 },
            })
          ),

          // HORIZONTAL DIVIDER
          new Paragraph({
            border: {
              bottom: {
                color: '333333',
                space: 1,
                style: BorderStyle.SINGLE,
                size: 12,
              },
            },
            spacing: { after: 240 },
          }),

          // RECIPIENT BLOCK & DATE / REF
          ...letter.recipientBlock.split('\n').map((line, idx, arr) => {
            // Put date and ref on right side corresponding to recipient lines
            return new Paragraph({
              children: [
                new TextRun({ text: line }),
              ],
              spacing: { after: 40 },
            });
          }),

          // REF AND DATE (ALIGNED RIGHT)
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: `Rujukan Kami : ${letter.dateAndRef.refNo || '─'}\nTarikh       : ${letter.dateAndRef.date}`,
                bold: false,
              }),
            ],
            spacing: { before: 120, after: 240 },
          }),

          // SALUTATION
          new Paragraph({
            children: [
              new TextRun({ text: letter.salutation, bold: false }),
            ],
            spacing: { after: 180 },
          }),

          // SUBJECT
          new Paragraph({
            children: [
              new TextRun({
                text: letter.subject,
                bold: true,
                underline: {},
              }),
            ],
            spacing: { after: 200 },
          }),

          // PARAGRAPHS
          ...letter.paragraphs.map((p, idx) => {
            const prefix = idx === 0 ? '' : `${idx + 1}.\t`;
            return new Paragraph({
              children: [
                new TextRun({
                  text: `${prefix}${p}`,
                }),
              ],
              spacing: { after: 180 },
              indent: idx === 0 ? undefined : { left: 360, hanging: 360 },
            });
          }),

          // CLOSING NOTE
          new Paragraph({
            children: [
              new TextRun({ text: letter.closing }),
            ],
            spacing: { before: 120, after: 180 },
          }),

          // SEKIAN TERIMA KASIH
          new Paragraph({
            children: [
              new TextRun({ text: 'Sekian, terima kasih.' }),
            ],
            spacing: { after: 180 },
          }),

          // SLOGAN / VALEDICTION
          new Paragraph({
            children: [
              new TextRun({ text: `"${letter.signatureBlock.phrase}"`, bold: true }),
            ],
            spacing: { after: 720 }, // space for signature
          }),

          // SIGNATURE LINE & SENDER NAME
          new Paragraph({
            children: [
              new TextRun({ text: `(${letter.signatureBlock.name})`, bold: true }),
            ],
            spacing: { after: 40 },
          }),

          // DESIGNATION
          ...(letter.signatureBlock.designation
            ? [
                new Paragraph({
                  children: [new TextRun({ text: letter.signatureBlock.designation })],
                }),
              ]
            : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
