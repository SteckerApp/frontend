export const getBOrWFomColor = (color:string) =>{
    if (!color) { return ''; }
    return (parseInt(color.replace('#', '').substring(0,6), 16) > 0xffffff / 2) ? '#000' : '#fff';
}