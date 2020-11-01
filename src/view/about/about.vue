<template>
  <div>
    <h1>about</h1>
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
      aboutMsg: "我是about组件",
    };
  },
  methods: {
    fetch() {
      Http.fetchTest({}).then();
    },
  },
};
</script>