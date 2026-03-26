const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const FIGMA_TOKEN = "<YOUR_FIGMA_TOKEN>";
const FILE_KEY = "ziRilpb4uf42X4NJx73Hfa";
const NODE_ID = "0:1"; // Admin Dashboard
const API_URL = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${NODE_ID}`;

const OUTPUT_RAW = path.join(__dirname, 'figma_raw_node.json');
const OUTPUT_TOKENS = path.join(__dirname, 'design_tokens.json');
const OUTPUT_SPEC = path.join(__dirname, 'screen_spec.md');

// Helper: RGB to Hex
function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
}

// 1. Fetch Data
console.log(`Fetching node ${NODE_ID} from Figma...`);

const options = {
    headers: {
        'X-Figma-Token': FIGMA_TOKEN
    }
};

https.get(API_URL, options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error(`Error: Status Code ${res.statusCode}`);
            console.error(data);
            process.exit(1);
        }

        try {
            const json = JSON.parse(data);
            fs.writeFileSync(OUTPUT_RAW, JSON.stringify(json, null, 2));
            console.log("Raw data saved.");

            processData(json);
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
    });

}).on('error', (e) => {
    console.error("Request error:", e);
});

// 2. Process Data
function processData(json) {
    // Structure: { nodes: { "0:1": { document: { ... } } } }
    const rootNode = json.nodes[NODE_ID].document;

    // --- Extract Tokens ---
    const colors = new Set();

    function extractColors(node) {
        if (node.fills) {
            node.fills.forEach(fill => {
                if (fill.type === 'SOLID' && fill.color) {
                    colors.add(rgbToHex(fill.color.r, fill.color.g, fill.color.b));
                }
            });
        }
        if (node.strokes) {
            node.strokes.forEach(stroke => {
                if (stroke.type === 'SOLID' && stroke.color) {
                    colors.add(rgbToHex(stroke.color.r, stroke.color.g, stroke.color.b));
                }
            });
        }
        if (node.backgroundColor) {
            colors.add(rgbToHex(node.backgroundColor.r, node.backgroundColor.g, node.backgroundColor.b));
        }

        if (node.children) {
            node.children.forEach(extractColors);
        }
    }
    extractColors(rootNode);

    const matchColorName = ["Primary", "Secondary", "Background", "Surface", "Text", "Border"];
    const tokens = {
        colors: Array.from(colors).map((c, i) => ({
            name: i < matchColorName.length ? matchColorName[i] : `color-${i + 1}`,
            value: c
        })),
        typography: {
            fontFamily: "Inter, sans-serif"
        }
    };

    fs.writeFileSync(OUTPUT_TOKENS, JSON.stringify(tokens, null, 2));
    console.log("Tokens generated.");

    // --- Extract Spec ---
    let specContent = `# Screen Specification: ${rootNode.name}\n\n`;

    specContent += `## Structure Hierarchy\n\n`;

    // Recursive function to print tree
    function printTree(node, depth = 0) {
        const indent = '  '.repeat(depth);
        let detail = `(${node.type})`;

        if (node.type === 'TEXT') {
            const text = (node.characters || "").replace(/\n/g, "\\n").substring(0, 50);
            detail += ` "${text}"`;
        }

        specContent += `${indent}- **${node.name}** ${detail}\n`;

        if (node.children) {
            node.children.forEach(child => printTree(child, depth + 1));
        }
    }

    // Define helper to analyze components
    function analyzeComponents(node) {
        const lowerName = node.name.toLowerCase();
        const isInteractive = lowerName.includes('button') || lowerName.includes('input') || lowerName.includes('search') || lowerName.includes('checkbox') || lowerName.includes('icon');

        if (isInteractive || node.type === 'TEXT') { // Include text for context
            let content = node.characters ? node.characters.replace(/\n/g, " ") : "-";
            if (content.length > 30) content = content.substring(0, 30) + "...";

            if (isInteractive) {
                specContent += `| ${node.name} | ${node.type} | Yes | ${content} |\n`;
            }
        }
        if (node.children) {
            node.children.forEach(analyzeComponents);
        }
    }

    // List all top-level frames to help identify structure
    specContent += "## Top Level Frames Found:\n";
    if (rootNode.children) {
        rootNode.children.forEach(c => {
            specContent += `- ${c.name} (${c.type}) (ID: ${c.id})\n`;
        });
    }
    specContent += "\n";

    // Recursively print everything to be safe
    specContent += "## Full Structure Hierarchy\n\n";

    // Print all children of the root page
    if (rootNode.children) {
        rootNode.children.forEach(child => {
            specContent += `### Frame: ${child.name}\n`;
            printTree(child, 1);
        });
    }

    // Analyze components for all frames
    specContent += `\n## Component Analysis (All Frames)\n\n`;
    specContent += `| Node Name | Type | Potential Interactive | Text Content |\n`;
    specContent += `|---|---|---|---|\n`;

    if (rootNode.children) {
        rootNode.children.forEach(analyzeComponents);
    }

    // --- Fetch Comments and Write Spec ---
    const commentOptions = {
        hostname: 'api.figma.com',
        path: `/v1/files/${FILE_KEY}/comments`,
        headers: { 'X-Figma-Token': FIGMA_TOKEN }
    };

    const reqComments = https.get(commentOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                const comments = json.comments || [];

                if (comments.length > 0) {
                    specContent += `\n\n## Design Comments / Annotations\n`;
                    comments.forEach(c => {
                        // Parse client_meta to find where the comment is located if possible
                        let location = c.client_meta && c.client_meta.node_id ? `(Node: ${c.client_meta.node_id})` : "(General)";
                        specContent += `- **[${c.user.handle}]** ${location}: ${c.message}\n`;
                    });
                } else {
                    specContent += `\n\n## Design Comments\nNo comments found.\n`;
                }
            } catch (e) {
                specContent += `\n\n## Design Comments\nError fetching comments: ${e.message}\n`;
            }

            fs.writeFileSync(OUTPUT_SPEC, specContent);
            console.log("Spec generated with comments.");
        });
    });

    reqComments.on('error', (e) => {
        console.error("Error fetching comments:", e);
        // Fallback write without comments
        fs.writeFileSync(OUTPUT_SPEC, specContent);
        console.log("Spec generated (without comments due to error).");
    });
}
