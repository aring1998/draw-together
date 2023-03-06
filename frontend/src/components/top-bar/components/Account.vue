<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { userLogin, userRegister } from '@/api/user/user'
import type { UserItem } from '@/api/user/types/user-types'
import pattern from '@/utils/pattern'
import { useUserStore } from '@/store/modules/user'

const emits = defineEmits(['success'])

const active = ref(0)
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: '',
  password: '',
})
const loginFormRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入', trigger: 'blur' },
    { min: 4, max: 16, message: '长度在4~32', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入', trigger: 'blur' },
    { min: 6, max: 32, message: '长度在6~32', trigger: 'blur' },
  ],
})
function login() {
  const formEl = loginFormRef.value
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    const { data } = await userLogin(loginForm)
    success(data)
  })
}
const registerFormRef = ref<FormInstance>()
const registerForm = reactive({
  email: '',
  username: '',
  password: '',
})
const registerFormRules = reactive<FormRules>({
  ...loginFormRules,
  email: [{ pattern: pattern.email, message: '请输入正确的邮箱', trigger: 'blur' }],
})
function register() {
  const formEl = registerFormRef.value
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    const { data } = await userRegister({
      ...registerForm,
      email: registerForm.email ? registerForm.email : undefined,
    })
    success(data)
  })
}

function success(data: UserItem) {
  localStorage.setItem('token', data.token)
  useUserStore().token = data.token
  useUserStore().userInfo = data
  emits('success')
}
</script>

<template>
  <div class="account-wrap">
    <div class="account-bar">
      <span :class="{ active: !active }" @click="active = 0">登录</span>
      <span> / </span>
      <span :class="{ active: active }" @click="active = 1">注册</span>
    </div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="70px" v-show="!active">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="70px" v-show="active">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" placeholder="" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.account-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  .account-bar {
    font-size: 26px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    color: #666;
    .active {
      font-weight: 900;
    }
    span {
      cursor: pointer;
      &:nth-child(2) {
        margin: 0 20px;
        cursor: unset;
      }
    }
  }
  button {
    width: 120px;
  }
}
</style>
