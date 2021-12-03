const fileUpload = document.getElementById('file_upload');
const csvUpload = document.getElementById('csv_upload');
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

csvUpload.addEventListener("change", event => {
    const reader = new FileReader()
    reader.readAsText(event.target.files[0])
    reader.onload = e => {
        const regex = /[0-9A-Za-z_-]{10}[048AEIMQUYcgkosw]/
        const text = e.target.result
        const csv = text.toString().split(",").map(s => s.split("\n")).map(s => s.filter(s => regex.test(s)))
        // let file = ""
        // csv.map(s => {
        //     console.log(s)
        // }).forEach(e => {
        //     console.log(e)
        //     file += `${e.trim()}\n`
        // })
        let file = ""
        csv.forEach(s => {
            s.forEach(e => {
                if (e.trim().length == 11)
                file += `${e.trim()}\n`
            })
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
})