<template>
  <div class="login-page">
    <div class="bg-layer" />
    <div class="login-card">
      <div class="login-header">
        <div class="login-logo">
          <Icon icon="ri:home-smile-2-line" width="28" height="28" color="#1a7cf7" />
          <span>O2 工作台</span>
        </div>
        <p class="login-desc">统一工作平台 · 集成 O2OA 与工具集</p>
      </div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            size="large"
          >
            <template #prefix>
              <Icon icon="ri:user-line" width="16" height="16" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            size="large"
            show-password
          >
            <template #prefix>
              <Icon icon="ri:lock-line" width="16" height="16" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        <span>使用 O2OA 账号登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAppStore } from '../store/app'
import { login as o2oaLogin } from '../api/o2oa'

const router = useRouter()
const appStore = useAppStore()
const formRef = ref(null)
const loading = ref(false)

const form = reactive({
  username: 'xadmin',
  password: 'admin123',
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

async function handleLogin() {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const user = await o2oaLogin(form.username, form.password)
      // Get department from identity
      const dept = (user.identityList && user.identityList.length > 0)
        ? user.identityList[0].unitName || '分销部'
        : '分销部'
      appStore.setUser({ name: user.name, dept: dept })
      ElMessage.success('登录成功')
      router.push('/dashboard')
    } catch (e) {
      ElMessage.error('登录失败: 用户名或密码错误')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.bg-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/bg2.jpg') center/cover no-repeat fixed;
  z-index: 0;
}

.login-card {
  position: relative;
  z-index: 1;
  width: 400px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.login-desc {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.login-form {
  margin-bottom: 16px;
}

.login-btn {
  width: 100%;
}

.login-footer {
  text-align: center;
  font-size: 12px;
  color: #bbb;
}
</style>
