/*
 * @Description: 指示面板模块
 */

export default {
    path: '/dashboard',
    name: 'dashboard',
    access: 'adminRouteFilter',
    exact: true,
    routes: [
        {
            path: '/dashboard',
            redirect: '/dashboard/work-bench',
            exact: true,
        },
        {
            path: '/dashboard/work-bench',
            name: 'work-bench',
            component: './Dashboard/Workbench',
            access: 'adminRouteFilter',
            exact: true,
        },
        {
            path: '/dashboard/environmental-dependence',
            name: 'environmental-dependence',
            component: './Dashboard/EnvironmentalDependence',
            access: 'adminRouteFilter',
            exact: true,
        },
    ],
}