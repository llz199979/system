import { getItem } from "../utils/token"

// import {getItem} from '../util/token'
 const getters = {
    getRouter: (state) => state.asyncRouterMap,
    // getUser: (state) => state.user,
    getBreadList: (state) => state.breadList,
    getTheme: (state) => {
      if( !state.theme) {
        return getItem('theme');
      }else{
        return state.theme;
      }
    }
    // get_activeIndex: (state) => state.activeIndex
  }
  export default getters