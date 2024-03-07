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
