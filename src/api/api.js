import axios from 'axios'

let base='';

//登录
export const Login=params=>{
    return axios.post(`${base}/Login`,params)
        .then(res=>res.data);
};

//获取 推荐页面 的综合信息
export const getRecommend=params=>{
    return axios.get(`${base}/Recommend`,params)
        .then(res=>res.data);
};

//获取评论
export const getComment=params=>{
    return axios.get(`${base}/Comment`,params)
        .then(res=>res.data);
};

//添加评论
export const addComment=params=>{
    return axios.get(`${base}/AddComment`,{
        params:params
    });
};