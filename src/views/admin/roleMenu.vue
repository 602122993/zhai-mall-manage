<template>
  <div>
    <div class="menu-tree">
      <el-tree
        :data="menuTree"
        show-checkbox
        ref="tree"
        node-key="id"
        :default-checked-keys="menuIdList"
        :props="defaultProps"
      >
      </el-tree>
    </div>
    <div class="menu-tree">
      <el-button type="primary" @click="submitRoleMenu">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { queryMenuTree, queryMenuIdByRoleId, saveRoleMenu } from "@/api/role";
export default {
  data() {
    return {
      menuTree: [],
      menuIdList: [],
      defaultProps: {
        children: "childList",
        label: "name",
      },
    };
  },
  methods: {
    initTree() {
      queryMenuTree().then((resp) => {
        const { data } = resp;
        this.menuTree = data;
        queryMenuIdByRoleId(this.$route.query.roleId).then((resp) => {
          this.menuIdList = resp.data.filter((item) => {
            return (
              this.menuTree.map((menuId) => menuId.id).indexOf(item) === -1
            );
          });
        });
      });
    },
    submitRoleMenu() {
      let menuIdList = this.$refs.tree
        .getCheckedNodes(false, true)
        .map((item) => {
          return item.id;
        });
      let roleId = this.$route.query.roleId;
      saveRoleMenu({ menuIdList, roleId }).then((resp) => {
        this.$message({
          showClose: true,
          message: "保存成功",
          type: "success",
        });
        this.$router.push("./role");
      });
    },
    cancel() {
      this.$router.push("./role");
    },
  },
  mounted() {
    this.initTree();
  },
};
</script>

<style scoped>
.menu-tree {
  width: 800px;
  margin: 0 auto;
  /* border:1px solid #F00; */
  margin-top: 50px;
  text-align: center;
}
</style>