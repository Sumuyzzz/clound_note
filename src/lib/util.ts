export function friendlyDate(datasString: string) {
  const dateObj = typeof datasString === 'object' ? datasString : new Date(datasString)
  const time = dateObj.getTime()
  const now = Date.now()
  const space = now - time
  let str = ''


  switch (true) {
    case space < 6000:
      str = '刚刚'
      break
    case space < 1000 * 3600:
      str = `${Math.floor(space / 100000)}分钟前`
      break
    case space < 1000 * 3600 * 24:
      str = `${Math.floor(space / (1000 * 3600))}小时前`
      break
    default:
      str = `${Math.floor(space / (1000 * 3600 * 24))}天前`
  }
  return str
}
