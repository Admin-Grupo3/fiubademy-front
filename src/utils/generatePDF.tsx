import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

    async function createPdf(titleText:string, studentName:string, courseName:string, grade:number) {
      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create()

      // Embed the Times Roman font
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
			const height= 792
      const width= 612
      // Add a blank page to the document with landscape orientation
			const page = pdfDoc.addPage([height, width]);
			
      const companyName = 'Fiubademy';
      const fontSize = 30;

      // Calculate the x-coordinate to center the title
      const companyWidth = timesRomanFont.widthOfTextAtSize(companyName, fontSize);
      const copmanyX = (height - companyWidth) / 2;

      // Calculate the x-coordinate to center the title
      const titleWidth = timesRomanFont.widthOfTextAtSize(titleText, fontSize);
      const titleX = (height - titleWidth) / 2;
      
			page.drawText("Fiubademy", {
        x: copmanyX,
        y: width - 3 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      });
      page.drawText(titleText, {
        x: titleX,
        y: width - 5 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      });
			page.drawText("Certifico que el alumno: " + studentName,
       {
        x: 50,
        y: width - 8 * fontSize,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0 , 0),
      }
      )
      page.drawText("ha aprobado el curso: " + courseName ,
       {
        x: 50,
        y: width - 9.5 * fontSize,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0, 0 ),
      }
      )
      page.drawText(" con una calificacion de: " + grade ,
       {
        x: 50,
        y: width - 11 * fontSize,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0, 0 ),
      }
      )
      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'certificate.pdf';
      link.click();
      console.log("PDF created:", pdfBytes)
    }
    export default createPdf