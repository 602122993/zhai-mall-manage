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
        <el-table-column prop="name" align="center" label="分组名称">
        </el-table-column>
        <el-table-column prop="createdTime" align="center" label="创建时间">
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
          :model="formData"
          :rules="rules"
          label-width="80px"
          class="form"
        >
          <el-form-item label="分组名称" prop="name">
            <el-input class="form-input" v-model="formData.name"></el-input>
          </el-form-item>

          <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
              >{{formData.id?'立即修改':'立即创建'}}</el-button
            >
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  queryPermissionCategoryList,
  savePermissionCategory,
  updatePermissionCategory,
  removePermissionCategory,
} from "@/api/permission";
export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      formData: {},
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      tableData: [],
    };
  },
  methods: {
    initTable() {
      this.loading = true;
      queryPermissionCategoryList().then((resp) => {
        this.tableData = resp.data;
        this.loading = false;
      });
    },
    update(row){
      this.formData=row
      this.dialogFormVisible = true;
    },
    showCreate() {
      this.dialogFormVisible = true;
      this.formData = {};
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formData.id) {
            updatePermissionCategory(this.formData).then((resp) => {
              this.initTable();
              this.dialogFormVisible = false;
              this.$message({
                message: "修改成功",
                type: "success",
              });
            });
          } else {
            savePermissionCategory(this.formData).then((resp) => {
              this.initTable();
              this.dialogFormVisible = false;
              this.$message({
                message: "新增成功",
                type: "success",
              });
            });
          }
        }
      });
    },
    handlerConfirm(id){
      removePermissionCategory(id).then(resp=>{
          this.$message({
            message:'删除成功',
            type:'success'
          })
          this.initTable()
      })
    }
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