import Index from "views/index";
// const Index = { template: '<div>foot</div>' }

export default [
    {
        path: '/index',
        component: Index
    },
    {
        path: '*',
        component: Index
    }
]
