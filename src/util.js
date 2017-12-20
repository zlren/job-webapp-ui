// 根据用户信息返回跳转地址
export function getRedirectPath({type, avatar}) {

    console.log('getRedirectPath', type, avatar);

    // user.type /boss /genius
    // user.avatar /bossinfo /geniusinfo
    let url = (type === 'boss') ? '/boss' : '/genius';
    if (!avatar) {
        url += 'info';
    }

    console.log('url是', url);

    return url;
}
