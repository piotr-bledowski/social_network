import axios from "axios";

export const shortText = (id, img, text) => {
    if (img) {
        if (text.length > 128) return <p>{text.slice(0, 128)}... <a href={'/post/' + id}>Full post</a></p>

        return <p>{text}</p>
    }

    if (text.length > 512) return <p>{text.slice(0, 512)}... <a href={'/post/' + id}>Full post</a></p>

    return <p>{text}</p>
}

export const apiPost = (uri, type, data) => {
    fetch(`/api/${uri}`, {
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

export const showConvo = username => {
    const convo = document.getElementById(`convo-${username}`);

    convo.style.display = 'block';
}

export const hideConvo = username => {
    const convo = document.getElementById(`convo-${username}`);

    convo.style.display = 'none';
}

export const formatDate = date => {
    let formattedDate = '';

    for (let i = 0; i < date.length - 11; i++) {
        if (i == 10) {
            formattedDate += ' ';
            continue;
        }

        formattedDate += date[i];
    }

    var day = formattedDate.slice(0, 10);
    var hour = formattedDate.slice(10, formattedDate.length);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todayDate = yyyy + '-' + mm + '-' + dd;

    if (todayDate === day)
        return 'Today' + hour;

    var yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    var dd = String(yesterday.getDate()).padStart(2, '0');
    var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = yesterday.getFullYear();

    var yesterdayDate = yyyy + '-' + mm + '-' + dd;

    if (yesterdayDate === day)
        return 'Yesterday' + hour;

    return formattedDate;
}