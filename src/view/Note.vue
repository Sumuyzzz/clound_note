<script  setup>
import Auth from '../lib/auth'
import { useRouter, } from 'vue-router'
import NoteSidebar from '@/components/NoteSidebar.vue';
import { onMounted, ref } from 'vue'

const router = useRouter()
const curNote = ref({})
const statusText = '笔记为改动'
const isShowPreview = true
const previewContent = $computed(() => {
})


onMounted(() => {
  Auth.getInfo()
    .then((res) => {
      if (!res.isLogin) {
        router.push({ path: '/login' })
      }
      curNote.value = res.data

    }
    )
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
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}

.note-detail {
  flex: 1;
  display: flex;
  flex-direction: column;

  .note-detail-ct {
    height: 100%;
  }

  .note-empty {
    font-size: 50px;
    color: #ccc;
    text-align: center;
    margin-top: 100px;
  }

  .note-bar {
    padding: 4px 20px;
    border-bottom: 1px solid #eee;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    span {
      font-size: 12px;
      color: #999;
      margin-right: 4px;
    }

    .iconfont {
      float: right;
      margin-left: 4px;
      font-size: 18px;
      cursor: pointer;
    }

  }

  .note-title {

    input,
    span {
      display: inline-block;
      width: 100%;
      border: none;
      outline: none;
      font-size: 18px;
      padding: 10px 20px;
    }
  }

  .editor {
    height: calc(100% - 70px);
    position: relative;
  }

  textarea,
  .preview {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  textarea {
    border: none;
    resize: none;
    outline: none;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
  }

  code {
    color: #f66;
  }
}
</style>

