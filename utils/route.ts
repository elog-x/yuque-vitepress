/**
 * 生成 sidebar
 * @param arr
 * @param pathname 路由前缀
 */
function genYuqueRoute(arr: any[], pathname?: string) {
  function loop(parId: string) {
    return arr.reduce((acc: any, cur: any) => {
      if (cur.parent_uuid === parId) {
        const parent = arr.find(item => item.uuid === parId)
        cur.path = (parent?.path || '') + '/' + cur.title
        cur.items = loop(cur.uuid)
        let route
        if (cur.items.length) {
          route = {
            text: cur.title,
            collapsed: false,
            items: cur.items
          }
          acc.push(route)
        } else {
          if (cur.type === 'DOC') {
            route = {
              text: cur.title,
              link: `${pathname ? pathname : ''}${cur.path}`,
            }
            acc.push(route)
          }
        }
      }
      return acc
    }, [])
  }

  return loop('')
}

/**
 * 生成 sidebar 短路由模式
 * @param arr
 * @param pathname 路由前缀
 */
// function genYuqueRouteWithShortUrl(arr: any[], pathname?: string) {
//   function loop(parId: string) {
//     return arr.reduce((acc: any, cur: any) => {
//       if (cur.parent_uuid === parId) {
//         cur.path = '/' + cur.slug
//         cur.items = loop(cur.uuid)
//         let route
//         if (cur.items.length) {
//           route = {
//             text: cur.title,
//             collapsed: false,
//             items: cur.items
//           }
//           acc.push(route)
//         } else {
//           if (cur.type === 'DOC') {
//             route = {
//               text: cur.title,
//               link: `${pathname ? pathname : ''}${cur.path}`,
//             }
//             acc.push(route)
//           }
//         }
//       }
//       return acc
//     }, [])
//   }
//
//   return loop('')
// }

/**
 * 生成语雀导航
 * @param pathname 路由前缀
 */
export const genYuqueSideBar = async (pathname?: string) => {
  const cache = await import('../elog.cache.json')
  const {catalog} = cache
  return genYuqueRoute(catalog, pathname)
}

/**
 * 生成语雀导航-短路由模式
 * @param pathname 路由前缀
 */
// export const genYuqueSideBarWithShortUrl = async (pathname: string) => {
//   const cache = await import('../elog.cache.shorturl.json')
//   const {catalog} = cache
//   const res = genYuqueRouteWithShortUrl(catalog, pathname)
//   console.log(JSON.stringify(res))
//   return res
// }
