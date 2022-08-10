<script setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import Notebooks from '../lib/notebooks'
import Auth from '../lib/auth'
import { friendlyDate } from '@/lib/util'

const router = useRouter()

const notebooks = reactive([])

Auth.getInfo()
  .then((res) => {
    if (!res.isLogin)
      router.push({ path: '/login' })
  })


Notebooks.getAll()
  .then((res) => {
    console.log(res)
    notebooks.values = res.data
})


const onCreate = () => {
  ElMessageBox.prompt(
    '输入新标题',
    '创建笔记本',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern: new RegExp(/^.{1,30}$/),
      inputErrorMessage: '标题不能为空,且不能超过30个'
    }
  )
    .then(({ value }) => {
      return Notebooks.addNotebook({ title: value, friendlyCreatedAt :''})
    })
    .then(res => {
      res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
      notebooks.unshift(res.data)
      ElMessage({
        message: '创建成功',
        type: 'success',
      })
    }).then((res) => {
      Notebooks.getAll(res)
        .then((res) => {
          notebooks.values = res.data
        })
    }).catch((res) =>
      ElMessage({
        type: 'error',
        message: res,
      })
    )
}
const onEdit = (notebook) => {
  ElMessageBox.prompt(
    '输入新标题',
    '修改笔记本',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern: new RegExp(/^.{1,30}$/),
      inputValue: notebook.title,
      inputErrorMessage: '标题不能为空,且不能超过30个'
    }
  )
    .then(({ value}) => {
      return Notebooks.updateNotebook(notebook.id, { title: value })
    })
    .then(res => {
      notebooks.unshift(res.data)
      alert(res.msg)
      ElMessage({
        type: 'success',
        message: '修改成功',
      })
    }).catch((res) =>
      ElMessage({
        type: 'error',
        message: res,
      })
    )
}

const onDelete = (notebook) => {
  const isConfirm = window.confirm('你确定要删除吗?')
  if (isConfirm) {
    Notebooks.deleteNotebook(notebook.id)
      .then((res) => {
        notebooks.filter((item) => item !== notebooks.indexOf(notebook))
      }).then(() => {
        ElMessage({
          type: 'success',
          message:'删除成功',
        })
      }).then(() => {
        Notebooks.getAll()
          .then((res) => {
            console.log(res)
            notebooks.values = res.data
          })
      })
  }
}

const toNote = (notebook) => {
  router.push( `/note/?notebookId=${notebook.id}` )
}


</script>

<template>
  <div id="notebook-list" class="detail">
    <header>
      <el-button text @click="onCreate">新建</el-button>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.values.length }})</h3>
        <div class="book-list">
          <div v-for="notebook in notebooks.values" :key="notebook.id"  class="notebook" @click="toNote(notebook)">
            <div>
              <span class="iconfont icon-notebook" /> {{ notebook.title }}
              <span class="action" @click.stop.prevent="onEdit(notebook)">
                <el-button text>
                  编辑</el-button>
              </span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">
                <el-button text>删除</el-button>
              </span>
              <span class="date">{{friendlyDate(notebook.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
#notebook-list {
  flex: 1;

  .btn {
    font-size: 12px;
    color: #666;
    cursor: pointer;
    margin-left: 10px;

    .iconfont {
      font-size: 12px;
    }
  }

  input {
    width: 300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px 5px;
    outline: none;
  }

  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }

  main {
    padding: 30px 40px;
  }

  .layout {
    max-width: 966px;
    margin: 0 auto;
  }

  main h3 {
    font-size: 12px;
    color: #000;
  }

  main .book-list {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
  }

  main .book-list span {
    font-size: 12px;
    font-weight: bold;
    color: #b3c0c8;
  }

  main .date,
  main .action {
    float: right;
    margin-left: 10px;
  }

  main .iconfont {
    color: #1687ea;
    margin-right: 4px;
  }

  main .notebook {
    display: block;
    cursor: pointer;
  }

  main .notebook:hover {
    background-color: #f7fafd;
  }

  main .notebook div {
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }

  main .error-msg {
    font-size: 12px;
    color: red;
  }

}
</style>
