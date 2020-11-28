const store = {
    state:{
        hotSearchOffsetY:0,
        flapCardVisible:false,
        runFlapCardAnimation:true
    },
    mutations:{
        SET_HOT_SEARCH_OFFSETY(state,offsetY){
            state.hotSearchOffsetY = offsetY
        },
        SET_FLAP_CARD_VISIBLE(state,visible){
            state.flapCardVisible = visible
        },
        SET_RUN_FLAP_CARD_ANIMATION(state,bool){
            state.runFlapCardAnimation = bool
        }
    }
}
export default store