import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers,Recommend,Comment } from './data.js';
let _Comment=Comment;

import Mock from 'mockjs';

export default{
    mock(){
        let mock=new MockAdapter(axios);
        //模拟成功请求
        mock.onGet('/success').reply(200,{
            msg:'success'
        });
        //模拟失败请求
        mock.onGet('/error').reply(500,{
            msg:'failure'
        });

        //登录验证
        mock.onPost('/Login').reply(config=>{
            let {username,password}=JSON.parse(config.data);
            return new Promise((resolve,reject)=>{
                let users=null;
                setTimeout(()=>{
                    let hasUser=LoginUsers.some(u=>{
                        if(u.username===username && u.password===password){
                            //检查登录账号和密码
                            users=JSON.parse(JSON.stringify(u));
                            users.password=undefined;
                            return true;
                        }
                    });
                    if(hasUser){
                        resolve([200,{
                            code:200,
                            msg:'请求成功',
                            users
                        }]);
                    }else{
                        resolve([200,{
                            code:500,
                            msg:'账号或密码错误'
                        }]);
                    }
                },500);
            })
        })

        // 推荐页面 内容
        mock.onGet('/Recommend').reply(config=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve([200,{
                        Recommend
                    }]);
                },500);
            });
        })

        //评论列表
        mock.onGet('/Comment').reply(config=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve([200,{
                        Comment
                    }]);
                },500);
            });
        })

        //添加评论
        mock.onGet('/AddComment').reply(config=>{
            let { id,comments,avatar,name,dateTime } =config.params;
            _Comment.push({
                id:_Comment.length,
                comments:comments,
                photos:avatar,
                dateTime:dateTime,
                name:name
            });
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve([200,{
                        code:200,
                        msg:'评论成功'
                    }]);
                },500);
            })
        })
    }
}