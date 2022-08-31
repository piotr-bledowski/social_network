const setThemeName = (themeName, setName) => {
    switch (themeName) {
        case 'espresso':
            setName('Espresso');
            break;
        case 'cappuccino':
            setName('Cappucino');
            break;
        case 'latte':
            setName('Latte');
            break;
        case 'yerba':
            setName('Yerba Mate');
            break;
        default:
            console.log('Invalid theme name received!');
    }
}

export default setThemeName;