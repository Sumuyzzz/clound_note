import { request } from '@/lib/request'
import { friendlyDate } from '@/lib/util'


const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId',
}

type Note = {
  notebookId: string,
  title: string,
  content: string;
}

const getAll = ({ notebookId}: Note) => {
  return new Promise((resolve, reject) => {
    request(URL.GET.replace(':notebookId', notebookId))
      .then((response: any) => {
        response.data = response.data
          .map((notebook: { createdAtFriendlyDate: string; createdAt: string; updatedAtFriendlyDate: string; updatedAt: string; }) => {
            notebook.createdAtFriendlyDate = friendlyDate(notebook.createdAt)
            notebook.updatedAtFriendlyDate = friendlyDate(notebook.updatedAt)
            return notebook
          })
          .sort((notebook1: { updatedAt: number; }, notebook2: { updatedAt: number; }) => {
            return notebook1.updatedAt < notebook2.updatedAt
          })
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}


const updateNote = ({ notebookId }: Note, { title, content }: Note) => {
  return request(URL.UPDATE.replace(':noteId', notebookId), 'PATCH', {
    title,
    content
  })
}

const deleteNote = ({ notebookId }: Note) => {
  return request(URL.DELETE.replace(':noteId', notebookId), 'DELETE')
}

const addNote = ({ notebookId }: Note, { title = '', content = '' }={title: '', content: ''}) => {
  return new Promise((resolve, reject) => {
    request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content })
      .then((response: any) => {
        response.data.createdAtFriendlyDate = friendlyDate(response.data.createdAt)
        response.data.updatedAtFriendlyDate = friendlyDate(response.data.updatedAt)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
  })
}


export { getAll, updateNote, deleteNote, addNote }


