<template>
  <div>
    <div class="form">
      <a-form layout="inline" :form="form" @submit="onSearch">
        <a-form-item label="油品名称">
          <a-input v-decorator="['Name']" placeholder="请输入油品名称">
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="success" html-type="submit"> 查询 </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="site-page-header-ghost-wrapper">
      <a-page-header>
        <a-space>
          <a-button icon="plus" type="primary">新增</a-button>
        </a-space>
      </a-page-header>
    </div>
    <a-table
      rowKey="Idc"
      :columns="columns"
      :data-source="data"
      :rowClassName="tableRowClassName"
      size="middle"
      bordered>
    </a-table>
  </div>
</template>

<script>
import Http from "@/.common/http";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { Name: "horizontal_login" }),
      columns: [
        {
          title: "序号",
          dataIndex: "Idc",
        },
        {
          title: "油品名称",
          dataIndex: "name",
        },
        {
          title: "类型",
          dataIndex: "name1",
        },
        {
          title: "型号",
          dataIndex: "name2",
        },
        {
          title: "品牌",
          dataIndex: "name3",
        },
        {
          title: "计量单位",
          dataIndex: "name4",
        },
        {
          title: "化验类型",
          dataIndex: "name5",
        },
        {
          title: "创建人",
          dataIndex: "name6",
        },
        {
          title: "创建时间",
          dataIndex: "name7",
        },
        {
          title: "设置",
          dataIndex: "active",
        },
      ],
      data: [
        {
          Idc: 0,
          name: "John Brown",
          name1: 32,
          name2: "New York No. 1 Lake Park, New York No. 1 Lake Park",
          name3: "nice",
          name4: "nicname4e",
          name5: "name5",
          name6: "name6",
          name7: "name7",
        },
      ],
    };
  },
  methods: {
    fetch() {
      Http.fetchTest({}).then();
    },
    tableRowClassName(record, index) {
      let className = "dark-row";
      if (index % 2 === 1) className = "light-row";
      return className;
    },
    onSearch(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
  },
};
</script>