import Index from "views/index";
import Issue from "views/issue";
// const Index = { template: '<div>foot</div>' }

export default [
    {
        path: '/index',
        component: Index
    },
    {
        path: '/issue',
        component: Issue
    },
    {
        path: '*',
        component: Index
    }
]
