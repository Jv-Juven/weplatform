import Index from "views/index";
import Issue from "views/issue";
import Stalls from "views/stalls";
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
        path: '/stalls',
        component: Stalls
    },
    {
        path: '*',
        component: Index
    }
]
