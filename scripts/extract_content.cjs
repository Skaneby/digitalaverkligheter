
const fs = require('fs');
const path = require('path');

const SQL_FILE_PATH = '/Volumes/SSD_2TB/digitalaverkligheter/backup_2026_01_17_18_11_14-6e65cdc6-all/backup_2026_01_17_18_11_14-6e65cdc6-db.sql';
const OUTPUT_FILE = path.join(__dirname, '../src/data/migrated_content.json');

try {
    console.log("Reading SQL file...");
    const sqlContent = fs.readFileSync(SQL_FILE_PATH, 'utf8');
    
    // Helper to extract values block
    function extractValues(tableName, nextTableName) {
        const startMarker = `INSERT INTO \`${tableName}\` VALUES`;
        const startIndex = sqlContent.indexOf(startMarker);
        if (startIndex === -1) {
            console.log(`Table ${tableName} not found.`);
            return null;
        }

        let endIndex;
        if (nextTableName) {
            const nextMarker = `INSERT INTO \`${nextTableName}\``;
            endIndex = sqlContent.indexOf(nextMarker, startIndex);
        }
        
        // If next table not found or not provided, find the last semi-colon of this statement?
        // But usually there is a newline after ;.
        
        let valuesStr = '';
        if (endIndex !== -1 && endIndex > startIndex) {
             valuesStr = sqlContent.substring(startIndex + startMarker.length, endIndex);
        } else {
             // Fallback or read until end?
             // This can handle the last table case if needed.
             // For www0_posts, we know www0_term_relationships follows.
             console.log(`Next table ${nextTableName} not found after ${tableName}. Using approximate end.`);
             // Try searching for ";\n"
             // But content can have it. 
             // We will assume standard dump format: newline + INSERT
             // If we can't find next table, this might fail or produce partial.
             return null;
        }

        // Trim whitespace and trailing semicolon/newline
        return valuesStr.trim().replace(/;$/, '');
    }

    const postsValues = extractValues('www0_posts', 'www0_term_relationships');
    
    if (!postsValues) {
        console.error("Could not extract posts.");
        process.exit(1);
    }

    console.log("Parsing posts...");
    
    let allPosts = [];

    // Parser state
    let depth = 0;
    let currentStart = 0;
    let inQuote = false;
    let quoteChar = '';
    let escape = false;

    // The string starts with ( likely. matches (row), (row)
    
    for (let i = 0; i < postsValues.length; i++) {
        const char = postsValues[i];
        
        if (escape) {
            escape = false;
            continue;
        }

        if (char === '\\') {
            escape = true;
            continue;
        }

        if ((char === '"' || char === "'") && !inQuote) {
            inQuote = true;
            quoteChar = char;
        } else if (char === quoteChar && inQuote) {
            inQuote = false;
        }

        if (!inQuote) {
            if (char === '(') {
                if (depth === 0) currentStart = i;
                depth++;
            } else if (char === ')') {
                depth--;
                if (depth === 0) {
                    const rowStr = postsValues.substring(currentStart + 1, i);
                    parseRow(rowStr);
                }
            }
        }
    }

    function parseRow(rowStr) {
        const values = [];
        let currentVal = '';
        let inQuote = false;
        let quoteChar = '';
        let escape = false;

        for (let i = 0; i < rowStr.length; i++) {
            const char = rowStr[i];
            
            if (escape) {
                currentVal += char;
                escape = false;
                continue;
            }

            if (char === '\\') {
                escape = true;
                // Don't skip regex escaped chars inside string?
                // The SQL dumping escapes ' as \'. We want to keep just ' in the value.
                // If it is \n, we want newline.
                // Simple unescape map:
                // r->\r, n->\n, t->\t, '->', "->", \->\
                if (i + 1 < rowStr.length) {
                    const next = rowStr[i+1];
                    // We handle the next char in the next iteration? No.
                    // We must consume it here.
                    // But simpler: just set escape flag and let next iteration handle adding it.
                    // Wait, if I set escape=true, next char is added literally.
                    // If \n is in string as \ and n. 
                    // SQL dump: 'line\nbreak'.
                    // escape=true at \, next is n. currentVal += n. Result: linenbreak. Wrong.
                    // We need to decode escapes.
                }
                continue; 
            }

            if ((char === '"' || char === "'") && !inQuote) {
                inQuote = true;
                quoteChar = char;
                continue; 
            } else if (char === quoteChar && inQuote) {
                inQuote = false;
                continue; 
            }

            if (!inQuote && char === ',') {
                values.push(currentVal);
                currentVal = '';
            } else {
                if (escape) {
                    // Handle SQL escapes roughly
                    if (char === 'n') currentVal += '\n';
                    else if (char === 'r') currentVal += '\r';
                    else currentVal += char; 
                } else {
                    currentVal += char;
                }
            }
        }
        values.push(currentVal);

        // Map values
        // Note: values are strings. Numbers might be strings.
        
        // Safety check on length
        if (values.length < 20) return;

        const post = {
            id: values[0],
            date: values[2],
            content: values[4],
            title: values[5],
            status: values[7],
            slug: values[11],
            type: values[20]
        };

        if ((post.type === 'post' || post.type === 'page') && post.status === 'publish') {
           allPosts.push(post);
        }
    }

    console.log(`Found ${allPosts.length} published posts/pages.`);
    
    // Ensure data dir exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allPosts, null, 2));

} catch (err) {
    console.error("Error:", err);
}
