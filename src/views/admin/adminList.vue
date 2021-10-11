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
        <el-table-column prop="username" align="center" label="账号">
        </el-table-column>
        <el-table-column prop="name" align="center" label="姓名">
        </el-table-column>
        <el-table-column prop="remark" align="center" label="备注">
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
            <el-link
              class="operation-link"
              @click="showDistributionRole(row)"
              type="primary"
              >分配角色</el-link
            >
            <el-link
              class="operation-link"
              @click="showChangePassword(row)"
              type="primary"
              >修改密码</el-link
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
          :model="adminForm"
          :rules="rules"
          label-width="80px"
          class="form"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              class="form-input"
              v-model="adminForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" v-show="!adminForm.id" prop="password">
            <el-input
              type="password"
              class="form-input"
              v-model="adminForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input class="form-input" v-model="adminForm.name"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              class="form-input"
              type="textarea"
              v-model="adminForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" prop="status">
            <el-radio-group v-model="adminForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">不启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')"
              >{{adminForm.id?'立即修改':'立即创建'}}</el-button
            >
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="分配角色" :visible.sync="distributionRoleDialogDisable">
        <el-select v-model="adminRole" multiple placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="distributionRole"
        >
          确定</el-button
        >
      </el-dialog>
    </div>
    <div style="text-align: center; padding-top: 20px">
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
import {
  queryAdminList,
  saveAdmin,
  distributionAdminRole,
  updateAdmin,
  changePassword,
  removeAdmin,
} from "@/api/user";
import { queryAllRoleList } from "@/api/role";
export default {
  data() {
    return {
      loading: false,
      checkAdminId: {},
      limit: 20,
      total: 0,
      current: 1,
      adminRole: [9, 11],
      roleList: [],
      dialogFormVisible: false,
      adminForm: {},
      icons: [],
      distributionRoleDialogDisable: false,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        status: [{ required: true, message: "请选择可用", trigger: "blur" }],
      },
      tableData: [],
      rootMenu: [],
    };
  },
  methods: {
    initTable() {
      this.loading = true;
      queryAdminList({ limit: this.limit, current: this.current }).then(
        (resp) => {
          this.tableData = resp.data.records;
          this.total = resp.data.total;
          this.loading = false;
        }
      );
    },
    handlerConfirm(id) {
      removeAdmin(id).then((resp) => {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.initTable();
      });
    },
    showCreate() {
      this.adminForm = {};
      this.dialogFormVisible = true;
    },
    showChangePassword(row) {
      this.$prompt("请输入密码", "修改密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        changePassword({ adminId: row.id, password: value }).then((resp) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        });
      });
    },
    distributionRole() {
      distributionAdminRole({
        adminId: this.checkAdminId,
        roleIdList: this.adminRole,
      }).then((resp) => {
        this.distributionRoleDialogDisable = false;
        this.$message({
          message: "分配成功",
          type: "success",
        });
        this.initTable();
      });
    },
    update(row) {
      this.adminForm = row;
      this.dialogFormVisible = true;
    },
    showDistributionRole(row) {
      queryAllRoleList().then((resp) => {
        this.roleList = resp.data;
      });
      this.adminRole = row.roleEntityList.map((element) => {
        return element.id;
      });
      this.checkAdminId = row.id;
      this.distributionRoleDialogDisable = true;
    },
    changePage() {},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.adminForm.id) {
            updateAdmin(this.adminForm).then((resp) => {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.dialogFormVisible = false;
              this.initTable();
            });
          } else {
            saveAdmin(this.adminForm).then((resp) => {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.dialogFormVisible = false;
              this.initTable();
            });
          }
        }
      });
    },
  },
  mounted() {
    this.initTable();
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