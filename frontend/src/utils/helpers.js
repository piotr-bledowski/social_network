import axios from "axios";

export const shortText = (id, img, text) => {
    if (img) {
        if (text.length > 128) return <p>{text.slice(0, 128)}... <a href={'post/' + id}>Full post</a></p>

        return <p>{text}</p>
    }

    if (text.length > 512) return <p>{text.slice(0, 512)}... <a href={'post/' + id}>Full post</a></p>

    return <p>{text}</p>
}

export const apiPost = (uri, type, data) => {
    fetch(`/api/${uri}/`, {
        method: 'POST',
        headers: {
            'Content-Type': type
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => console.log(res));
}

// api POST request including files using axios
export const imgApiPost = (uri, formData) => {
    axios.post(
        `/api/${uri}`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then(res => console.log(res))
        .catch(error => console.log(error));
}

export const showDialog = (type, id) => {
    const darkener = document.getElementById('screen-darkener');
    const dialog = document.getElementById(`dialog-div-${type}-${id}`);

    darkener.style.display = 'block';
    dialog.style.display = 'block';
}

export const hideDialog = (type, id) => {
    const darkener = document.getElementById('screen-darkener');
    const dialog = document.getElementById(`dialog-div-${type}-${id}`);

    darkener.style.display = 'none';
    dialog.style.display = 'none';
}

export const showConvo = id => {
    const convo = document.getElementById(`convo-${id}`);

    convo.style.display = 'block';
}

export const hideConvo = id => {
    const convo = document.getElementById(`convo-${id}`);

    convo.style.display = 'none';
}