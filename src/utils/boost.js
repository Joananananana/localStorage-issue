Array.prototype.pushWithoutDuplicate = function(){
    for(let i =0; i<arguments.length;i++){
        const arg = arguments[i]
        if(this.indexOf(arg) === -1){
            this.push(arg)
        }
    }
}//编辑书架 将选中状态图书加入数组时避免重复