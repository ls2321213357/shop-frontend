const userList = require('../../../service/store/userList.json')
const fastReply = require('../../../service/store/fastReply.json')
const productList = require('../../../service/store/product.json')
const messageList = require('../../../service/store/messageList.json')
const robotReply = require('../../../service/store/robotReply.json')
const state = {
    chatUserList: userList,
    fastReply: fastReply,
    productList: productList,
    messageList: messageList,
    robotReply: robotReply
}

export default {
    state,
};