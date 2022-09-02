export const shortText = (img, text) => {
    if (img) {
        if (text.length > 128) return <p>{text.slice(0, 128)}... <a href='#'>Full post</a></p>

        return <p>{text}</p>
    }

    if (text.length > 512) return <p>{text.slice(0, 512)}... <a href='#'>Full post</a></p>

    return <p>{text}</p>
}