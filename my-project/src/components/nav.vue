<template>
  <aside class="demoo">
    <el-row class="tac" type="flex">
      <el-col :span="6" class="menu" :class="[this.isCollapse?'el-col-6-hide':'el-col-6']">
         <!-- menu标题 -->
          <p class="tab-p">
            <img ref="img" :class="[this.isCollapse?'rocket-hide':'rocket']" :src="rocket" />
            <span  :class="[this.isCollapse?'test-hide':'test']">MyTest</span>
          </p>

        <el-menu
          id="elmenu"
          class="el-menu-vertical-demo mymenu"
          @open="handleOpen"
          @close="handleClose"
          background-color="#191A23"
          :default-active="active"
          text-color="#B0BBB4"
          active-text-color="#FFFFFF"
          :collapse="isCollapse"
          :class="[this.isCollapse?'el-menu-vertical-demo1':'el-menu-vertical-demo2']"
        >
            <div v-for="item in Tabs" :key="item.name">
              <el-submenu
                v-if="item.childs && item.childs.length"
                :key="item.name"
                :index="item.name"
              >
                <template slot="title">
                  <i :class="item.class"></i>
                  <span>{{item.title}}</span>
                </template>

                <el-menu-item
                  @click="goTo(icon)"
                  v-for="icon in item.childs"
                  :key="icon.name"
                  :index="icon.name"
                >
                <span>{{icon.title}}</span>
                </el-menu-item>
              </el-submenu>

              <el-menu-item v-else :index="item.name" :key="item.name" @click="goTo(item)">
                <i :class="item.class"></i>
                <span>{{item.title}}</span>
              </el-menu-item>
            </div>
        </el-menu>
      </el-col>

      <el-col :span="18" :class="[this.isCollapse?'el-col-18-hide':'el-col-18']">
        <!-- header -->
        <div :class="[this.isCollapse?'header-hide':'header']">
          <div>
            <button @click="change" class="handup">
              <span
                :class="[this.isCollapse?'icon iconfont icon-zhankai':'icon iconfont icon-shouqi']"
              ></span>
            </button>
            <button class="handup" @click="refresh">
              <span class="el-icon-refresh-right"></span>
            </button>
          </div>
          <div style="display:flex">
            <!-- <button class="handup" @click="refresh">
            <span class="el-icon-refresh-right"></span>
            </button>-->
            <!-- 时间显示 -->
            <Time class></Time>
            <!-- 登陆人员 -->
            <el-dropdown>
              <el-button type="primary" class="person">
                <img :src="person" class="personimg" />
                <span>管理员</span>
                <i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="personCenter">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="changePSW">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="checkout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div :class="[this.isCollapse?'navtop-hide':'navtop']">
          <!-- 标签页 -->
          <el-tabs
            class="tabs"
            v-model="editableTabsValue"
            type="card"
            @tab-remove="removeTab"
            @tab-click="changetab"
          >
            <el-tab-pane
              v-for="(item) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :closable="item.close"
            ></el-tab-pane>
          </el-tabs>
          <!-- 下拉选择框 -->
          <el-dropdown>
            <el-button type="primary" class="select">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="closePresent">关闭当前标签</el-dropdown-item>
              <el-dropdown-item @click.native="closeOthers">关闭其他标签</el-dropdown-item>
              <el-dropdown-item @click.native="closeAll">关闭所有标签</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- 路由显示 -->
        <router-view class="content" v-if="isrefresh"></router-view>

        <!-- footer -->
        <div :class="[this.isCollapse?'footer-hide':'footer']">
          <p>
            copyright @
            <span>DYT-DEMO</span> all rights reserved.
          </p>
          <p>Version 1.1.1</p>
        </div>
      </el-col>
    </el-row>
  </aside>
</template>

