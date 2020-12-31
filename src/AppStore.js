const store = {
    debug: true,
    state: {
        message: 'Hello!',
        pathname:'/home',
        position:{page:{Index:1,Size:10},query:{}},
        panes:[{ key: '0',title: '首页',path:'/home',closable:false,routesIndex:0 }],
        activeTabsKey:'0',
        RoutesIndex:0,
        MenuData:[]
    },
    setPanes(data){
        store.state.panes = data;
    },
    setMenuData(data){
        store.state.MenuData = data;
    }
}
export default store;