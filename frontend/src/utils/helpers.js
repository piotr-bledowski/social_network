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