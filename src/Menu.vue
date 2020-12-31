<template>
  <a-layout-sider
    width="200"
    style="background: linear-gradient(#1b61e9, #0a2b9e)"
  >
    <div class="Sider_title">
      <div
        className="Icon_img"
        :style="{
          backgroundImage: 'url(/pic/icons/icon.png)',
          backgroundPosition: treedata[0].Icon,
          display: 'inline-block',
        }"
      ></div>
      <span className="name">{{ treedata[0].Name }}</span>
    </div>
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in treedata[0].Children">
        <a-menu-item v-if="!item.Children" :key="item.Path">
          <a-icon type="pie-chart" />
          <span>{{ item.Name }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.Path" :menu-info="item" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import { Menu } from "ant-design-vue";
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
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter131243214,", to);
    next();
  },
  data() {
    return {
      collapsed: false,
    };
  },
  props: {
    treedata: {
      default: function () {
        return [];
      },
    },
  },
};
</script>