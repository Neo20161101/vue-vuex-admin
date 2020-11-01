<template>
  <div>
    <h1>tacos</h1>
    <p>{{aboutMsg}}</p>
    <a-button @click="fetch" type="primary">
      Primary
    </a-button>
  </div>
</template>

<script>
import Http from "../../.common/http";
export default {
  data() {
    return {
      aboutMsg: "我是tacos组件",
    };
  },
  methods: {
    fetch() {
      Http.fetchTest({}).then();
    },
  },
};
</script>