<script  setup>
import Auth from '../lib/auth'
import { useRoute, useRouter,  } from 'vue-router'
import NoteSidebar from '@/components/NoteSidebar.vue';

const router = useRouter()
const route = useRoute()
const curNote = $ref({})
const statusText = '笔记为改动'
const isShowPreview = true
const previewContent = $computed(() => {
})



Auth.getInfo()
  .then((res) => {
    if (!res.isLogin)
      router.push({ path: '/login' })
  })





</script>

<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="val => (notes = val)" />
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview = !isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model="curNote.title" @input="onUpdateNote" @keydown="statusText = '正在输入...'"
            placeholder="输入标题" />
        </div>
        <div class="editor">
          <textarea v-show="isShowPreview" v-model="curNote.content" @input="onUpdateNote"
            @keydown="statusText = '正在输入...'" placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body" v-html="previewContent" v-show="!isShowPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  #note{
    display:flex;

  }
</style>

