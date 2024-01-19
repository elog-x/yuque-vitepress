/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = async (doc) => {
  if (doc.body) {
    // 将语雀灰色高亮块转成 VitePress 支持的 紫色高亮块
    doc.body = doc.body?.replaceAll(':::tips', ':::tip')
    // 将语雀绿色高亮块同样转成 VitePress 支持的 紫色高亮块
    doc.body = doc.body?.replaceAll(':::success', ':::tip')
  }
  return doc;
};

module.exports = {
  format,
};
