<template>
  <div>
    <div class="menu-tree">
      <el-tree
        :data="permissionTree"
        show-checkbox
        ref="tree"
        node-key="id"
        :default-checked-keys="permissionIdList"
        :props="defaultProps"
      >
      </el-tree>
    </div>
    <div class="menu-tree">
      <el-button type="primary" @click="submitRolePermission">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import {
  queryMenuTree,
  queryMenuIdByRoleId,
  saveRoleMenu,
} from "@/api/role";
export default {
  data() {
    return {
      permissionTree: [],
      permissionIdList: [],
      defaultProps: {
        children: "permissionEntityList",
        label: "name",
      },
    };
  },
  methods: {
    initTree() {
      queryPermissionTree().then((resp) => {
        const { data } = resp;
        data.forEach(element => {
            element.id = 'category'+element.id
        });
        this.permissionTree = data;
      });
      queryPermissionIdByRoleId(this.$route.query.roleId).then(resp=>{
         this.permissionIdList=resp.data
      })
    },
    submitRolePermission() {
      let permissionIdList = this.$refs.tree
        .getCheckedNodes(true, false)
        .map((item) => {
          return item.id;
        });
      let roleId = this.$route.query.roleId;
      saveRolePermission({ permissionIdList, roleId }).then((resp) => {
        this.$message({
          showClose: true,
          message: "保存成功",
          type: "success",
        });
        this.$router.push('./role')
      });
    },
    cancel(){
        this.$router.push('./role')
    }
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