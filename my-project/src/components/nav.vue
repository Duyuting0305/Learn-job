<template>
  <el-row class="tac" type="flex">
    <el-col :span="12">
      <h5>MYtest</h5>
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <div v-for="(item) in Tabs" :key="item.name">
          <el-menu-item
            :index="item.name"
            @click="goTo(item)"
            ref="aa"
            :class="[item.name == editableTabsValue?'is-active':'p2']"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
    <el-col>
      <div class="navtop">
        
        <div class="navtab">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
            @tab-click="changetab"
          >
            <el-tab-pane
              v-for="(item) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <router-view></router-view>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue: 0,
      editableTabs: [],
      tabIndex: 0,
      Tabs: [
        {
          title: "Tab 1",
          name: "1",
          path: "/demo"
        },
        {
          title: "Tab 2",
          name: "2",
          path: "/index"
        },
         {
          title: "Tab 3",
          name: "3",
          path: "/index"
        },
         {
          title: "Tab 4",
          name: "4",
          path: "/index"
        },
         {
          title: "Tab 5",
          name: "5",
          path: "/index"
        }
      ],
      activeIndex: null
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(item) {
      this.addTab(item);
      this.editableTabsValue = item.name;
      this.activeIndex = item.name;
      this.$router.push(item.path);
    },
    addTab(item) {
      for (let i = 0; i < this.editableTabs.length; i++) {
        if (item.name == this.editableTabs[i].name) {
          return;
        }
      }
      let newTabName = item.name;
      this.editableTabs.push({
        title: item.title,
        name: item.name,
        path: item.path
      });
      this.editableTabsValue = newTabName;
    },
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
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    changetab(targetName) {
      let tabs = this.editableTabs;
      let activeName = targetName.name;
      tabs.forEach((tab, index) => {
        if (tab.name === targetName.name) {
          this.$router.push(tab.path);
        }
      });
      this.editableTabsValue = activeName;
    }
  }
};
</script>

<style scoped>
.el-col-12 {
  width: 15%;
}
.el-col-24 {
  width: 0;
}
.navtop {
  height: 40px;
  width: 85%;
  position: absolute;
  left: 15%;
  display: flex;
}
.navtab {
  width: 94%;
}
.navtop button {
  width: 3%;
  height: 40px;
  border: 1px solid #e4e7ed;
  border-radius: 0px;
  margin: 0 auto;
  position: relative;
}
.navtop button i {
  content: "\E6DD";
  text-align: center;
  position: absolute;
  top: 33%;
  left: 0;
  right: 0;
}
.is-active {
  color: #409eff;
}
.p2 {
  color: #303133;
}
</style>