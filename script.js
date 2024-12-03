document.getElementById('print-btn').addEventListener('click', ()=> {
    window.print();
    console.log("hi");
    
});

const saveContent = (filename, content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  document.getElementById('save-btn').addEventListener('click', () => {
    saveContent('filename', 'This is the content to save.');
  });
  


const image = document.getElementById('image');
const cropButton = document.getElementById('crop-btn');
const croppedImage = document.getElementById('cropped-image');

let cropper;
// Initialize cropper


image.onload = () => {
    console.log("Image loaded successfully.");
    cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 2,
    });
   
    console.log("Cropper initialized:", cropper);
    
};

if (image.complete) {
    image.onload();
}

// Crop functionality
cropButton.addEventListener('click', () => {
    if (!cropper) {
        console.error("Cropper not initialized!");
        return;
    }

    const croppedCanvas = cropper.getCroppedCanvas();
    if (croppedCanvas) {
        // Convert the canvas to a Blob
        croppedCanvas.toBlob((blob) => {
            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);

            // Create a link to trigger a download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'cropped-image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Optional: Display cropped image in the UI
            croppedImage.src = url;
            croppedImage.style.display = 'block';
        }, 'image/jpeg'); // Adjust format and quality if needed
    } else {
        alert('Failed to crop the image.');
    }
});
