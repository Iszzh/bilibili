import getters from './getters'

const state={
    top:true
};

const mutations={
    showTop(state){
        state.top=true;
    },
    hideTop(state){
        state.top=false;
    }
}

export default{
    state,
    mutations,
    getters
}