import Mock from 'mockjs'

//用户表
const LoginUsers=[
    {
        id:1,
        username:'zzh',
        password:'123456',
        introduce:'666',
        avatar:require('../assets/userInfo.jpg')
    },
    {
        id:2,
        username:'qq',
        password:'123456',
        introduce:'233333',
        avatar:require('../assets/vue.jpg')
    }
];

//推荐页面 综合表
const Recommend=[];

for(let i=0;i<20;i++){
    Recommend.push(Mock.mock({
        id: i,
        image:require('../assets/zh1.jpg'),
        photo:Mock.Random.image('50x50'),
        'playVolume|100-1000':100,
        author:Mock.Random.cname(),
        playtimes:Mock.mock('@time("m:s")'),
        moveTitle:Mock.mock('@csentence(3, 25)'),
        dateTime:Mock.mock('@datetime')
    }))
}

//评论列表
const Comment=[];
for(let i=0;i<10;i++){
    Comment.push(Mock.mock({
        id:i,
        photos:Mock.Random.image('40x40'),
        name:Mock.Random.cname(),
        dateTime:Mock.mock('@now(day)'),
        comments:Mock.mock('@cparagraph')
    }))
}

//导出
export {
    LoginUsers,
    Recommend,
    Comment
}