<script>
import time from "../components/time";
import rocket from "@/assets/air.png";
import person from "@/assets/person.png";
export default {
  data() {
    return {
      rocket,
      person,
      nowTime: "",
      isrefresh: true,
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 2",
          name: "2",
          path: "/index",
          close: null,
          class: "icon iconfont icon-doc_c"
        }
      ],
      tabIndex: 0,
      isCollapse: false,
      active: "2",
      targetclickname: "",
      Tabs: [
        {
          title: "Tab 1",
          name: "1",
          close: true,
          class: "icon iconfont icon-gauge",
          childs: [
            {
              title: "choose one",
              name: "1-1",
              path: "/chooseone",
              close: true
            },
            {
              title: "choose two",
              name: "1-2",
              path: "/choosetwo",
              close: true
            }
          ]
        },
        {
          title: "Tab 2",
          name: "2",
          path: "/index",
          close: true,
          class: "icon iconfont icon-doc_c"
        },
        {
          title: "Tab 3",
          name: "3",
          path: "/demo",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 4",
          name: "4",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 5",
          name: "5",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 6",
          name: "6",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 7",
          name: "7",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 8",
          name: "8",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 9",
          name: "9",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 10",
          name: "10",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 11",
          name: "11",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 12",
          name: "12",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        },
        {
          title: "Tab 13",
          name: "13",
          path: "/index",
          close: true,
          class: "icon iconfont icon-progress"
        }
      ],
      activeIndex: "2"
    };
  },
  components: {
    Time: time
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //左侧导航收缩
    change() {
      return this.isCollapse
        ? (this.isCollapse = false)
        : (this.isCollapse = true);
    },
    // 去往不同的路由
    goTo(item) {
      this.addTab(item);
      this.editableTabsValue = item.name;
      this.activeIndex = item.name;
      this.$router.push(item.path);
    },
    //添加tab
    addTab(item) {
      this.targetclickname = item.name;
      //如果已经打开了，则不添加
      for (let i = 0; i < this.editableTabs.length; i++) {
        if (item.name == this.editableTabs[i].name) {
          return;
        }
      }
      let newTabName = item.name;
      this.editableTabs.push({
        title: item.title,
        name: item.name,
        path: item.path,
        close: true
      });
      this.editableTabsValue = newTabName;
    },
    //关闭tab
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push(nextTab.path);
            }
          }
        });
      }
      this.targetclickname = activeName;
      this.active = activeName;
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    //点击tab,切换导航颜色
    changetab(targetName) {
      this.targetclickname = targetName.name;
      let tabs = this.editableTabs;
      let activeName = targetName.name;
      tabs.forEach((tab, index) => {
        if (tab.name === targetName.name) {
          this.$router.push(tab.path);
        }
      });
      this.editableTabsValue = activeName;
      this.active = activeName;
    },
    //refresh刷新页面
    refresh() {
      this.isrefresh = false;
      // debugger;
      // this.$router.go(0);
      this.$nextTick(function() {
        this.isrefresh = true;
      });
    },
    //关闭当前tab
    closePresent() {
      // console.log(this.targetclickname)
      if (this.targetclickname == "1") {
        return;
      }
      this.removeTab(this.targetclickname);
    },
    //关闭其他tab
    closeOthers() {
      // console.log(this.targetclickname)
      let doubleTab = this.editableTabs;
      let arr = [
        {
          title: "Tab 2",
          name: "2",
          path: "/index",
          close: null,
          class: "icon iconfont icon-doc_c"
        }
      ];
      let that = this;
      doubleTab.forEach(function(item) {
        // console.log(item.name)
        if (that.targetclickname == "1") {
          that.closeAll();
          return;
        } else if (
          item.name == that.targetclickname &&
          that.targetclickname != "1"
        ) {
          arr.push(item);
        }
      });
      console.log(arr);
      this.editableTabs = arr;
      console.log(this.editableTabs);
    },
    //关闭所有
    closeAll() {
      this.editableTabs = [
        {
          title: "Tab 2",
          name: "2",
          path: "/index",
          close: null,
          class: "icon iconfont icon-doc_c"
        }
      ];
      this.editableTabsValue = "2";
      this.active = "2";
    }
  }
};
</script>

<style scoped>
.el-col-6 {
  width: 15%;
  transition: width 0.1s linear !important;
  z-index: 0;
}
.el-col-6-hide {
  width: 4%;
  transition: width 0.1s linear !important;
  z-index: 0;
}
.el-col-18 {
  width: 85%;
  background-color: #f5f7f9;
  z-index: 1000;
}
.el-col-18-hide {
  width: 96%;
  background-color: #f5f7f9;
  z-index: 1000;
}

