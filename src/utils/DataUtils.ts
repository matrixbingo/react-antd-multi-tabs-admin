import lodash from 'lodash'

const DataUtil = {
  array: {
    push: (arr, ele) => {
      if (arr.indexOf(ele) === -1) {
        arr.push(ele)
      }
    },
    remove: (arr, val) => {
      const index = arr.indexOf(val)
      if (index > -1) {
        arr.splice(index, 1)
      }
    },
    unique: (arr: any): any[] => {
      return [...new Set(arr)]
    },
    uniqueSort: (arr: any): any[] => {
      return DataUtil.array.unique(arr).sort()
    },
    removeObjByKey: (
      arr: { [K: string]: unknown }[] = [],
      item: { [K: string]: string | number },
      K = 'id'
    ) => {
      return arr.filter((i) => i[K] !== item[K])
    },
    mapByKey: (list: { [K: string]: any }[], k = 'id') => {
      return list.map((i) => i[k])
    },
    equals: (arr, target) => {
      // if the other array is a falsy value, return
      if (!target) return false

      // compare lengths - can save a lot of time
      if (arr.length !== target.length) return false

      for (let i = 0, l = arr.length; i < l; i++) {
        // Check if we have nested arrays
        if (arr[i] instanceof Array && target[i] instanceof Array) {
          // recurse into the nested arrays
          if (!arr[i].equals(target[i])) return false
        } else if (arr[i] !== target[i]) {
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false
        }
      }
      return true
    }
  },
  string: {
    /**
     * 中英文逗号，分号，分割
     * @param input
     */
    splitByComma: (input: string) => {
      const arr = input.split(/[\n\s+,，；;]/g)
      lodash.remove(arr, (i) => {
        return lodash.isEmpty(i)
      })
      return arr
    },
    /**
     * 字符串转数组,支持中英文标点 1，2，3，4 =>[1,2,3,4]
     * @param input
     * @param key
     */
    splitToNumberArray: (input: string, key = ','): number[] => {
      if (lodash.isEmpty(input)) {
        return []
      }
      if (key === ',') {
        return DataUtil.string.splitByComma(input)?.map((v) => parseInt(v, 10))
      }
      return input?.split(key)?.map((v) => parseInt(v, 10))
    },
    /**
     * 字符串转数组,去重，排序
     * @param input
     * @param key
     */
    splitToNumberArrayUniqueSort: (input: string, key = ','): number[] => {
      const arr = DataUtil.string.splitToNumberArray(input, key)
      if (lodash.isEmpty(arr)) {
        return []
      }
      return DataUtil.array.unique(arr).sort()
    }
  },
  object: {
    equals: (object1: object, object2: object) => {
      return lodash.isEqual(object1, object2)
    },
    isObjectValueEqual(a: object, b: object) {
      const aProps = Object.getOwnPropertyNames(a)
      const bProps = Object.getOwnPropertyNames(b)
      if (aProps.length !== bProps.length) {
        return false
      }
      const size = aProps.length
      for (let i = 0; i < size; i += 1) {
        const propName = aProps[i]
        const propA = a[propName]
        const propB = b[propName]
        if (typeof propA === 'object' && lodash.isObject(propB)) {
          if (this.isObjectValueEqual(propA, propB)) {
            // return true     这里不能return ,后面的对象还没判断
          } else {
            return false
          }
        } else if (propA !== propB) {
          return false
        }
      }
      return true
    }
  }
}
export default DataUtil
