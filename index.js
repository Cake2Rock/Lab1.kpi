const fs = require('fs');

function processFile(filePath, outputPath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const htmlContent = markdownToHTML(data);

        if (outputPath) {
            fs.writeFileSync(outputPath, htmlContent, 'utf8');
            console.log(`Successfully written to ${outputPath}`);
        } else {
            console.log(htmlContent);
        }
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

function markdownToHTML(markdownText) {
    function escapeHTML(text) {
        return text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    const bold = /\*\*(.*?)\*\*/g;
    markdownText = markdownText.replace(bold, '<strong>$1</strong>');

    const italic = /_(.*?)_/g;
    markdownText = markdownText.replace(italic, '<em>$1</em>');

    const preformatted = /```([^`]+)```/g;
    markdownText = markdownText.replace(preformatted, '<pre>$1</pre>');

    const monospaced = /`([^`]+)`/g;
    markdownText = markdownText.replace(monospaced, '<code>$1</code>');

    markdownText = markdownText.replace(/\n/g, '<br>');

    return markdownText;
}
const args = process.argv.slice(2);
const inputFile = args[0];
const outputFile = args[1];

if (!inputFile) {
    console.error('No path provided');
    process.exit(1);
}

processFile(inputFile, outputFile);
