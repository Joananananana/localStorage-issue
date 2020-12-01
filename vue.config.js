function mock(app,url,data){
    app.get(url,(Request,Response) => {
        Response.json(data)
    })
}
const homeData = require('./src/mock/bookHome.js')
const shelfData = require('./src/mock/bookShelf.js')
const listData = require('./src/mock/bookList.js')
const flatListData = require('./src/mock/bookFlatList.js')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '',
    devServer:{
        before(app){
            mock(app,'/book/home',homeData)
            mock(app,'/book/shelf',shelfData)
            mock(app,'/book/list',listData)
            mock(app,'/book/flatList',flatListData)
        }
    }
}