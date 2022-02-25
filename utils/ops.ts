

export function updateTheme(theme : string){    
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-default')    
    switch (theme) {
        case 'light':
            document.body.classList.add('theme-light')
            break;
        case 'dark':
            document.body.classList.add('theme-dark')
            break;
        case 'default':
            document.body.classList.add('theme-default')
    }    
}