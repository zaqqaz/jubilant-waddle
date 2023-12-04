import * as http from 'http';
import * as fs from 'fs';
import {exec} from 'child_process';
import {createInterface} from 'readline';
import * as open from 'open';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

const port = 8000;
const allowedPaths = ['/cms.html', '/config.yml'];


export function generateConfig(appName: string) {
    const config = `
backend:
  name: git-gateway

local_backend: true
media_folder: "blogs/${appName}/public/uploads" # Where media files will be stored
public_folder: "blogs/${appName}/public/uploads" # Where the media files can be accesed from the server

collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "blogs/${appName}/content/blogs" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime", date_format: "DD.MM.YYYY", time_format: "HH:mm", format: "LLL"}
      - {label: "Body", name: "body", widget: "markdown"}
`;
    return config
}

rl.question('Enter the blog name you want to edit: ', async (blogName: string) => {
    fs.writeFileSync('config.yml', generateConfig(blogName || 'my-app'));

    exec('npx decap-server');

    await new Promise(r => setTimeout(r, 1500));

    const server = http.createServer((req, res) => {
        // Serve only specific files
        if (req.url && allowedPaths.includes(req.url)) {
            const filePath = `.${req.url}`;

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading file');
                }

                res.writeHead(200);
                res.end(data);
            });
        } else {
            res.writeHead(404);
            res.end('File not found');
        }
    });

    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
        open(`http://localhost:${port}/cms.html`);
    });

    rl.close();
});
