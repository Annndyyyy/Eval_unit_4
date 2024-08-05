const files = [
    'document1.txt', 'presentation1.pdf', 'song1.mp3', 'installer1.exe', 'archive1.rar',
    'report1.docx', 'image1.jpg', 'graphic1.png', 'animation1.gif', 'compressed1.zip',
    'document2.txt', 'presentation2.pdf', 'song2.mp3', 'installer2.exe', 'archive2.rar',
    'report2.docx', 'image2.jpg', 'graphic2.png', 'animation2.gif', 'compressed2.zip',
    null, 'presentation3.pdf', '', 'installer3.exe', 'archive3.rar',
    'report3.docx', 'image3.jpg', 'graphic3.png', 'animation3.gif', 'compressed3.zip',
    'document4.txt', 'presentation4.pdf', 'song4.mp3', 'installer4.exe', 'archive4.rar',
    'report4.docx', 'image4.jpg', 'graphic4.png', 'animation4.gif', 'compressed4.zip',
    'document5.txt', 'presentation5.pdf', 'song5.mp3', 'installer5.exe', 'archive5.rar',
    'report5.docx', 'image5.jpg', 'graphic5.png', 'animation5.gif', 'compressed5.zip',
    'document6.txt', 'presentation6.pdf', 'song6.mp3', 'installer6.exe', 'archive6.rar',
    'report6.docx', 'image6.jpg', null, 'animation6.gif', 'compressed6.zip',
    'document7.txt', 'presentation7.pdf', 'song7.mp3', 'installer7.exe', 'archive7.rar',
    'report7.docx', 'image7.jpg', 'graphic7.png', 'animation7.gif', 'compressed7.zip',
    'document8.txt', 'presentation8.pdf', 'song8.mp3', 'installer8.exe', 'archive8.rar',
    'report8.docx', 'image8.jpg', '', 'animation8.gif', 'compressed8.zip',
    'document9.txt', 'presentation9.pdf', 'song9.mp3', 'installer9.exe', 'archive9.rar',
    'report9.docx', 'image9.jpg', '', 'animation9.gif', 'compressed9.zip',
    'document10.txt', 'presentation10.pdf', 'song10.mp3', 'installer10.exe', 'archive10.rar',
    'report10.docx', 'image10.jpg', 'graphic10.png', 'animation10.gif', 'compressed10.zip',
  ];
  


const fileData = files.filter(file => file).map(file => {
    const type = file.split('.').pop();
    return { id: file, name: file, type: type };
});


const categories = [...new Set(fileData.map(file => file.type))];
const categorizedFiles = categories.reduce((acc, type) => {
    acc[type] = fileData.filter(file => file.type === type);
    return acc;
}, {});

const foldersContainer = document.getElementById('folders-container');
const filesContainer = document.getElementById('files-container');
const filesList = document.getElementById('files-list');
const searchBox = document.getElementById('search-box');
const sortButton = document.getElementById('sort-button');

let currentType = '';
let sortOrder = 'asc';


function displayFolders() {
    foldersContainer.innerHTML = '';
    categories.forEach(type => {
        const folder = document.createElement('div');
        folder.textContent = type;
        folder.className = 'folder';
        folder.addEventListener('click', () => showFiles(type));
        foldersContainer.appendChild(folder);
    });
}


function showFiles(type) {
    currentType = type;
    updateFileList(categorizedFiles[type] || []);
}

function updateFileList(files) {
    filesList.innerHTML = '';
    files.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = `${file.name} (${file.type})`;
        filesList.appendChild(listItem);
    });
}


function searchFiles() {
    const query = searchBox.value.toLowerCase();
    if (query) {
        
        const filteredFiles = fileData.filter(file => file.type.toLowerCase().includes(query));
        updateFileList(filteredFiles);
    } else {
       
        showFiles(currentType);
    }
}


function sortFiles() {
    const files = Array.from(filesList.children);
    const sortedFiles = files.sort((a, b) => {
        const nameA = a.textContent.split(' ')[0].toLowerCase();
        const nameB = b.textContent.split(' ')[0].toLowerCase();
        if (sortOrder === 'asc') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });
    sortedFiles.forEach(file => filesList.appendChild(file));
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    sortButton.textContent = sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending';
}


searchBox.addEventListener('input', searchFiles);
sortButton.addEventListener('click', sortFiles);


displayFolders();
