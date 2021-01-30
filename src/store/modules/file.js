// 公司管理/领导管理增加上传图片
import fx from '../../utils/fx'
import api from '../../utils/api'
import { setItem, getItem, removeItem } from '../../utils/token'

const file = {
  state: {

  },
  getters: {
  },
  mutations: {
    set_router ({ state, rootstate }) {
      router.addRoutes(asyncRouterMap_)
    }
  },
  actions: {
    // 上传文件 post /media/upload
    uploadFile({state}, data) {
        return new Promise((resolve, reject) => {
            let url = '/media/upload';
            let methods = 'post';
            fx.setConnect({url, methods, data})
            .then(res => {
                resolve(res.data.data);
            }).catch(() => {
                
            })
        })
    },
    // 上传图片 post /media/uploadImage
    uploadImage({state}, data) {
        return new Promise((resolve, reject) => {
            let url = '/media/uploadImage';
            let methods = 'post';
            fx.setConnect({url, methods, data})
            .then(res => {
                resolve(res.data.data);
            }).catch(() => {
                
            })
        })
    },
    // 图片删除 post /media/delPicture
    delPicture({state}, picture) {
      let url = `/media/delPicture?pictureId=${picture.pictureId?picture.pictureId:''}&url=${picture.url?picture.url:''}`;
      let methods = 'post';
      fx.setConnect({url, methods})
      .then(res => {

      }).catch(err => {
      })
    }

  }
}
export default file
