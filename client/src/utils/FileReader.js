export default function readFileContent(selectedFile, callback) {
    // Check if a file was selected
    if (!selectedFile) {
        callback({ content: 'No file selected', url: '' });
        return;
    }

    // Create a new FileReader
    const reader = new FileReader();

    // Add an event listener to handle the FileReader load event
    reader.addEventListener('load', (event) => {
        const content = event.target.result;
        // For images, use base64 data URL instead of blob URL so it can be saved to localStorage
        const url = selectedFile.type.startsWith('image/') ? content : URL.createObjectURL(selectedFile);
        callback({ content, url });
    });

    // Read the selected file as data URL (base64) for images, or text for other files
    if (selectedFile.type.startsWith('image/')) {
        reader.readAsDataURL(selectedFile);
    } else {
        reader.readAsText(selectedFile);
    }
}