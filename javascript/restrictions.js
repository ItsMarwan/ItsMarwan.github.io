document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', event => {
    if (event.key === 'F12') {
        event.preventDefault();
    }
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'I') {
        event.preventDefault();
    }
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'J') {
        event.preventDefault();
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'U') {
        event.preventDefault();
    }
});