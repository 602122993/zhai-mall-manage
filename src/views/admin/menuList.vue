<template>
  <div class="list">
    <div class="search"></div>
    <div>
      <el-button class="add-button" @click="showCreate" type="primary">
        新增
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" align="center" label="编号">
        </el-table-column>
        <el-table-column prop="name" align="center" label="菜单名称">
        </el-table-column>
        <el-table-column prop="uri" align="center" label="地址">
        </el-table-column>
        <el-table-column prop="sort" align="center" label="排序">
        </el-table-column>
        <el-table-column prop="icon" align="center" label="图标">
          <template slot-scope="{ row }">
            <i :class="row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="是否启用">
          <template slot-scope="{ row }">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="row.status"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="设置">
          <template slot-scope="{ row }">
            <el-link
              class="operation-link"
              @click="goToNextLevel(row)"
              type="primary"
              :disabled="row.parentId !== 0"
              >查看下级</el-link
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-link class="operation-link" @click="update(row)" type="primary"
              >编辑</el-link
            >
            <el-popconfirm
              title="确定要删除吗?"
              @onConfirm="handlerConfirm(row.id)"
            >
              <el-link class="operation-link" type="danger" slot="reference"
                >删除</el-link
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增/编辑" :visible.sync="dialogFormVisible">
        <el-form
          ref="form"
          :model="menuForm"
          :rules="rules"
          label-width="80px"
          class="form"
        >
          <el-form-item label="菜单名称" prop="name">
            <el-input class="form-input" v-model="menuForm.name"></el-input>
          </el-form-item>
          <el-form-item label="前端地址" prop="uri">
            <el-input class="form-input" v-model="menuForm.uri"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" prop="parentId">
            <el-select v-model="menuForm.parentId" placeholder="请选择">
              <el-option :key="0" label="无上级菜单" :value="0"></el-option>
              <el-option
                v-for="item in rootMenu"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-select filterable v-model="menuForm.icon" placeholder="请选择">
              <el-option
                v-for="item in icons"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <i :class="menuForm.icon" style="margin-left: 10px"></i>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="menuForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">不启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序" prop="uri">
            <el-input class="form-input" v-model="menuForm.sort"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')"
              >立即创建</el-button
            >
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div style="text-align: center; padding-top:20px;">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :page-size="limit"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { queryMenuList, queryRootMenu, saveMenu, updateMenu } from "@/api/menu";
import { initIcons } from "@/views/icons/element-icons";
export default {
  data() {
    return {
      loading: false,
      limit: 20,
      total: 0,
      current: 1,
      dialogFormVisible: false,
      menuForm: {},
      icons: [],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        uri: [{ required: true, message: "请输入地址", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择可用", trigger: "blur" }],
      },
      tableData: [],
      rootMenu: [],
    };
  },
  methods: {
    initTable() {
      let parentId = this.$route.query.parentId;
      this.loading=true;
      queryMenuList({
        parentId: parentId ? parentId : 0,
        current: this.current,
        limit: this.limit,
      }).then((resp) => {
        this.tableData = resp.data.records;
         this.total =resp. data.total;
         this.loading=false;
      });
      this.icons = initIcons();
    },
    update(row) {
      this.menuForm = row;
      this.dialogFormVisible = true;
    },
    showCreate() {
      this.menuForm = {};
      this.initRootMenu();
      this.dialogFormVisible = true;
    },
    initRootMenu() {
      queryRootMenu().then((resp) => {
        this.rootMenu = resp.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.menuForm.id) {
            updateMenu(this.menuForm).then((resp) => {
              this.dialogFormVisible = false;
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.initTable();
            });
          } else {
            saveMenu(this.menuForm).then((resp) => {
              this.dialogFormVisible = false;
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.initTable();
            });
          }
          this.reloadMenu()
        }
      });
    },
    goToNextLevel(row) {
      this.$router.push("./menu-list?parentId=" + row.id);
    },
    changePage(page) {
        this.current =page;
        this.initTable()
    },
    async reloadMenu() {
      const { menuList } = await this.$store.dispatch("user/getInfo");
      // generate accessible routes map based on roles
      const accessRoutes = await this.$store.dispatch(
        "permission/generateRoutes",
        menuList
      );
    },
  },
  mounted() {
    this.initTable();
  },

  watch: {
    $route(to, from) {
      this.initTable();
    },
  },
};
</script>

<style scoped>
.form-input {
  width: 400px;
}
.add-button {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  margin-bottom: 20px;
}
.operation-link {
  margin-left: 5px;
}
</style>