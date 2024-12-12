// Import the PDF.js library
import { pdfjsLib } from 'pdfjs-dist';

// Set the workerSrc property to specify the location of the PDF.js worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// Function to render a PDF document
function renderPDF(url, canvasContainer) {
    // Fetch the PDF document from the URL
    pdfjsLib.getDocument(url).promise.then(pdfDoc => {
        // Get the first page of the PDF
        pdfDoc.getPage(1).then(page => {
            // Set the scale for rendering
            const scale = 1.5;
            const viewport = page.getViewport({ scale: scale });

            // Prepare the canvas using PDF page dimensions
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Append the canvas to the container
            canvasContainer.appendChild(canvas);

            // Render the PDF page into the canvas context
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }).catch(error => {
        console.error('Error rendering PDF:', error);
    });
}

// Example usage: Render a PDF document in a container with the ID 'pdf-container'
document.addEventListener('DOMContentLoaded', () => {
    const pdfUrl = '/path/to/your/document.pdf'; // Replace with the actual URL of the PDF
    const container = document.getElementById('pdf-container');
    if (container) {
        renderPDF(pdfUrl, container);
    } else {
        console.error('PDF container not found');
    }
});
