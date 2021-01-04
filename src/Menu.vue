<template>
  <a-layout-sider
    width="200"
    style="background: linear-gradient(#1b61e9, #0a2b9e)"
  >
    <div class="Sider_title">
      <div
        class="Icon_img"
        :style="{
          backgroundImage: 'url(/pic/icons/icon.png)',
          backgroundPosition: treedata[0].Icon,
          display: 'inline-block',
        }"
      ></div>
      <span class="name">{{ treedata[0].Name }}</span>
    </div>
    <a-menu
      :selectedKeys="selectedData"
      mode="inline"
      :inline-collapsed="collapsed"
      @click="handleMenuClick"
    >
      <template v-for="item in treedata[0].Children">
        <a-menu-item v-if="!item.Children" :key="item.Path" :title="item.Name">
          <div
            class="Icon_img2"
            :style="{
              backgroundImage: 'url(/pic/icons/icon.png)',
              backgroundPosition: item.Icon,
              display: 'inline-block',
            }"
          ></div>
          <span>{{ item.Name }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.Path" :menu-info="item" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { Menu } from "ant-design-vue";
import Store from "@/AppStore";
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.Path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail" /><span>{{ menuInfo.Name }}</span>
        </span>
        <template v-for="item in menuInfo.Children">
          <a-menu-item v-if="!item.Children" :key="item.Path">
            <a-icon type="pie-chart" />
            <span>{{ item.Name }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.Path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};
export default {
  components: {
    "sub-menu": SubMenu,
  },
  data() {
    return {
      collapsed: false,
      selectedData: this.selectedKeyData,
    };
  },
  props: ["treedata", "selectedKeyData"],
  // props: {
  //   treedata: {
  //     default: function () {
  //       return [];
  //     },
  //   },
  //   selectedKeyData: {
  //     default: function () {
  //       return [];
  //     },
  //   },
  // },
  methods: {
    handleMenuClick(e) {
      const {
        item: { title },
        key,
      } = e;
      const {
        state: { panes, RoutesIndex },
        setPosition,
        setPanes,
      } = Store;
      const panesData = [...panes];
      // todos.content[0] = title;
      // sessionStorage.setItem("Breadcrumb",JSON.stringify(todos));
      sessionStorage.setItem("pathname", key);
      Store.state.pathname = key;
      setPosition({ Index: 1, Size: 10 }, {});
      let toggle = true;
      let panesDataKey = [];
      panesData.some((item) => {
        if (item.title == title) {
          Store.state.activeTabsKey = item.key;
          panesDataKey = [panesData[0], item];
          toggle = false;
          return true;
        }
      });

      if (toggle) {
        const panesLen = panes.length.toString();
        const obj = {
          key: panesLen,
          title: title,
          path: key,
          routesIndex: RoutesIndex,
        };
        Store.state.activeTabsKey = panesLen;
        panesData.push(obj);
        panesDataKey = [panesData[0], obj];
      }
      sessionStorage.setItem("openKeys", key.split("/")[1]); //记住导航折叠展开
      sessionStorage.setItem("panesDataKey", JSON.stringify(panesDataKey)); //记住当前标签导航
      setPanes(panesData); //保存当前标签导航
      this.selectedData = [key];
      this.$router.replace(key);
    },
  },
};
</script>
<style lang="less">
</style>