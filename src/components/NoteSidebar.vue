<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-title">
      <span class=" add-note" @click="addNotes">添加笔记</span>
      <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom"
        @click="() => { console.log('x') }">
        <span class="el-dropdown-link">
          {{ curBook.title }}<i class="iconfont icon-down"></i>
        </span>
        <template #dropdown class="template">
          <el-dropdown-menu>
            <el-dropdown-item class=" dropdown-menu" v-for="noteBook in noteBooks" :command="noteBook.id"
              :key="noteBook.id">
              {{ noteBook.title }}
            </el-dropdown-item>
            <el-dropdown-item command="trash">回收站</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
    </div>
    <div class="content">
      <ul class="notes">
        <li v-for="note in notes" :key="note.id">
          <router-link :to="`/note?notebookId=${curBook.id}&noteId=${note.id}`">
            <span class="date">{{ note.createdAtFriendlyDate }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script  setup>
import Notebooks from '@/lib/noteBooks'
import { getAll, addNote } from '@/lib/notes'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref  } from 'vue';

const noteBooks = ref([])
const notes = ref([])
const curBook = ref({})
const route = useRoute()
const router = useRouter()


onMounted(async () => {
  const res = await Notebooks.getAll()
  noteBooks.value = res.data
  curBook.value = noteBooks.value.find((noteBook) => noteBook.id == route.query.notebookId) || noteBooks.value[0]
  const history = await getAll({ notebookId: curBook.value.id })
  notes.value = history.data.sort((a, b) => a - b)
},
)

const handleCommand = (notebookId) => {
  if (notebookId === 'trash') {
    return router.push({ path: '/trash' })
  }
  console.log(notebookId)
  console.log('changed')
  curBook.value = noteBooks.value.find((noteBook) => noteBook.id === notebookId)
  console.log(curBook.value)
  getAll({ notebookId })
    .then((response) => {
      notes.value = response.data
    })
}

const addNotes = () => {
  let title = prompt()
  if (title === '') {
    alert('标题不能为空')
    return
  }
  addNote({ notebookId: curBook.value.id }, { title: title, content: '' })
    .then((response) => {
      notes.value.push(response.data)
      alert('添加成功')
    })
}
</script>

<style scoped lang="scss">
.sidebar-wrapper {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;

  .sidebar-title {

    .add-note {
      position: absolute;
      cursor: pointer;
      right: 5px;
      top: 12px;
      color: #666;
      font-size: 12px;
      padding: 2px 4px;
      box-shadow: 0px 0px 2px 0px #ccc;
      border: none;
      z-index: 1;
    }

    .notebook-title {
      width: 100%;
      display: flex;
      justify-content: center;

      .el-dropdown-link {
        cursor: pointer;
        font-weight: bold;
        font-size: 30px;
        color: #000;
      }
    }

    .menu {
      display: flex;

      div {
        font-size: 12px;
        padding: 2px 10px;
        flex: 1;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;

        &:last-child {
          border-right: none;
        }
      }

      .iconfont {
        font-size: 10px;
      }
    }
  }


  .content {
    .notes {
      padding: 0 10px 0 0;

      display: flex;
      overflow: scroll;
      flex-direction: column;

      li {
        list-style: none;
        width: 100%;
        display: flex;

        &:noth-child(odd) {
          background-color: #f2f2f2;
        }

        .router-link-active {
          &:hover {
            border: 1px solid red;
          }
        }

        a,
        a:hover {
          width: 100%;
          display: flex;
          padding: 3px 0;
          font-size: 12px;
          border: 2px solid transparent;
          text-decoration: none;
          color: #333;
        }

        span {
          padding: 0 10px;
          flex: 1;
          align-self: center;
        }
      }



      .title {
        font-size: 18px;
        font-weight: normal;
        color: #333;
        height: 45px;
        line-height: 45px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        background-color: #f7f7f7;
        display: block;
      }
    }
  }



}
</style>