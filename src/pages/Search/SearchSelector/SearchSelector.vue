<template>
  <div class="clearfix selector">
    <div class="type-wrap" v-for="item in detailList" :key="item.keyID">
      <div class="fl key">{{ item.keyName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li
            v-for="itemAttr in item.attributeValues"
            :key="itemAttr.valueID"
            @click="attrInfo(item, itemAttr)"
          >
            <a>{{ itemAttr.valueName }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchSelector',
  props: ['detailList'],
  methods: {
    //将点击的分类信息传给父组件  使用自定义事件(子传父)
    //第一个参数是数据的第一级分类的内容,第二个参数是一级分类中的第二级分类内容
    attrInfo(item, itemAttr) {
      //利用$emit找出去,找到父组件
      this.$emit('attrInfo', item, itemAttr);
    },
  },
};
</script>

<style lang="less" scoped>
.selector {
  cursor: pointer;
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      height: 36px;
      background: #f1f1f1;
      line-height: 36px;
      text-align: center;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;
      line-height: 100%;
      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;

          a {
            text-decoration: none;
            color: #666;
            font-weight: 700;
            &:hover {
              color: skyblue;
            }
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>
