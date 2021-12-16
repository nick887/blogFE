import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import Blog from "@/components/Blog";
import BackEnd from "@/components/BackEnd";
import EditMd from "@/components/EditMd";
import BlogManage from "@/components/BlogManage";
import Login from "@/components/Login";
import FileManage from "@/components/FileManage";
Vue.use(VueRouter)

const routes=[
    {
        path:'/home',
        component:Home
    },
    {
        path: '',
        redirect:'/home'
    },
    {
        path: '/blog/:id',
        component: Blog
    },
    {
        path: '/admin',
        component: BackEnd,
        children:[
            {
                path:'editMd',
                component:EditMd
            },
            {
                path: 'blogManage',
                component: BlogManage
            },
            {
                path: '',
                redirect:'editMd'
            },
            {
                path: 'fileManage',
                component: FileManage
            }
        ]
    },
    {
        path: '/login',
        component: Login
    }
]

const router =new VueRouter({
    routes,
    mode:'history'
})
router.beforeEach((to,from,next)=>
{
    console.log(to.path);
    if(to.path==="/admin/editMd")
    {
        const tokenStr=window.sessionStorage.getItem('token');
        if(!tokenStr) {
            return next("/login");
        }
    }
    next();



})
export default router