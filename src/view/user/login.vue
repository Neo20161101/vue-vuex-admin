<template>
  <div class="login-form">
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'Name',
          { rules: [{ required: true, message: '请输入账号名称!' }] },
        ]"
        placeholder="请输入账号"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
        type="password"
        placeholder="请输入密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
        @change="handleChange"
      >
        记住账号
      </a-checkbox>
      <a class="login-form-forgot" href="">
        忘记密码
      </a>
      <a-button type="primary" html-type="submit" class="login-form-button" block>
        登录
      </a-button>
      Or
      <a href="">
        注册!
      </a>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
import Http from "../../.common/http";
export default {
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    fetch() {
      Http.fetchTest({}).then();
    },
    handleSubmit(e){
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const res = {UserInfoPm:{UserId:'UserId'},LastTime:'LastTime',Token:'Token'}
          console.log('Received values of form: ',values);
              // sessionStorage.setItem("TimeStamp", TimeStr);
              sessionStorage.setItem("Token", res.Token);
              sessionStorage.setItem("UserInfoPm", JSON.stringify(res.UserInfoPm));
              sessionStorage.setItem("LastTime", res.LastTime);
              localStorage.setItem("UserId", res.UserInfoPm.UserId);
          this.$router.replace('home');

        }
      });
    },
    handleChange() {
      // this.checkNick = e.target.checked;
    },
  },
};
</script>
<style>
.login-form{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.login-form form {
    width: 300px;
}
</style>