.header {
  height: 60px;
  width: 85%;
  background-color: #fff;
  position: fixed;
  display: flex;
  justify-content: space-between;
}
.aa{
  display: block;
}
.aa-hide{
  display: none;
}
.header-hide {
  height: 60px;
  width: 96%;
  background-color: #fff;
  position: fixed;
  display: flex;
  justify-content: space-between;
}
.person {
  height: 58px;
  width: 120px;
  padding-top: 2px;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
  background: #fff;
  color: #111218;
  border-radius: 0;
  font-size: 14px;
  position: relative;
}
.person span {
  position: absolute;
  top: 20px;
  left: 44px;
}
.personimg {
  width: 26px;
  position: absolute;
  left: 10px;
  top: 13px;
}
.person i {
  position: absolute;
  top: 18px;
  font-size: 16px;
  right: 10px;
}
.person:hover {
  border-top: 2px solid #111218;
  cursor: pointer;
}
.footer {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 85%;
  background-color: #fff;
}
.footer-hide {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 40px;
  width: 96%;
  background-color: #fff;
}
.footer p:nth-child(1),
.footer-hide p:nth-child(1) {
  line-height: 40px;
  margin-left: 10px;
  font-size: 12px;
}
.footer span,
.footer-hide span {
  color: #2dabf6;
}
.footer p:nth-child(2),
.footer-hide p:nth-child(2) {
  line-height: 40px;
  margin-right: 10px;
  font-size: 12px;
}
.content {
  margin-top: 120px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 60px;
  height: 700px;
  background-color: #fdf6e3;
  /* overflow: scroll; */
  /* overflow-y: scroll; */
}
/* ::-webkit-scrollbar {display:none} */
.navtop {
  height: 45px;
  width: 85%;
  position: fixed;
  display: flex;
  top: 60px;
  z-index: 1000;
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
  margin-bottom: 5px;
}
.navtop-hide {
  height: 45px;
  width: 96%;
  position: fixed;
  display: flex;
  top: 60px;
  z-index: 1000;
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
  margin-bottom: 5px;
}
.tabs {
  width: 97%;
  margin-left: 5px;
}
.select {
  width: 40px;
  height: 41px;
  margin-right: 5px;
  text-align: center;
  font-size: 16px;
  background-color: #fff;
  color: #111218;
  position: relative;
  border: 1px solid #e4e7ed;
  border-radius: 0;
}
.select:hover {
  background-color: #f2f2f2;
}
.select i {
  position: absolute;
  top: 13px;
  left: 7px;
}
.is-active {
  color: #ffffff !important;
  background-color: #009688 !important;
}
.p2 {
  color: #b0bbb4 !important;
  background-color: #111218 !important;
}
.tab-p {
  height: 60px;
  line-height: 60px;
  background-color: #111218;
  color: #ddddc5;
  position: fixed;
  width: 15%;
  z-index: 1000;
}
.menucontent {
  margin-top: 60px;
  z-index: 10;
}
.rocket {
  width: 30px;
  position: absolute;
  top: 15px;
  left: 60px;
}
.rocket-hide {
  width: 30px;
  position: absolute;
  top: 15px;
  left: 10px;
}
.test {
  position: absolute;
  right: 60px;
  font-size: 18px;
  color: #e4e7ed;
}
.test-hide {
  display: none;
}
.mymenu {
  position: fixed;
  height: 100%;
  width: 15%;
  /* overflow-y: scroll; */
  overflow-y: auto;
  margin-top: 60px;
  background-color: #111218;
}
.el-menu-vertical-demo1 {
  width: 4%;
  transition: width 0.1s linear !important;
}
.span-hide {
  display: none;
}
.span {
  display: block;
}
.el-menu-vertical-demo2 {
  width: 15%;
  transition: width 0.1s linear !important;
}

.handup {
  width: 60px;
  height: 58px;
  padding-top: 2px;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
  background: #fff;
}
.handup span {
  font-size: 22px;
}
.handup:hover {
  border-top: 2px solid #111218;
  cursor: pointer;
}
#elmenu i {
  font-size: 20px;
  margin-right: 10px;
}
  /*隐藏文字*/
  .el-menu--collapse  .el-submenu__title span{
    display: none;
  }
  /*隐藏 > */
  /* .el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
    display: none;
  } */
 .el-menu--collapse .el-menu-item span{
   display: none;
 }
::-webkit-scrollbar {
        display: none;
      }
</style>