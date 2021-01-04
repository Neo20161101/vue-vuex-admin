<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo">
        <img :src="Logo" alt="logo" />
      </div>
      <div class="info">
        <div>
          <span>{{ userId }} </span> 账号：{{ enterpriseName }}&nbsp;&nbsp;
          <a-tag color="#f50">
            <a href="#" @click="onLoginOut">退出</a>
          </a-tag>
        </div>
        <div>上次登录时间：{{ lastTime }}</div>
      </div>
      <div class="Menu">
        <button
          v-for="(item, index) in MenuData"
          :key="index"
          type="button"
          class="btn"
        >
          <a
            href="#"
            @click="onMenuClick($event, item, index)"
            :class="pathname.indexOf(item.Path) != -1 ? 'active' : ''"
          >
            <div
              class="Icon_img"
              :style="{
                backgroundImage: 'url(/pic/icons/icon.png)',
                backgroundPosition: item.Icon,
              }"
            ></div>
            <span class="title">{{ item.Name }}</span>
          </a>
        </button>
      </div>
    </a-layout-header>
    <a-layout>
      <Menu :treedata="treedata" :selectedKeyData="selectedKeyData" />
      <a-layout>
        <div>
          <a-tabs
            v-model="activeTabsKey"
            type="editable-card"
            @change="onTabsChange"
            @edit="onEdit"
            hide-add
          >
            <a-tab-pane
              v-for="item in panes"
              :key="item.key"
              :tab="item.title"
              :closable="item.closable"
            ></a-tab-pane>
          </a-tabs>
        </div>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import Menu from "../../Menu";
