export const FONT_SIZE_LIST = [
    {fontSize : 12},
    {fontSize : 14},
    {fontSize : 16},
    {fontSize : 18},
    {fontSize : 20},
    {fontSize : 22},
    {fontSize : 24}
]
export const FONT_FAMILY = [
    {font:'STXihei'},
    {font:'STSong'},
    {font:'STZhongsong'},
    {font:'STFangsong'},
    {font:'FZShuTi'},
    {font:'FZYaoti'}   
]
export const themeList =  [
        {
            name:'默认',
            style:{
                body:{'color':'#4c5059','background':'#cecece'}
            }
        },
        {
            name:'护眼',
            style:{
                body:{'color':'#404c42','background':'#a9c1a9'}
            }
        },
        {
            name:'夜间',
            style:{
                body:{'color':'#cecece','background':'#000000'}
            }
        }
    ]
export function addCss(href){
    let link = document.getElementById('globalTheme')
    if(link){
        link.setAttribute('href',href)
    }else{
        const link = document.createElement('link')
        link.setAttribute('id','globalTheme')
        link.setAttribute('rel','stylesheet')
        link.setAttribute('type','text/css')
        link.setAttribute('href',href)
        document.getElementsByTagName('head')[0].appendChild(link)
    }
}