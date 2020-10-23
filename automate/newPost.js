const fs = require('fs');
const articles = './src/pages/articles/';
let dateName = ''
let folderName = ''
let postTitle = process.argv.slice(2)[0];
const date = new Date();

function createFolder () {
    
    dateName = date.toISOString().substring(0, 10)
    folderName = `${dateName}---${postTitle.split(' ').join('-')}`
    
    let dir = `${articles}${folderName}`
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        console.warn(`Folder "${folderName}" is created"`)
    }
}

function createPost () {
    const template = fs.readFileSync('./automate/template.md','utf8')
    const content = replaceTemplate(template); 
    fs.writeFile(articles + folderName + '/index.md', content, err => {
        if (err) throw err;
        console.log('The Post was succesfully create!');
    })
}

function replaceTemplate (template) {

    const pathName = postTitle
                        .split(' ')
                        .join('-')
                        .toLowerCase()

    let content = template
                    .replace('{{TITLE}}', postTitle)
                    .replace('{{DATE}}', date.toString())
                    .replace('{{PATH_NAME}}', pathName)
    
    return content
}

createFolder()
createPost()