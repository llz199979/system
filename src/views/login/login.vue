<template>
  <div id="login_2" class="animate__animated animate__fadeIn">
    <div class="dowebok">
      <div class="laguge">
        
              <div class="langBtn" @click="toggleLanguage">
                <i class="iconfont icon-language" style="font-size:18px"></i>
                {{ $t("m.header.language") }}
              </div>
           
      </div>
      <div class="logo"></div>

      <el-form ref="form" :rules="rules" :model="form" :status-icon="true">
        <el-form-item class="form-item" prop="username">
          <input
            autocomplete="off"
            id="username"
            :placeholder="$t('m.placeholder.username')"
            style="background-color: transparent !important"
            v-model="form.username"
            type="text"
          />
        </el-form-item>
        <!-- {{$t('m.placeholder.username')}} -->
        <!-- <el-input v-model="form.username" :placeholder="$t('m.placeholder.username')" /> -->

        <el-form-item class="form-item" prop="password">
          <input
            :placeholder="$t('m.placeholder.password')"
            id="password"
            style="background-color: transparent !important"
            v-model="form.password"
            type="password"
            @keydown.enter="login('form')"
          />
        </el-form-item>
      </el-form>
      <!-- <el-input v-model="form.u" placeholder="$t('m.placeholder.username')"></el-input> -->
      <!-- <div class="form-item">
              <input id="username" type="text" autocomplete="off" placeholder="邮箱">
              <p class="tip">请输入合法的邮箱地址</p>
          </div> -->
      <!-- <div class="form-item">
              <input id="password" type="password" autocomplete="off" placeholder="登录密码">
              <p class="tip">邮箱或密码不正确</p>
          </div> -->
      <div class="form-item">
        <button id="submit" @click="login('form')">
          <i v-if="loginStatus" class="el-icon-loading"></i
          >{{ $t("m.login.login") }}
        </button>
      </div>
      <!-- <div class="reg-bar">
              <a class="reg" href="http://www.dowebok.com" target="_blank">立即注册</a>
              <a class="forget" href="http://www.dowebok.com" target="_blank">忘记密码</a>
          </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginStatus: false,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$i18n.t("m.rules.account"),
            trigger: "blur",
          },
          {
            min: 1,
            max: 12,
            message: "长度在 7 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$i18n.t("m.rules.password"),
            trigger: "blur",
          },
          {
            min: 1,
            max: 12,
            message: "长度在 7 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    login(info) {
      this.$refs[info].validate((valid) => {
        if (valid) {
          this.loginStatus = true;
          console.log(this.form);
          this.$store
            .dispatch("login", this.form)
            .then((res) => {
              this.$router.push({ path: "/" });
            })
            .catch((error) => {
              this.loginStatus = false;
            });
        }
      });
    },
     //语言切换
      toggleLanguage() {
        let locale = this.$i18n.locale;
        console.log('1111'+locale)
        locale === 'en' ? (this.$i18n.locale = 'zh') : locale === 'zh' ? (this.$i18n.locale = 'jp') : (this.$i18n.locale = 'en');
      
        // console.log(this.$i18n.t(this.$route.meta.title))
        localStorage.locale = this.$i18n.locale;
        document.title = this.$i18n.t(this.$route.meta.title)
        let info = locale ==='en'?'切换成功,请登录' : locale === 'zh' ? '正常に切り替えます。ログインしてください' : 'Switch successfully, please log in';
        this.$message.success(info);
        // this.$store.dispatch('removeLogin');
        // window.location.href = "/login";
      },
  },
};
</script>
<style lang="scss">
// input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
//     color: #BDCADA;
// }
// input:-moz-placeholder { /* Mozilla Firefox 4 to 18 适配火狐 */
//     color: #BDCADA;
// }
// input::-moz-placeholder { /* Mozilla Firefox 19+ 适配火狐 */
//     color: #BDCADA;
// }
// input:-ms-input-placeholder { /* Internet Explorer 10+  适配ie*/
//     color: #BDCADA;
// }
.laguge{
  float: right;
  padding-right: 20px;
  color: white;
  .langBtn{
     height: 35px;
     line-height: 35px;
     font-size: 18px;
  }
}
#login_2 {
  height: 100%;
  background: #000;
  background-image: url("../../assets/img/1.jpg");
  position: relative;
  .dowebok {
    overflow: hidden;
    transform: scale(0.8);
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    left: calc(50% - 215px);
    top: calc(50% - 275px);
    width: 430px;
    height: 550px;
    animation: lighting 2s linear infinite;
    border: 1px solid #fff;
    border-radius: 20px;
  }
  .logo {
    width: 104px;
    height: 104px;
    margin: 50px auto 80px;
    background: url("../../assets/img/icon/user.png") 0 0 no-repeat;
  }
  .form-item {
    position: relative;
    width: 360px;
    margin: 0 auto;
    padding-bottom: 30px;
  }
  .form-item input {
    width: 288px;
    height: 48px;
    padding-left: 70px;
    border: 1px solid #fff;
    border-radius: 25px;
    font-size: 18px;
    color: #fff;
    background-color: transparent;
    outline: none;
  }
  .form-item button {
    width: 360px;
    height: 50px;
    border: 0;
    border-radius: 25px;
    font-size: 18px;
    color: #1f6f4a;
    outline: none;
    cursor: pointer;
    background-color: #fff;
  }
  #username {
    background: url("../../assets/img/icon/email.png") 20px 14px no-repeat !important;
    position: relative;
  }

  #username::before {
    position: absolute;
    content: "";
    height: 40px;
    width: 40px;
    top: 0;
    border: solid 1px;
    display: block;
    background: #fff;
  }
  #password {
    background: url("../../assets/img/icon/password.png") 23px 11px no-repeat;
  }
  .tip {
    display: none;
    position: absolute;
    left: 20px;
    top: 52px;
    font-size: 14px;
    color: #f50;
  }
  .reg-bar {
    width: 360px;
    margin: 20px auto 0;
    font-size: 14px;
    overflow: hidden;
  }
  .reg-bar a {
    color: #fff;
    text-decoration: none;
  }
  .reg-bar a:hover {
    text-decoration: underline;
  }
  .reg-bar .reg {
    float: left;
  }
  .reg-bar .forget {
    float: right;
  }
  .dowebok ::-webkit-input-placeholder {
    font-size: 18px;
    line-height: 1.4;
    color: #fff;
  }
  .dowebok :-moz-placeholder {
    font-size: 18px;
    line-height: 1.4;
    color: #fff;
  }
  .dowebok ::-moz-placeholder {
    font-size: 18px;
    line-height: 1.4;
    color: #fff;
  }
  .dowebok :-ms-input-placeholder {
    font-size: 18px;
    line-height: 1.4;
    color: #fff;
  }

  @media screen and (max-width: 500px) {
    * {
      box-sizing: border-box;
    }
    .dowebok {
      position: static;
      width: auto;
      height: auto;
      margin: 0 30px;
      border: 0;
      border-radius: 0;
    }
    .logo {
      margin: 50px auto;
    }
    .form-item {
      width: auto;
    }
    .form-item input,
    .form-item button,
    .reg-bar {
      width: 100%;
    }
  }
  .el-form-item__error {
    // background:#409;
    color: #f20;
    letter-spacing: 1px;
    font-size: 15px;
    margin-left: 70px;
  }
  :-webkit-autofill {
    -webkit-text-fill-color: rgba($color: #fff, $alpha: 0.9) !important;
    -webkit-text-fill-background-color: transparent !important;
    transition: background-color 10000s ease-in-out 0s;
  }
  #submit {
    transition: all 0.3s linear;
    &:hover {
      background: #42c9a0;
      color: #fff;
    }
  }
  @keyframes lighting {
    0% {
      box-shadow: inset 0 0 0px rgba(220, 220, 220, 0.8);
    }
    50% {
      box-shadow: inset 0 0 10px 4px rgba(220, 220, 220, 0.8);
    }
    100% {
      box-shadow: inset 0 0 0px rgba(220, 220, 220, 0.8);
    }
  }
}
</style>
