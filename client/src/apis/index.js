import Taro from "@tarojs/taro";

// const urlBase = "http://localhost:10000"; //本地调试
const urlBase = "https://ticket.sge.ronpy.com"; //正式环境
// const urlBase = "https://ticket-test.sge.ronpy.com"; //测试环境

const request = (method, url, data, dataType = "json") => {
  Taro.showNavigationBarLoading();
  // let _request = cloudRequest;
  // if (url.indexOf("localhost") !== -1) _request = Taro.request;
  let _request = Taro.request;
  return new Promise((resolve, reject) => {
    _request({
      url: url,
      data: data,
      header: {
        "content-type": "application/json",
        "open-id": Taro.getStorageSync("OpenId") || ""
      },
      method: method,
      dataType: dataType
    }).then(res => {
      Taro.hideNavigationBarLoading();
      if (res.statusCode >= 400) {
        console.error(res);
        reject(res.data);
      } else {
        console.debug(res);
        resolve(res.data);
      }
    }).catch(err => {
      Taro.hideNavigationBarLoading();
      console.error(err);
      reject(err)
    });
  });
};

const GET = (url, dataType) => request("GET", url, undefined, dataType);
const POST = (url, data, dataType) => request("POST", url, data, dataType);
// const DELETE = (url) => request("DELETE", url);
// const PUT = (url, data) => request("PUT", url, data);

const ticketPackage = () => {
  console.log(`API: ticketPackage()`);
  return GET(`${urlBase}/ticket_package`);
};
const purchaseTicket = (data) => {
  console.log(`API: purchaseTicket(${JSON.stringify(data)})`);
  return POST(`${urlBase}/ticket_purchase`, data)
};
const refundTicket = (ticket_id) => {
  console.log(`API: refundTicket(${ticket_id})`);
  return POST(`${urlBase}/ticket_refund`, {ticket_id});
};
const inspectTicket = (ticket_id) => {
  console.log(`API: inspectTicket(${ticket_id})`);
  return POST(`${urlBase}/ticket_inspect`, {ticket_id});
};
const checkedTicket = (ticket_id) => {
  console.log(`API: checkedTicket(${ticket_id})`);
  return POST(`${urlBase}/ticket_checked`, {ticket_id});
};
const messageList = () => {
  console.log(`API: messageList()`);
  return POST(`${urlBase}/message_list`)
};
const messageCount = () => {
  console.log(`API: messageCount()`);
  return POST(`${urlBase}/message_count`)
};
const messageAction = (message_id) => {
  console.log(`API: messageAction(${message_id})`);
  return POST(`${urlBase}/message_action`, {message_id})
};
const ticketSignIn = (data) => {
  console.log(`API: ticketSignIn(${JSON.stringify(data)})`);
  return POST(`${urlBase}/ticket_sign_in`, data)
};
const ticketGenerate = (count) => {
  console.log(`API: ticketGenerate(${count})`);
  return POST(`${urlBase}/ticket_generate`, {count});
};
const ticketUsage = () => {
  console.log(`API: ticketUsage()`);
  return POST(`${urlBase}/ticket_usage`);
};
const ticketLog = (skip, limit) => {
  console.log(`API: ticketLog(${skip}, ${limit})`);
  return POST(`${urlBase}/ticket_log`, {skip, limit});
};
const ticketCheckLog = (start, end) => {
  console.log(`API: ticketCheckLog(${start}, ${end})`);
  return POST(`${urlBase}/ticket_check_log`, {start, end});
};
const userBind = (data) => {
  console.log(`API: userBind(${JSON.stringify(data)})`);
  return POST(`${urlBase}/user_bind`, data);
};
const userInfo = () => {
  console.log(`API: userInfo()`);
  return POST(`${urlBase}/user_info`);
};
const userUpdate = (data) => {
  console.log(`API: userUpdate(${JSON.stringify(data)})`);
  return POST(`${urlBase}/user_update`, data);
};
const memberAdd = (data) => {
  console.log(`API: userAdd(${data})`);
  return POST(`${urlBase}/member_add`, data);
};
const memberDelete = (init_id) => {
  console.log(`API: userDelete(${init_id})`);
  return POST(`${urlBase}/member_delete`, {init_id});
};
const memberFind = (init_id) => {
  console.log(`API: userFind(${init_id})`);
  return POST(`${urlBase}/member_find`, {init_id});
};
const memberList = () => {
  console.log(`API: userList()`);
  return POST(`${urlBase}/member_list`);
};
const reportExport = (type, start, end) => {
  console.log(`API: reportExport(${type},${start}, ${end})`);
  return POST(`${urlBase}/report_export`, {type, start, end});
};
const rsaPubKey = () => {
  console.log(`API: rsa_pub_key()`);
  return GET(`${urlBase}/web/rsa_pub_key`, 'data');
};
// const getHistoryTickets = () => GET(`${urlBase}/ticket_history`);

export {
  checkedTicket,
  inspectTicket,
  memberAdd,
  memberDelete,
  memberFind,
  memberList,
  messageList,
  messageCount,
  messageAction,
  purchaseTicket,
  refundTicket,
  reportExport,
  rsaPubKey,
  ticketSignIn,
  ticketPackage,
  ticketCheckLog,
  ticketGenerate,
  ticketLog,
  ticketUsage,
  userBind,
  userInfo,
  userUpdate,
  // getHistoryTickets
}
