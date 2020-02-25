<!--
 * @Description: 
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-14 21:23:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 17:28:06
 -->
<template>
  <div id="login">
    <div class="content">
      <h2>欢迎使用信息工程学院小先锋管理系统</h2>
      <Form ref="formValidate" :model="formValidate" :rules="rules" :label-width="80">
        <FormItem label="用户名" prop="account">
          <Input v-model="formValidate.account" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formValidate.password" type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem>
          <Button type="primary" long size="large" @click="login('formValidate')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import * as api from "../../api/api";
export default {
  data() {
    return {
      formValidate: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /**
     * @name: 登录事件
     * @msg: 判断账号密码后手动设置token，将用户名缓存以方便页面调取显示
     * @param {type}  
     * @return: 
     */
    login(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let parmas = {};
          parmas = {
            account: this.formValidate.account,
            password: this.formValidate.password
          };
          this.$post(api.Login,parmas)
            .then(res => {
              if (res.code == 20001) {
                this.$router.push("/article0");
                this.$Message.success(res.message);
                // this.$cookies.set("ticket","69aca445dd174500b1acf961a0655363",60 * 60)
                localStorage.setItem("username", this.formValidate.account);
              } else {
                this.$Message.error(res.message);
                this.$refs.formValidate.resetFields();
              }
            })
            .catch(err => {
              this.$Message.error(err.message);
              this.$refs.formValidate.resetFields();
              return false;
            });
        } else {
          this.$Message.error("请输入用户名和密码!");
        }
      });
    }
  }
};
</script>