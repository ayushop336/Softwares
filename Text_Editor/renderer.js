const open = document.getElementById('open');
const save = document.getElementById('save');
const editor = document.getElementById('editor');
const lines = document.getElementById('lines');
const wrap = document.getElementById('wrap');

wrap.addEventListener('click', () => {
    editor.wrap = editor.wrap === "off" ? "soft" : "off";
});

open.addEventListener('click', async () => {
    const res = await window.api.openFile();

    console.log("File content:", res);

    if (res) {
        editor.value = res;
    }
});

save.addEventListener('click', async () => {
    const data = editor.value;
    await window.api.saveFile(data);
});



// function updateLineNumbers() {
//     const lineCount = editor.value.split('\n').length;
//     let numbers = "";

//     for (let i = 1; i <= lineCount; i++) {
//         numbers += i + ".\n";
//     }

//     lines.textContent = numbers;
// }



function updateLineNumbers() {
    let numbers = "";

    if (editor.wrap === "off") {
        // Normal mode (no wrap)
        const lineCount = editor.value.split("\n").length;

        for (let i = 1; i <= lineCount; i++) {
            numbers += i + ".\n";
        }
    } 
    else {
        // WRAP ON — calculate visual lines
        
    }

    lines.textContent = numbers;
}




editor.addEventListener("scroll", () => {
    lines.scrollTop = editor.scrollTop;
});


editor.addEventListener("input", updateLineNumbers);

updateLineNumbers();