import Logo_img from "../../assets/logo.png";
import Store from "@/AppStore";
export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      lastTime: "lastTime",
      enterpriseName: "enterpriseName",
      userId: "userId",
      Logo: Logo_img,
      MenuData: [],
      pathname: Store.state.pathname,
      activeTabsKey: Store.state.activeTabsKey,
      panes: Store.state.panes,
      treedata: [],
      selectedKeyData:[]
    };
  },
  components: { Menu },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.init();
    this.fetchData();
  },
  beforeRouteEnter(to, from, next) {
    // const {
    //   state: { RoutesIndex },
    // } = Store;
    // console.log("beforeRouteEnter,",RoutesIndex)
    next();
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate(to, from, next) {
    const {
      state: { pathname, activeTabsKey, panes },
    } = Store;
    this.pathname = pathname;
    this.activeTabsKey = activeTabsKey;
    this.panes = panes;
    this.selectedKeyData = [to.path];
    this.treedata2 = [
      {
        Children: null,
        Icon: null,
        Idc: 81,
        IsHide: 1,
        Level: 2,
        MenuId: "0113",
        MenuPid: "01",
        Name: "叫号管理",
        Path: "/BasisInfo/YourTurn",
        Sort: 0,
      },
      {
        Children: null,
        Icon: "0px -21px",
        Idc: 6,
        IsHide: 0,
        Level: 2,
        MenuId: "0101",
        MenuPid: "01",
        Name: "物料管理",
        Path: "/BasisInfo/GoodsInfo",
        Sort: 1,
      },
      {
        Children: null,
        Icon: "-21px -21px",
        Idc: 8,
        IsHide: 0,
        Level: 2,
        MenuId: "0102",
        MenuPid: "01",
        Name: "企业管理",
        Path: "/BasisInfo/EnterpriseInfo",
        Sort: 2,
      },
    ];
    next();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData",
  },
  methods: {
    init() {
      const {
        state: { panes },
        setPanes,
      } = Store;
      const RoutesIndex = sessionStorage.getItem("RoutesIndex")||0;
      const UserInfoPm = JSON.parse(sessionStorage.getItem("UserInfoPm"));
      const LastTime = sessionStorage.getItem("LastTime");
      const pathname = sessionStorage.getItem("pathname") || "/home";
      const panesDataKey =
        JSON.parse(sessionStorage.getItem("panesDataKey")) || panes;
      if (!UserInfoPm || UserInfoPm == "undefined") {
        this.$router.replace("/Login");
        sessionStorage.clear();
        return;
      } //无效数据 直接登陆页

      // if (UserInfoPm.Role!='超管'){
      //     this.getMenuTree(UserInfoPm);
      // } else {
      //     this.getMenuTrees();
      // }
      Store.state.RoutesIndex = +RoutesIndex; //记住头部导航下标
      //   this.enterpriseName=UserInfoPm.Name,
      this.userId = UserInfoPm.UserId;
      this.lastTime = LastTime;
      if (panesDataKey.length > 1) {
        panesDataKey[1].key = "1";
        Store.state.activeTabsKey = "1";
        this.activeTabsKey = "1";
      }
      // this.fetchRoleActionGet({Role:UserInfoPm.Role});//获取权限
      setPanes(panesDataKey);
      this.panes = panesDataKey;
      this.pathname = pathname;
      this.selectedKeyData = [pathname];
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      const {
        state: { RoutesIndex },
        setMenuData,
      } = Store;
      let data = [
        {
          Idc: 0,
          Level: 1,
          MenuId: "00",
          MenuPid: "",
          Path: "/hom",
          Name: "首页",
          Icon: "-4px -3px",
          Children: [
            {
              Idc: 0,
              Level: 2,
              MenuId: "0011",
              MenuPid: "00",
              Path: "/home",
              Name: "首页",
              Icon: "-4px -3px",
            },
          ],
        },
        {
          Idc: 1,
          Level: 1,
          MenuId: "01",
          MenuPid: "",
          Path: "/BasisInfo",
          Name: "基础信息",
          Icon: "-4px -3px",
          Children: [
            {
              Idc: 0,
              Level: 2,
              MenuId: "0110",
              MenuPid: "01",
              Path: "/BasisInfo/0",
              Name: "油品管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 1,
              Level: 2,
              MenuId: "0111",
              MenuPid: "01",
              Path: "/BasisInfo/1",
              Name: "客户管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 2,
              Level: 2,
              MenuId: "0112",
              MenuPid: "01",
              Path: "/BasisInfo/2",
              Name: "供应商管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 3,
              Level: 2,
              MenuId: "0113",
              MenuPid: "01",
              Path: "/BasisInfo/3",
              Name: "租户管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 4,
              Level: 2,
              MenuId: "0114",
              MenuPid: "01",
              Path: "/BasisInfo/4",
              Name: "运输公司管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 5,
              Level: 2,
              MenuId: "0115",
              MenuPid: "01",
              Path: "/BasisInfo/5",
              Name: "装卸鹤位管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 6,
              Level: 2,
              MenuId: "0116",
              MenuPid: "01",
              Path: "/BasisInfo/6",
              Name: "储罐管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 7,
              Level: 2,
              MenuId: "0117",
              MenuPid: "01",
              Path: "/BasisInfo/7",
              Name: "牵引车管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 8,
              Level: 2,
              MenuId: "0118",
              MenuPid: "01",
              Path: "/BasisInfo/8",
              Name: "挂车管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 9,
              Level: 2,
              MenuId: "0119",
              MenuPid: "01",
              Path: "/BasisInfo/9",
              Name: "司机管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 10,
              Level: 2,
              MenuId: "0120",
              MenuPid: "01",
              Path: "/BasisInfo/10",
              Name: "押运员管理",
              Icon: "-4px -3px",
            },
          ],
        },
        {
          Idc: 2,
          Level: 1,
          MenuId: "02",
          MenuPid: "",
          Path: "/Business",
          Name: "业务管理",
          Icon: "-4px -3px",
          Children: [
            {
              Idc: 0,
              Level: 2,
              MenuId: "0110",
              MenuPid: "01",
              Path: "/Business",
              Name: "销售合同管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 1,
              Level: 2,
              MenuId: "0111",
              MenuPid: "01",
              Path: "/Business1",
              Name: "采购合同管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 2,
              Level: 2,
              MenuId: "0112",
              MenuPid: "01",
              Path: "/Business2",
              Name: "租户合同管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 3,
              Level: 2,
              MenuId: "0113",
              MenuPid: "01",
              Path: "/Business3",
              Name: "直销管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 4,
              Level: 2,
              MenuId: "0114",
              MenuPid: "01",
              Path: "/Business4",
              Name: "出库管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 5,
              Level: 2,
              MenuId: "0115",
              MenuPid: "01",
              Path: "/Business5",
              Name: "入库管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 6,
              Level: 2,
              MenuId: "0116",
              MenuPid: "01",
              Path: "/Business6",
              Name: "结算管理",
              Icon: "-4px -3px",
            },
          ],
        },
        {
          Idc: 3,
          Level: 1,
          MenuId: "03",
          MenuPid: "",
          Path: "/Statistical",
          Name: "报表",
          Icon: "-4px -3px",
          Children: [
            {
              Idc: 0,
              Level: 2,
              MenuId: "0110",
              MenuPid: "01",
              Path: "/Statistical",
              Name: "租户出入库月表",
              Icon: "-4px -3px",
            },
            {
              Idc: 1,
              Level: 2,
              MenuId: "0111",
              MenuPid: "01",
              Path: "/Statistical1",
              Name: "东来出库日汇总表",
              Icon: "-4px -3px",
            },
            {
              Idc: 2,
              Level: 2,
              MenuId: "0112",
              MenuPid: "01",
              Path: "/Statistical2",
              Name: "东来入库日汇总表",
              Icon: "-4px -3px",
            },
          ],
        },
        {
          Idc: 4,
          Level: 1,
          MenuId: "04",
          MenuPid: "",
          Path: "/System",
          Name: "系统管理",
          Icon: "-4px -3px",
          Children: [
            {
              Idc: 0,
              Level: 2,
              MenuId: "0110",
              MenuPid: "01",
              Path: "/System",
              Name: "组织架构管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 1,
              Level: 2,
              MenuId: "0111",
              MenuPid: "01",
              Path: "/System1",
              Name: "权限管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 2,
              Level: 2,
              MenuId: "0112",
              MenuPid: "01",
              Path: "/System2",
              Name: "系统配置",
              Icon: "-4px -3px",
            },
            {
              Idc: 3,
              Level: 2,
              MenuId: "0113",
              MenuPid: "01",
              Path: "/System3",
              Name: "车辆安检模板管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 4,
              Level: 2,
              MenuId: "0114",
              MenuPid: "01",
              Path: "/System4",
              Name: "化验模板内容管理",
              Icon: "-4px -3px",
            },
            {
              Idc: 5,
              Level: 2,
              MenuId: "0115",
              MenuPid: "01",
              Path: "/System5",
              Name: "车辆内容调度",
              Icon: "-4px -3px",
            },
          ],
        },
      ];
      let arr = [data[RoutesIndex]];
      setMenuData(data);
      this.MenuData = data;
      this.treedata = arr;
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    onLoginOut(e) {
      // console.log(Store);
      e.preventDefault();
      this.$router.replace("/Login");
    },
    onMenuClick(e, value, index) {
      //头部导航按钮事件
      e.preventDefault();
      const {
        state: { panes },
        setPanes,
      } = Store;
      const path = value.Children[0].Path;
      // const breadcrumb = {name:value.Name,content:[value.Children[0].Name]};
      const panesData = [...panes];
      let toggle = true;
      let panesDataKey = [];
      panesData.some((item) => {
        if (item.title == value.Children[0].Name) {
          Store.state.activeTabsKey = item.key;
          if (item.title != "首页") {
            panesDataKey = [panesData[0], item];
          } else {
            panesDataKey = [panesData[0]];
          }
          toggle = false;
          return true;
        }
      });
      if (toggle) {
        const panesLen = panes.length.toString();
        const obj = {
          key: panesLen,
          title: value.Children[0].Name,
          path: value.Children[0].Path,
          routesIndex: index,
        };
        Store.state.activeTabsKey = panesLen; //记住当前标签导航焦点
        panesData.push(obj);
        panesDataKey = [panesData[0], obj];
      }
      // sessionStorage.setItem("Breadcrumb",JSON.stringify(breadcrumb));//当前位置 暂时没用
      sessionStorage.setItem("RoutesIndex", index); //记住头部导航下标
      sessionStorage.setItem("pathname", path); //记住当前路由
      sessionStorage.setItem("openKeys", path.split("/")[1]); //记住导航折叠展开
      sessionStorage.setItem("panesDataKey", JSON.stringify(panesDataKey)); //记住当前标签导航
      Store.state.pathname = path; //记住当前路由
      Store.state.RoutesIndex = index; //记住头部导航下标
      // Store.state.panes = panesData;//保存当前标签导航
      setPanes(panesData); //保存当前标签导航
      this.$router.replace(path);
    },
    onEdit(targetKey) {
      //头部标签导航删除
      const {
        state: { panes, activeTabsKey },
        setPanes,
      } = Store;
      const panesData = [...panes];
      const activeKey = +targetKey;
      panesData.splice(activeKey, 1);
      panesData.map((item, index) => {
        item.key = `${index}`;
      });
      if (activeTabsKey == activeKey) {
        const data = panesData[activeKey - 1];
        const { key, path, routesIndex } = data;
        sessionStorage.setItem("RoutesIndex", routesIndex); //记住头部导航下标
        sessionStorage.setItem("pathname", path); //记住当前路由
        sessionStorage.setItem("openKeys", path.split("/")[1]); //记住导航折叠展开
        if (panesData.length > 1) {
          sessionStorage.setItem(
            "panesDataKey",
            JSON.stringify([panesData[0], data])
          ); //记住当前标签导航
        } else {
          sessionStorage.setItem(
            "panesDataKey",
            JSON.stringify([panesData[0]])
          ); //记住当前标签导航
        }

        Store.state.pathname = path; //记住当前路由
        Store.state.activeTabsKey = key; //记住当前标签导航焦点
        Store.state.RoutesIndex = routesIndex; //记住头部导航下标
        setPanes(panesData); //保存当前标签导航
        this.$router.replace(path);
      } else {
        let TabsKey = 0;
        if (activeKey > activeTabsKey) {
          TabsKey = +activeTabsKey;
        } else {
          TabsKey = +activeTabsKey - 1;
        }
        setPanes(panesData); //保存当前标签导航
        Store.state.activeTabsKey = `${TabsKey}`; //记住当前标签导航焦点
        // this.$router.replace(panesData[TabsKey].path);
      }
      console.error("删除后的，", panesData);
    },
    onTabsChange(activeKey) {
      const {
        state: { panes },
      } = Store;
      const path = panes[+activeKey].path;
      const RoutesIndex = panes[+activeKey].routesIndex;
      sessionStorage.setItem("RoutesIndex", RoutesIndex); //记住头部导航下标
      sessionStorage.setItem("pathname", path); //记住当前路由
      sessionStorage.setItem("openKeys", path.split("/")[1]); //记住导航折叠展开
      Store.state.pathname = path; //记住当前路由
      Store.state.activeTabsKey = activeKey; //记住当前标签导航焦点
      Store.state.RoutesIndex = +RoutesIndex; //记住头部导航下标
      this.$router.replace(path);
    },
  },
};
</script>
<style lang='less'>
.ant-layout-header.header {
  background: linear-gradient(90deg, #1b61e9, #0a2b9e);
  padding: 0;
  color: #fff;
}
.header .logo {
  float: left;
  padding: 0 30px;
}
.header .logo img {
  width: 100%;
}
.header .info {
  float: right;
  text-align: right;
  padding: 0 15px;
  font-size: 1.2rem;
}
.header .info div {
  height: 30px;
  line-height: 38px;
}
.Menu {
  height: 64px;
  .btn {
    position: relative;
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    padding: 0 6px;
    width: 80px;
    height: 64px;
    a {
      display: block;
      overflow: hidden;
      height: 70%;
      color: #fff;
      padding-top: 1px;
    }
    a.active {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
    }
    span,
    img {
      position: absolute;
      width: 100%;
      display: block;
    }
    span:first-child {
      font-size: 1.8rem;
    }
    img {
      width: 20px;
      left: 50%;
      margin-left: -10px;
    }
    .title {
      height: 20px;
      left: 0;
      line-height: 20px;
      margin-top: 3px;
    }
  }
}
.ant-tabs-bar {
  margin-bottom: 0 !important;
}
</style>