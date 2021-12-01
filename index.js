const fileUpload = document.getElementById('file_upload');
fileUpload.addEventListener("change", event => {
    const reader = new FileReader()
    reader.readAsText(event.target.files[0])
    reader.onload = e => {
        const json = JSON.parse(e.target.result)
        let file = ""
        json.forEach(item => {
            if (!item.titleUrl) return;
            const videoId = item.titleUrl.split("?v=").at(-1)
            file += `${videoId}\n`
        })
        file = file.trim()
        const blob = new Blob([file], {type: "text/plain"});
        const fileName = "export.txt"
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    // const json = JSON.parse(event.target.files[0]);

})