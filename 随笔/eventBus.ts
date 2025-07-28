
type EventHandler<T = any> = (data: T) => void;
/**
 * 事件总线
 */
class EventBus {
  private eventsMap = new Map();
  private onceEventsMap = new Map();

  /**
   * 订阅事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   * @param once 是否只订阅一次
   * @returns 取消订阅函数
   */
  subscribe(eventName: string, handler: EventHandler, once?: boolean) {
    const targetMap = once ? this.eventsMap : this.onceEventsMap;

    if (!targetMap.has(eventName)) {
      targetMap.set(eventName, []);
    }
    const handlers = targetMap.get(eventName);
    handlers.push(handler);

    return () => {
      const currentHandlers = targetMap.get(eventName);
      const index = currentHandlers.indexOf(handler);
      if (index !== -1) {
        currentHandlers.splice(index, 1);
        targetMap.set(eventName, currentHandlers);
      }
    }
  }

  /**
   * 订阅一次性事件
   * @param eventName 事件名称
   * @param handler 事件处理函数
   * @returns 取消订阅函数
   */
  once(eventName: string, handler: EventHandler) {
    return this.subscribe(eventName, handler, true);
  }

  /**
   * 通知事件
   * @param eventName 事件名称
   * @param payload 事件数据
   */
  notify<T>(eventName, payload?: T) {
    const handlers = this.eventsMap.get(eventName);

    if (handlers) {
      // 使用slice创建副本，避免循环中修改影响执行
      handlers.slice().forEach(handler => {
        try {
          handler(payload)
        } catch (error) {
          console.error(`Error in handler for event ${event}:`, error)
        }
      })
    }

    const onceHandlers = this.onceEventsMap.get(eventName);
    if (onceHandlers && onceHandlers.length > 0) {
      // 一次性订阅处理后需要移除
      onceHandlers.slice().forEach(handler => {
        try {
          handler(payload)
        } catch (error) {
          console.error(`Error in once handler for event ${eventName}:`, error)
        }
      })
      // 清除所有一次性处理器
      this.onceEventsMap.delete(eventName)
    }
  }

  /**
   * 取消订阅事件
   * @param eventName 事件名称
   */
  unsubscribe(eventName) {
    this.eventsMap.delete(eventName);
    this.onceEventsMap.delete(eventName);
  }

  /**
   * 移除事件
   * @param eventName 事件名称
   */
  removeEvent(eventName) {
    this.unsubscribe(eventName);
  }

  /**
   * 清除所有事件
   */
  clear() {
    this.eventsMap.clear();
    this.onceEventsMap.clear();
  }
}