const https = require('https');
const FIGMA_TOKEN = "<YOUR_FIGMA_TOKEN>";
const FILE_KEY = "ziRilpb4uf42X4NJx73Hfa";

const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${FILE_KEY}/comments`,
    method: 'GET',
    headers: { 'X-Figma-Token': FIGMA_TOKEN }
};

const req = https.request(options, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const comments = JSON.parse(data).comments;
            if (comments && comments.length > 0) {
                console.log("Found " + comments.length + " comments:");
                comments.forEach(c => {
                    console.log(`- [${c.user.handle}]: ${c.message} (at ${c.client_meta.node_id || 'general'})`);
                });
            } else {
                console.log("No comments found.");
            }
        } catch (e) {
            console.log("Error parsing response:", data);
        }
    });
});

req.on('error', error => {
    console.error(error);
});

req.end();
