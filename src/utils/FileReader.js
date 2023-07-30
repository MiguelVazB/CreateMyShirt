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
        const url = URL.createObjectURL(selectedFile);
        callback({ content, url });
    });

    // Read the selected file as text
    reader.readAsText(selectedFile);
}