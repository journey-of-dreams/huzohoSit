--Update Time 2021年8月8日

-  添加configCommon.js全局配置文件 并在各个组件当中导入并使用
- 部分模块代码添加注释 优化格式规范
- Bug修复:main.js文件当中Vue.fileter+moment在网页调式环境上报错:{{ item.p_name | formatName}}其中的formatName删掉  避免单页面反复引用。