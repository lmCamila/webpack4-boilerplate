const cloudName = 'dereqydhf'
const unsignedUploadPreset = 'rcub5wyo'
const progressView = document.getElementById('progress')

const uploadFile = (file) =>{
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('x-Requested-With','XMLHttpRequest')

    //resetar barra de upload
    progressView.style.width = 0

    //mostrar progresso do arquivo
    xhr.upload.addEventListener('progress', (e)=>{
        const progress = Math.round((e.loaded * 100.0)/ e.total)
        progressView.style.width = progress +'%'
        console.log(`fileuploadprogress data.loaded: ${e.loaded},
        data.total: ${e.total}`)
    })

    xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4 && xhr.status == 200){
            const response = JSON.parse(xhr.responseText)
            const url = response.secure_url
            const tokens = url.split('/');
            tokens.splice(-2, 0, 'h_250,w_250,c_scale');
            document.getElementById('avatar').setAttribute('data-url',tokens.join('/'))
        }
    }
    fd.append('upload_preset', unsignedUploadPreset)
    fd.append('tags','browser_upload')
    fd.append('file',file)
    xhr.send(fd)
}

export{ uploadFile }