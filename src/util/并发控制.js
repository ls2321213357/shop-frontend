export default async function asyncPool(poolLimit, array, iteratorFn) {
  //存储所有的异步任务
  const ret = [];
  //存储正在执行的异步任务
  const executing = [];
  for (const item of array) {
    //调用iteratot函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item));
    //保存新的异步
    ret.push(p);
    //当任务完成后,从正在执行的任务中移除已完成的任务
    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    //保存正在执行的异步任务
    executing.push(e);
    if (executing.length >= poolLimit) {
      //加trcik
      await Promise.race(
        executing.map(function (item) {
          return item.catch(function (err) {
            return err;
          });
        }),
      );
    }
  }
  return Promise.all(
    ret.map(function (item) {
      return item.catch(function (err) {
        return err;
      });
    }),
  );
}
