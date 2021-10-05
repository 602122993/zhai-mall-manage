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
        <el-table-column prop="name" align="center" label="名称">
        </el-table-column>
        <el-table-column prop="code" align="center" label="编码">
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
        </el-table-column>
        <el-table-column prop="userCount" align="center" label="用户数">
        </el-table-column>
        <el-table-column prop="createdTime" align="center" label="创建时间">
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
            <el-link
              class="operation-link"
              @click="configurationPermssion(row.id)"
              type="primary"
              >配置权限</el-link
            >
            <el-link
              class="operation-link"
              @click="configurationMenu(row.id)"
              type="primary"
              >配置菜单</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增/编辑" :visible.sync="dialogFormVisible">
        <el-form
          ref="form"
          :model="roleForm"
          :rules="rules"
          label-width="80px"
          class="form"
        >
          <el-form-item label="名称" prop="name">
            <el-input class="form-input" v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="name">
            <el-input class="form-input" v-model="roleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              class="form-input"
              type="textarea"
              v-model="roleForm.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="roleForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">不启用</el-radio>
            </el-radio-group>
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
    <div style="text-align: center">
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
import { addRole, getRoles, deleteRole, updateRole } from "@/api/role";
export default {
  data() {
    return {
      loading: false,
      limit: 20,
      total: 0,
      current: 1,
      dialogFormVisible: false,
      roleForm: {},
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "change" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择可用", trigger: "blur" }],
      },
      tableData: [],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.roleForm.id) {
            updateRole(this.roleForm).then((resp) => {
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success",
              });
              this.queryList();
            });
          } else {
            addRole(this.roleForm).then((resp) => {
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "保存成功",
                type: "success",
              });
              this.queryList();
            });
          }
        } else {
          return false;
        }
      });
    },
    configurationPermssion(roleId) {
      this.$router.push("./role-permission?roleId=" + roleId);
    },
    configurationMenu(roleId) {
      this.$router.push("./role-menu?roleId=" + roleId);
    },
    showCreate() {
      this.roleForm = {};
      this.dialogFormVisible = true;
    },
    handlerConfirm(id) {
      console.log(123);
      deleteRole(id).then((resp) => {
        this.queryList();
        this.$message({
          message: "删除成功",
          type: "success",
        });
      });
    },
    update(row) {
      this.roleForm = row;
      this.dialogFormVisible = true;
    },
    queryList() {
      this.loading = true;
      getRoles({ limit: this.limit, current: this.current }).then((resp) => {
        const { data } = resp;
        this.tableData = data.records;
        this.total = data.total;
        this.loading = false;
      });
    },
    changePage(current) {
      this.current = current;
      this.queryList();
    },
  },
  mounted() {
    this.queryList();
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